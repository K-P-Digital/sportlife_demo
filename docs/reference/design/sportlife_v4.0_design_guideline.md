# SPORTLIFE v4.0 | Tasarım Rehberi (Design Guidelines)

Sportlife v4.0, yüksek performanslı, atletik ve premium bir kullanıcı deneyimi sunmak üzere tasarlanmıştır. Bu rehber, uygulamanın görsel tutarlılığını korumak için gerekli olan temel tasarım kurallarını tanımlar.

## 1. Renk Paleti (Color Palette)

Uygulama, derin kontrast ve yüksek enerjili vurgular üzerine kuruludur.

### Temel Renkler
- **Background (Ana Arka Plan):** `#050505` (Saf siyaha yakın, derin derinlik)
- **Surface (Yüzey):** `#161616` (Kartlar ve ikincil alanlar için)
- **Surface Elevated:** `#1F1F1F` (Vurgulu kartlar ve etkileşimli alanlar)
- **Primary Accent (Lime):** `#C5F833` (Marka rengi, aksiyonlar, başarı durumları)
- **Brand Glow:** `rgba(197, 248, 51, 0.20)` (Lime rengi üzerine uygulanan yumuşak ışıma)

### Yardımcı Renkler
- **White:** `#FFFFFF` (Başlıklar ve ana metinler)
- **Gray High:** `#B8B8B8` (Yardımcı metinler, açıklamalar)
- **Gray Mid:** `#8A8A8A` (Etiketler, inaktif durumlar)
- **Gray Low:** `#4A4A4A` (Borders, inaktif ikon çizgileri)
- **Danger/Error:** `#FF4D4D` (İptal işlemleri, kritik uyarılar)

---

## 2. Tipografi Sistemi (Typography)

Sistemde hız ve netlik için **Inter** veya **Epilogue** (belirtilen ekranlara göre) font ailesi kullanılır.

### Başlıklar (Headlines)
- **H1 (Hero/Display):** 38px - 56px | Extra Bold (800) | Letter Spacing: -2.0px
- **H2 (Screen Titles):** 26px | Bold (700) | Letter Spacing: -0.5px
- **H3 (Section Headers):** 17px - 20px | Bold (700)

### Gövde Metinleri (Body)
- **Body Large:** 15px - 16px | Medium (500) | #FFFFFF
- **Body Medium:** 13px - 14px | Regular (400) | #B8B8B8
- **Body Small:** 11px - 12px | Regular (400) | #8A8A8A

### Etiketler ve Sistem (Labels)
- **Overline / Micro:** 9px - 10px | Bold (700) | Uppercase | Letter Spacing: +0.10em
- **Tab Bar Labels:** 10px | Medium (500/600)

---

## 3. Yerleşim ve Boşluklar (Layout & Spacing)

Uygulama 8px'lik bir grid sistemi üzerine kuruludur.

- **Horizontal Padding:** 20px (Tüm ekranlarda standart yan boşluk)
- **Top Margin (Header):** 54px (Status bar altından başlayan güvenli alan)
- **Bottom Margin (Tab Bar):** 32px (Tab bar öncesi bırakılan nefes alanı)
- **Card Gap:** 12px - 16px (Dikey kartlar arası boşluk)
- **Section Spacing:** 24px - 28px (Farklı içerik grupları arası boşluk)

---

## 4. Bileşen Standartları (Component Standards)

### Kart Yapıları (Cards)
- **Corner Radius:** 16px - 20px
- **Border:** 1px solid `rgba(255, 255, 255, 0.04)`
- **Active State Border:** 1.5px solid `rgba(197, 248, 51, 0.30)`
- **Shadow:** Gölge yerine genellikle derinlik farkı (`#050505` vs `#161616`) kullanılır.

### Butonlar (Buttons)
- **Primary Button:** Lime (#C5F833) arka plan, Siyah (#0A0A0A) metin, 14px Radius.
- **Secondary Button:** Koyu gri (#161616) arka plan, Beyaz metin.
- **Icon Buttons:** 36px veya 40px daire, `#161616` arka plan.

### İkonografi
- **Style:** Outline (1.5px - 2px stroke weight)
- **Active Size:** 24px
- **Secondary Size:** 18px

---

## 5. Görsel Dil ve Atmosfer

- **Glow (Işıma):** Önemli aksiyonlarda ve aktif kartlarda lime rengi ışıma (`blur: 16px-32px`) kullanılarak "enerjik" bir his verilir.
- **Dashed Borders:** "Off-peak" veya "Fırsat" gibi alanlarda kesikli lime çizgiler kullanılır.
- **Data Visualization:** İnce, temiz çizgiler ve lime dolgulu ilerleme çubukları (progress bars) kullanılır.
