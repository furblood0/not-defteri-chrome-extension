# 📝 Not Defteri - Chrome Eklentisi

Modern ve kullanışlı bir not alma Chrome eklentisi. Çoklu not desteği, gelişmiş arayüz ve kullanıcı dostu özelliklerle notlarınızı kolayca yönetin.

## ✨ Özellikler

- **📝 Çoklu Not Desteği**: Sınırsız sayıda not oluşturun ve yönetin
- **🎨 Modern Arayüz**: Gradient tasarım ve animasyonlarla modern görünüm
- **💾 Otomatik Kaydetme**: Notlarınız otomatik olarak Chrome storage'da saklanır
- **📅 Tarih Damgası**: Her notun oluşturulma ve güncellenme tarihi
- **🔍 Not Önizleme**: Notların ilk 100 karakterini önizleme olarak görün
- **⚡ Hızlı Erişim**: Tek tıkla not oluşturma ve düzenleme
- **📱 Responsive Tasarım**: Farklı ekran boyutlarına uyumlu
- **🌐 Türkçe Arayüz**: Tamamen Türkçe kullanıcı arayüzü

## 🚀 Kurulum

### Chrome Web Store'dan (Önerilen)
1. Chrome Web Store'da "Not Defteri" arayın
2. "Ekle" butonuna tıklayın
3. Eklenti otomatik olarak yüklenecektir

### Manuel Kurulum (Geliştiriciler için)
1. Bu repository'yi klonlayın:
   ```bash
   git clone https://github.com/furblood0/not-defteri-chrome-extension.git
   cd not-defteri-chrome-extension
   ```

2. Chrome'da `chrome://extensions/` adresine gidin

3. Sağ üst köşedeki "Geliştirici modu"nu açın

4. "Paketlenmemiş öğe yükle" butonuna tıklayın

5. Proje klasörünü seçin

6. Eklenti başarıyla yüklenecektir!

## 📖 Kullanım

### Yeni Not Oluşturma
1. Chrome toolbar'ındaki Not Defteri ikonuna tıklayın
2. "✨ Yeni Not Ekle" butonuna tıklayın
3. Not başlığını ve içeriğini yazın
4. "💾 Kaydet" butonuna tıklayın

### Not Düzenleme
1. Not listesinde düzenlemek istediğiniz notun "✏️ Düzenle" butonuna tıklayın
2. Notu düzenleyin
3. "💾 Kaydet" butonuna tıklayın

### Not Silme
1. Not listesinde silmek istediğiniz notun "🗑️ Sil" butonuna tıklayın
2. Onay penceresinde "Tamam"a tıklayın

### Klavye Kısayolları
- **Enter**: Not başlığında Enter'a basarak hızlı kaydetme
- **Shift + Enter**: Yeni satır ekleme

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- **HTML5**: Modern semantik yapı
- **CSS3**: Flexbox, Grid, Animasyonlar, Gradient'ler
- **JavaScript ES6+**: Class yapısı, Arrow functions, Template literals
- **Chrome Extension API**: Storage API

### Dosya Yapısı
```
not-defteri-chrome-extension/
├── manifest.json          # Eklenti konfigürasyonu
├── popup.html            # Ana kullanıcı arayüzü
├── popup.js              # JavaScript mantığı
├── styles.css            # CSS stilleri
├── images/               # İkonlar ve görseller
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   ├── android-chrome-128x128.png
│   ├── android-chrome-192x192.png
│   └── android-chrome-512x512.png
├── README.md             # Bu dosya
└── LICENSE               # MIT lisans
```

### Veri Yapısı
Notlar aşağıdaki yapıda saklanır:
```javascript
{
  id: "unique_id",
  title: "Not Başlığı",
  content: "Not içeriği...",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Geliştirme

### Gereksinimler
- Chrome tarayıcısı
- Temel HTML/CSS/JavaScript bilgisi

### Geliştirme Ortamı Kurulumu
1. Repository'yi klonlayın
2. Kod editörünüzde açın (VS Code önerilir)
3. Chrome'da geliştirici modunda yükleyin
4. Değişiklikleri test edin

### Katkıda Bulunma
1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 🎯 Gelecek Özellikler

- [ ] Not kategorileri
- [ ] Not arama özelliği
- [ ] Dark/Light tema desteği
- [ ] Not dışa aktarma (PDF, TXT)
- [ ] Not paylaşımı
- [ ] Favori notlar
- [ ] Not etiketleri
- [ ] Otomatik yedekleme
- [ ] Çoklu cihaz senkronizasyonu

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**Furkan** - İlk Chrome eklentisi projesi

- GitHub: [@furblood0](https://github.com/furblood0)
- Email: furkanfidan.2357@gmail.com

## 🙏 Teşekkürler

- Chrome Extension API dokümantasyonu
- Modern CSS teknikleri
- Açık kaynak topluluğu

## 📊 İstatistikler

- **Versiyon**: 2.0.0
- **Son Güncelleme**: Temmuz 2025
- **Chrome Versiyonu**: 88+
- **Manifest Versiyonu**: 3

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 