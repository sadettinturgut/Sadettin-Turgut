// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();

// CORS (Cross-Origin Resource Sharing) ayarları
app.use(cors());
// Gelen JSON verilerini ve büyük base64 string'leri işlemek için limit ayarı
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.API_KEY;
if (!apiKey) {
  // Sunucu başlarken API anahtarı yoksa hata ver ve çık
  console.error("API anahtarı (API_KEY) ortam değişkeni bulunamadı. Lütfen .env dosyasını veya ortam değişkenlerini kontrol edin.");
  process.exit(1); 
}
const ai = new GoogleGenAI({ apiKey });

// API endpoint'i
app.post('/api/generate', async (req, res) => {
  try {
    const { base64Image, mimeType } = req.body;

    if (!base64Image || !mimeType) {
      return res.status(400).json({ error: 'Görsel verisi (base64Image ve mimeType) eksik.' });
    }

    const imagePart = {
      inlineData: { data: base64Image, mimeType },
    };
    const textPart = {
      text: "Bu resmi bir sanatçı gözüyle, detaylı ve şiirsel bir dille betimle. Manzarayı, objeleri, renkleri, ışığı ve atmosferi anlat. Oluşturulacak prompt, başka bir yapay zeka resim oluşturma modelinde (örn: Midjourney, Stable Diffusion) kullanılabilecek niteliklerde, zengin ve yaratıcı olmalı. Cevabın yalnızca Türkçe olmalıdır.",
    };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });

    res.json({ prompt: response.text });

  } catch (error) {
    console.error("Gemini API hatası:", error);
    res.status(500).json({ error: 'Yapay zeka ile iletişim kurulamadı. Sunucu loglarını kontrol edin.' });
  }
});

// Frontend dosyalarını sunmak için projenin ana dizinini statik olarak sun.
// Bu, index.html, manifest.json, ikonlar ve dist/ klasöründeki her şeyi kapsar.
app.use(express.static(path.join(__dirname, '..')));

// Diğer tüm GET isteklerini index.html'e yönlendirerek SPA'nın (Single Page Application) çalışmasını sağla.
// Bu, sayfa yenilendiğinde veya doğrudan bir linke gidildiğinde 404 hatası alınmasını önler.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} portunda çalışıyor.`);
});