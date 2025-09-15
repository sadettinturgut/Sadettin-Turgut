# AI Görüntü Prompt Üretici

Bu uygulama, yüklediğiniz görselleri analiz ederek onlar için yaratıcı ve ayrıntılı metin istemleri (prompt) oluşturmak üzere Gemini AI'yi kullanır. Docker ve Docker Compose ile kolayca kurulabilir.

## Özellikler

- Resim yükleme (sürükle-bırak desteği).
- Yüklenen resimden Gemini AI kullanarak otomatik prompt oluşturma.
- Oluşturulan prompt'ları kopyalama ve kaydetme.
- Kaydedilen prompt'ları yönetme (tekrar kullanma, silme).
- İstemci tarafında basit görüntü kalitesi artırma.
- PWA (Progressive Web App) desteği ile çevrimdışı kullanım ve cihaza kurma imkanı.

## Kurulum ve Çalıştırma (Docker)

Bu uygulamayı çalıştırmanın en kolay yolu Docker ve Docker Compose kullanmaktır.

### Gereksinimler

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (Docker Desktop ile genellikle birlikte gelir)

### Adımlar

1.  **Projeyi Klonlayın veya İndirin**

    ```bash
    # Eğer git kullanıyorsanız
    git clone <proje_adresi>
    cd <proje_klasoru>
    ```

2.  **API Anahtarını Yapılandırın**

    Proje ana dizininde bulunan `.env.example` dosyasının bir kopyasını oluşturun ve adını `.env` olarak değiştirin.

    ```bash
    # Windows (PowerShell)
    cp .env.example .env
    ```

    Ardından, favori metin düzenleyicinizle `.env` dosyasını açın ve `YOUR_GEMINI_API_KEY_HERE` yazan yere kendi Google AI Studio (Gemini) API anahtarınızı yapıştırın.

    ```dotenv
    # .env dosyasının içeriği
    API_KEY=sizin_api_anahtariniz_buraya_gelecek
    ```

3.  **Uygulamayı Başlatın**

    Terminalde veya PowerShell'de projenin ana dizinindeyken aşağıdaki komutu çalıştırın:

    ```powershell
    docker-compose up --build -d
    ```

    - `--build`: İlk çalıştırmada veya kodda bir değişiklik yaptığınızda imajı yeniden oluşturur.
    - `-d`: Konteyneri arka planda çalıştırır.

4.  **Uygulamaya Erişin**

    Tarayıcınızı açın ve `http://localhost:8080` adresine gidin. Uygulama artık kullanıma hazır!

### Uygulamayı Durdurma

Uygulamayı durdurmak için aynı dizinde aşağıdaki komutu çalıştırmanız yeterlidir:

```powershell
docker-compose down
```

Bu komut, uygulama konteynerini durdurur ve kaldırır.

## Teknoloji Yığını

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express
- **AI Model:** Google Gemini
- **Derleme Aracı:** esbuild
- **Konteynerleştirme:** Docker, Docker Compose
