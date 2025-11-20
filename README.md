# Platform Quiz Aksara Jawa - FESTIKA JATIM 2025

## 📚 Deskripsi Proyek

Platform Quiz Aksara Jawa adalah aplikasi web edukasi interaktif yang dirancang untuk melestarikan dan mempromosikan penggunaan aksara Jawa (Hanacaraka) di era digital. Proyek ini khusus mengatasi masalah literasi bahasa daerah di Jombang dan seluruh Jawa Timur dengan membuat pembelajaran aksara Jawa menjadi interaktif dan menyenangkan untuk siswa SMA/SMK.

## 🎯 Tujuan

- Melestarikan budaya sastra Jawa di era digital
- Meningkatkan literasi bahasa daerah di Jawa Timur
- Membuat pembelajaran aksara Jawa interaktif dan engaging
- Mendorong generasi muda untuk mencintai budaya lokal
- Mewujudkan digitalisasi pembelajaran bermakna sesuai tema FESTIKA JATIM 2025

## 🏆 Kompetisi

- **Event**: FESTIKA JATIM 2025 - Lomba Arek_AI Murid Jatim
- **Kategori**: Aplikasi Web
- **Tim**: 2 orang siswa SMA kelas 11
- **Tema**: "Digitalisasi Pembelajaran Bermakna Wujudkan Pendidikan Berkualitas dan Unggul Menuju Indonesia Emas 2045"

## ✨ Fitur Utama

### 1. **Quiz Interaktif**
- 5 kategori quiz dengan tingkat kesulitan berbeda
- Total 21+ soal pilihan ganda
- Feedback langsung setelah menjawab
- Penjelasan detail untuk setiap jawaban
- Progress bar real-time

### 2. **Mode Belajar**
- 20 karakter aksara dasar (Hanacaraka)
- Penjelasan untuk setiap karakter
- Transliterasi Latin dan contoh kata
- Design card interaktif yang mudah dipahami

### 3. **Kategori Quiz**
- ✅ Aksara Legena (Dasar)
- ✅ Aksara Pasangan
- ✅ Aksara Murda (Huruf Kapital)
- ✅ Aksara Swara (Vokal)
- ✅ Sejarah Aksara Jawa

### 4. **Sistem Scoring**
- Perhitungan skor otomatis
- Persentase akurasi
- Durasi pengerjaan quiz
- Penyimpanan score di localStorage

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage
- **Kompatibilitas**: Semua browser modern (Chrome, Firefox, Safari, Edge)
- **Responsive**: Mobile-friendly design

## 📁 Struktur Folder

```
project/
├── index.html                 # Halaman utama
├── css/
│   ├── main.css              # Style global
│   └── components.css        # Style komponen
├── js/
│   └── app.js               # Logika aplikasi utama
└── assets/
    ├── data/
    │   ├── characters.json   # Data karakter aksara
    │   └── quizzes.json      # Data soal quiz
    ├── images/
    │   └── aksara/           # 20 SVG aksara
    ├── audio/
    │   ├── pronunciation/    # (Opsional untuk pengembangan lanjutan)
    │   └── effects/         # (Opsional untuk pengembangan lanjutan)
    └── ui/                  # (Opsional untuk ikon dan latar)
```

## 🚀 Cara Menjalankan

### Local Development
```bash
# 1. Clone atau extract project ini
cd project

# 2. Buka dengan Live Server (VS Code)
# - Install extension Live Server
# - Klik kanan pada index.html
# - Pilih "Open with Live Server"

# 3. Atau buka langsung dengan browser
# File -> Open File -> index.html
```

### Requirements
- Browser modern dengan support ES6
- Koneksi internet untuk load data JSON (atau bisa offline-first dengan PWA)

## 📊 Desain Sistem

### Color Palette
- **Primary**: #059669 (Emerald Green)
- **Secondary**: #0891B2 (Cyan)
- **Accent**: #F59E0B (Amber)
- **Success**: #10B981
- **Error**: #EF4444
- **Light Background**: #F5F3EE (Cream)
- **Dark Text**: #111827 (Navy)

### Typography
- **Headings**: Georgia, serif (nuansa budaya klasik)
- **Body**: Segoe UI, sans-serif (readable)
- **Display**: Noto Sans Javanese (aksara)

