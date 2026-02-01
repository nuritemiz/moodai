# MoodAI - AI Günlük Asistanım 

React Native tabanlı, yapay zeka destekli ruh hali takip ve günlük asistan uygulaması.

##  Proje Hakkında

MoodAI, kullanıcıların günlük duygusal durumlarını yazarak kaydettikleri ve yapay zeka analiziyle kişiselleştirilmiş öneriler aldıkları bir mobil uygulamadır.

- **Duygu analizi:** Pozitif / Nötr / Negatif
- **Basit özet:** "Bugün genel olarak olumlu bir gün geçirmişsin."
- **Kişisel öneri:** "Kendine 10 dakikalık bir mola verebilirsin."

Tüm veriler lokal olarak saklanır ve kullanıcı istediği zaman geçmiş kayıtlarını görüntüleyebilir.

##  Özellikler

### Temel Özellikler
- **AI Destekli Sentiment Analizi** - Hugging Face multilingual model ile Türkçe destek
- **Kişiselleştirilmiş Öneriler** - Groq/Llama AI ile dinamik, her seferinde farklı öneriler
- **Geçmiş Kayıt Takibi** - Tüm günlük girişleri tarih ve duygu durumuyla görüntüleme
- **Duygu Durumuna Göre UI** - Pozitif/negatif/nötr duygulara göre arka plan rengi değişimi
- **Offline Çalışma** - AsyncStorage ile lokal veri saklama, internet olmadan geçmiş görüntüleme

### Kullanıcı Deneyimi
- Temiz ve minimal tasarım
- Anlık AI analizi ve geri bildirim
- Her girdinin duygu rengi ve emoji ile gösterimi
- Hızlı ve akıcı navigasyon

##  Kullanılan Teknolojiler

| Kategori | Teknoloji | Açıklama |
|----------|-----------|----------|
| **Mobil Platform** | React Native (Expo) | Cross-platform mobil uygulama framework'ü |
| **State Yönetimi** | Context API | Global state yönetimi için React Context |
| **AI - Sentiment Analizi** | Hugging Face Inference API | `cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual` modeli |
| **AI - Text Generation** | Groq AI API | `llama-3.3-70b-versatile` modeli ile Türkçe öneri üretimi |
| **Veri Saklama** | AsyncStorage | Lokal veri persistance için React Native AsyncStorage |
| **Navigasyon** | React Navigation | Stack navigation ile ekran geçişleri |
| **HTTP İstemcisi** | Axios | API istekleri için |

### AI Modelleri Detayları

#### 1. Sentiment Analizi - Hugging Face
- **Model:** `cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual`
- **Amaç:** Türkçe metinlerde duygu analizi (pozitif/negatif/nötr)
- **Ücretsiz:** 
- **Diller:** 100+ dil desteği (Türkçe dahil)

#### 2. Öneri Üretimi - Groq
- **Model:** `llama-3.3-70b-versatile`
- **Amaç:** Duygu durumuna göre kişiselleştirilmiş Türkçe öneriler
- **Ücretsiz:** 
- **Özellikler:** Çok hızlı inference (~1 saniye), multilingual


### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/nuritemiz/moodai.git
cd moodai
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment Variables ayarlayın:**

`.env` dosyası oluşturun (`.env.example` dosyasını kopyalayın):

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve API key'lerinizi ekleyin:

```
HF_API_TOKEN=your_huggingface_token_here
GROQ_API_KEY=your_groq_api_key_here
```

**API Key Alma Rehberi:**

- **Hugging Face:** 
  1. https://huggingface.co adresine kayıt olun
  2. Settings → Access Tokens → Create new token
  
- **Groq:**
  1. https://console.groq.com adresine kayıt olun
  2. API Keys → Create API Key

4. **Uygulamayı başlatın:**
```bash
npm start
```


##  Kullanım

1. **Günlük Girişi Ekle:**
   - Ana ekranda günlük duygu veya düşüncelerinizi yazın
   - "Analiz Et" butonuna tıklayın
   - AI analizi sonuçlarını ve önerileri görüntüleyin

2. **Geçmiş Kayıtları Görüntüle:**
   - "Geçmiş Kayıtlar" butonuna tıklayın
   - Emoji ve renklerle duygu durumlarını ayırt edin




## Proje Yapısı

```
MoodAI/
├── .env.example                    # Environment variables örneği
├── App.js                          # Ana uygulama bileşeni & navigasyon
├── src/
│   ├── api/
│   │   └── sentimentApi.js         # AI API entegrasyonları (HF + Groq)
│   ├── context/
│   │   └── JournalContext.js       # Global state yönetimi
│   └── screens/
│       ├── HomeScreen.js           # Ana ekran - günlük girişi
│       └── HistoryScreen.js        # Geçmiş kayıtlar ekranı
├── package.json
└── README.md
```

## AI Araç Kullanımı ve Şeffaflık

Bu proje geliştirilirken aşağıdaki AI araçlarından yararlanılmıştır:

### Kullanılan AI Araçlar:
- **Google Gemini (Antigravity)** - Kod yazımı, hata düzeltme, optimizasyon ve dokümantasyon
### AI Katkı Oranı:
- **Kod yazımı:** ~60% AI yardımıyla, ~40% manuel
- **Mimari tasarım ve karar verme:** Manuel
- **API entegrasyonları:** Manuel
- **UI/UX tasarımı:** Manuel + AI önerileri
- **Hata ayıklama ve optimizasyon:** AI yardımıyla

### Öğrenme ve Geliştirme:
Proje boyunca React Native, Context API, AsyncStorage ve AI API entegrasyonları konularında pratik deneyim kazanıldı. AI araçları, öğrenme sürecini hızlandırdı ve öğrenmemde yardımcı oldu.


**Not:** Bu proje Expo ile geliştirilmiştir. Expo, React Native CLI'ya göre daha hızlı development ve hata anlamında daha kolay yönetilebildiğinden tercih edildi.



