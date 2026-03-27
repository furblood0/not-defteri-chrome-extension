# Not Defteri - Chrome Eklentisi

Chrome toolbar'ından tek tıkla erişilen, hızlı ve modern bir not alma eklentisi.

## Özellikler

- **Çoklu not** — Sınırsız not oluştur ve yönet
- **Arama** — Başlık ve içerikte gerçek zamanlı filtreleme
- **Not sabitleme** — Önemli notları listenin üstüne sabitle
- **Karanlık / Aydınlık tema** — Tercih otomatik kaydedilir
- **Senkronizasyon** — `chrome.storage.sync` ile Chrome hesabına bağlı tüm cihazlara senkronize
- **Klavye kısayolu** — `Ctrl+S` ile hızlı kaydetme
- **Türkçe arayüz**

## Kurulum

### Chrome Web Store (Önerilen)

Chrome Web Store sayfasından "Ekle" butonuna tıklayın.

### Geliştirici olarak yükleme

```bash
git clone https://github.com/furblood0/not-defteri-chrome-extension.git
cd not-defteri-chrome-extension
npm install
npm run build
```

`chrome://extensions` → Geliştirici modu → "Paketlenmemiş öğe yükle" → `dist/` klasörünü seç.

## Geliştirme

```bash
npm install       # Bağımlılıkları kur
npm run build     # Production build (dist/ klasörüne)
npm run dev       # Vite geliştirme sunucusu
```

Kod değişikliklerinden sonra `npm run build` çalıştır, ardından `chrome://extensions` sayfasında eklentiyi yenile.

## Teknoloji

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Chrome Extension Manifest V3
- `chrome.storage.sync` (notlar) + `chrome.storage.local` (tema tercihi)

## Proje Yapısı

```
not-defteri-chrome-extension/
├── src/
│   ├── components/       # React bileşenleri
│   ├── context/          # Tema context
│   ├── hooks/            # useNotes hook
│   ├── types/            # TypeScript tipleri
│   ├── utils/            # storage yardımcıları
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── manifest.json     # Chrome extension tanımı
│   └── images/           # Eklenti ikonları
├── popup.html            # Vite giriş noktası
├── vite.config.ts
└── tailwind.config.js
```

## Veri Yapısı

```typescript
interface Note {
  id: string
  title: string
  content: string
  pinned: boolean
  createdAt: string   // ISO 8601
  updatedAt: string   // ISO 8601
}
```

## Lisans

MIT — Detaylar için [LICENSE](LICENSE) dosyasına bak.

## Geliştirici

**Furkan** — [@furblood0](https://github.com/furblood0)