### Spacing System
- Base unit: 8px
- Responsive dengan media queries

## 🎨 Asset Aksara

20 karakter Hanacaraka dalam format SVG:
1. Ha, Na, Ca, Ra, Ka
2. Da, Ta, Sa, Wa, La
3. Pa, Dha, Ja, Ya, Nya
4. Ma, Ga, Ba, Tha, Nga

Setiap asset SVG sudah didesain dengan:
- Warna unik untuk identifikasi
- Label transliterasi
- Stroke yang jelas dan readable
- Responsif untuk berbagai ukuran

## 💾 Data Management

### localStorage Keys
- `quizScores`: Menyimpan riwayat score user
  ```json
  {
    "aksara_dasar": [
      {
        "score": 7,
        "total": 8,
        "percentage": 87.5,
        "date": "2025-11-20T10:30:00Z",
        "time": 120
      }
    ]
  }
  ```

## 🔄 Alur Aplikasi

```
Beranda
├── Hero Section (CTA buttons)
├── Statistics (Real-time)
└── Features Showcase
    ├── Quiz Interaktif
    ├── Mode Belajar
    └── Leaderboard

Quiz Categories
├── Select Quiz
├── Start Quiz
│   ├── Display Question
│   ├── Show Feedback
│   └── Next Question
└── Results & Review

Learn Mode
├── Browse Characters
└── Modal Detail Character

About
└── Project Info & Team
```

## 📈 Pengembangan Lanjutan (Phase 2)

Fitur yang bisa ditambahkan:
- ✨ Audio pronunciation dengan waveform
- ✨ Canvas drawing practice
- ✨ Gamification (badges, streaks, levels)
- ✨ Advanced leaderboard dengan filter
- ✨ Dark mode & theme customization
- ✨ Service Worker untuk PWA
- ✨ Offline functionality
- ✨ Drag & drop games
- ✨ Social sharing
- ✨ Teacher dashboard

## 🧪 Testing

### Browser Compatibility
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Device Testing
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667, 414x896)

### Functionality Testing
- ✅ Quiz mechanics (answer selection, scoring)
- ✅ Navigation (page transitions)
- ✅ Data persistence (localStorage)
- ✅ Responsive design
- ✅ Accessibility (keyboard navigation)

## 📝 Dokumentasi Kode

### Struktur Class App

```javascript
class QuizApp {
  // Initialization
  constructor()
  init()
  loadData()
  setupEventListeners()

  // Navigation
  showPage(page)

  // Quiz Management
  renderQuizCategories()
  startQuiz(quizId)
  displayQuestion()
  submitAnswer()
  showResults()
  showReview()

  // Learning
  renderLearningMode()
  showCharacterDetail(characterId)

  // Utilities
  saveScore()
  formatTime(seconds)
}
```

## 🎓 Cara Menggunakan Platform

### Sebagai Siswa
1. Buka halaman beranda
2. Pilih "Mulai Quiz" atau "Mode Belajar"
3. Untuk Quiz: pilih kategori → jawab soal → lihat score
4. Untuk Belajar: browse karakter aksara → baca penjelasan

### Sebagai Guru
1. Gunakan leaderboard untuk monitoring progress siswa
2. Share link ke kelas untuk home learning
3. Lihat mastery percentage per karakter

## 🔒 Keamanan & Privacy

- Tidak ada authentikasi (opsional untuk phase 2)
- Score tersimpan lokal di browser
- Tidak ada data yang dikirim ke server eksternal
- GDPR compliant (tidak collect personal data)

## 📞 Support & Feedback

Untuk pertanyaan atau feedback:
- **Email**: [Contact will be updated]
- **WhatsApp**: [Contact will be updated]
- **Form Feedback**: Tersedia di aplikasi

## 📄 Lisensi

MIT License - Bebas digunakan dan dikembangkan untuk kebutuhan pendidikan

## 🙏 Acknowledgments

- Dinas Pendidikan Provinsi Jawa Timur
- FESTIKA JATIM 2025 Committee
- Komunitas pelestari aksara Jawa
- Siswa SMA/SMK di Jawa Timur

---

**Dikembangkan untuk FESTIKA JATIM 2025 🏆**

*Melestarikan Budaya Jawa, Membangun Indonesia Emas 2045*
