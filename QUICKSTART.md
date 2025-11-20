# 🚀 Quick Start Guide - Platform Quiz Aksara Jawa

## ⚡ 5 Menit Setup

### Opsi 1: Buka Langsung (Paling Cepat)

1. **Extract/Clone project** ke folder
2. **Buka file** `index.html` dengan browser favorit Anda
   - Klik 2x pada `index.html`, atau
   - Drag & drop ke browser tab

**✅ Selesai! Aplikasi siap digunakan**

---

### Opsi 2: Gunakan Live Server (Recommended)

#### VS Code
1. Install extension "Live Server" dari Marketplace
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Browser akan terbuka otomatis di `http://localhost:5500`

#### PyCharm / WebStorm
1. Klik kanan pada `index.html`
2. Pilih "Run" atau "Open in Browser"
3. Pilih server lokal

#### Python (Built-in)
```bash
cd project
python -m http.server 8000
# Buka http://localhost:8000
```

#### Node.js (NPM http-server)
```bash
npm install -g http-server
cd project
http-server
# Buka http://localhost:8080
```

---

## 📱 Menggunakan Aplikasi

### 1️⃣ Beranda
- Klik **"Mulai Quiz"** untuk memulai kuis
- Klik **"Mode Belajar"** untuk pelajari karakter
- Baca informasi di bawah

### 2️⃣ Quiz
1. Pilih kategori quiz (5 pilihan tersedia)
2. Klik **"Mulai Quiz"**
3. Baca pertanyaan dan pilih jawaban
4. Lihat feedback langsung
5. Klik **"Lanjut"** untuk soal berikutnya
6. Lihat hasil akhir dan review

### 3️⃣ Mode Belajar
1. Lihat 20 karakter aksara dalam grid
2. Klik karakter untuk melihat detail lengkap
3. Baca penjelasan, contoh kata, dan arti
4. Tutup modal untuk kembali

### 4️⃣ Tentang
- Informasi proyek
- Tujuan dan team

---

## 📊 Kategori Quiz

| No | Kategori | Level | Jumlah Soal |
|----|----------|-------|------------|
| 1 | Aksara Dasar | 🟢 Mudah | 8 |
| 2 | Aksara Pasangan | 🟡 Sedang | 2 |
| 3 | Aksara Murda | 🟡 Sedang | 1 |
| 4 | Aksara Swara | 🟡 Sedang | 1 |
| 5 | Sejarah Aksara Jawa | 🔴 Sulit | 2 |

---

## 🎯 Fitur Utama

### Quiz Interaktif
- ✅ Multiple choice questions
- ✅ Instant feedback dengan penjelasan
- ✅ Progress bar real-time
- ✅ Scoring otomatis
- ✅ Review jawaban lengkap

### Learning Mode
- ✅ 20 karakter aksara
- ✅ Transliterasi Latin
- ✅ Penjelasan mendalam
- ✅ Contoh kata praktis
- ✅ Modal detail interaktif

### Data Management
- ✅ Score tersimpan otomatis
- ✅ Riwayat quiz tercatat
- ✅ Statistik per kategori
- ✅ Bekerja offline

---

## 💾 Data Penyimpanan

Aplikasi menyimpan data Anda di **Browser Storage (localStorage)**:
- Tidak ada data yang dikirim ke server
- Data tersimpan lokal di perangkat
- Akan hilang jika: cache browser dihapus, cookie dihapus
- Storage limit: ~5-10MB

### Lihat Data Tersimpan
1. Buka Browser DevTools (F12 atau Ctrl+Shift+I)
2. Tab **Application**
3. Pilih **Local Storage**
4. Cari domain website
5. Lihat key `quizScores`

---

## ⚙️ Requirements

### Browser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browser (iOS Safari, Chrome Android)

### Internet
- ✅ Tidak perlu koneksi setelah first load
- ✅ Bisa offline mode (semua file tersimpan lokal)
- ✅ Optimal: koneksi internet untuk pertama kali load

### Perangkat
- Desktop/Laptop
- Tablet
- Smartphone
- Sistem Operasi: Windows, macOS, Linux, iOS, Android

---

## 🎨 Customization

### Ubah Warna Tema
Edit `css/main.css` bagian `:root`:
```css
:root {
  --primary: #059669;        /* Ubah ke warna favorit */
  --secondary: #0891B2;
  --accent: #F59E0B;
  /* ... */
}
```

### Tambah Quiz Baru
Edit `assets/data/quizzes.json`:
```json
{
  "id": "quiz_baru",
  "name": "Nama Quiz",
  "description": "Deskripsi",
  "difficulty": "Easy",
  "questions": [
    {
      "id": 1,
      "question": "Pertanyaan?",
      "image": "path/to/image.svg",
      "options": ["A", "B", "C", "D"],
      "correct_answer": 0,
      "explanation": "Penjelasan"
    }
  ]
}
```

### Ganti Aksara Jawa
1. Buat/beli asset aksara Jawa (PNG/SVG)
2. Tempat di `assets/images/aksara/`
3. Update path di `assets/data/characters.json`

---

## 🐛 Troubleshooting

### ❌ File tidak ditemukan (404 Error)
- **Penyebab**: File path salah atau folder structure tidak sesuai
- **Solusi**:
  - Pastikan semua folder ada (assets/, css/, js/)
  - Pastikan semua file di tempat yang benar
  - Restart browser

### ❌ Quiz tidak muncul
- **Penyebab**: JSON file tidak ter-load
- **Solusi**:
  - Buka DevTools → Network tab
  - Lihat apakah `quizzes.json` ter-download
  - Jika 404: perbaiki path di `app.js`

### ❌ Tombol tidak berfungsi
- **Penyebab**: JavaScript tidak ter-load atau error
- **Solusi**:
  - Buka DevTools → Console tab
  - Lihat error messages
  - Refresh page (Ctrl+R atau Cmd+R)

### ❌ Tampilan berantakan/tidak responsif
- **Penyebab**: CSS tidak ter-load
- **Solusi**:
  - Hard refresh (Ctrl+Shift+R)
  - Clear cache browser
  - Ganti browser

### ❌ Data tidak tersimpan
- **Penyebab**: localStorage disabled
- **Solusi**:
  - Periksa browser privacy settings
  - Jangan gunakan Private/Incognito mode
  - Enable localStorage di browser settings

---

## 📈 Monitoring & Analytics

### Cek Statistik
Buka DevTools → Console, ketik:
```javascript
JSON.parse(localStorage.getItem('quizScores'))
```

### Reset Semua Data
Buka DevTools → Console, ketik:
```javascript
localStorage.removeItem('quizScores')
location.reload()
```

---

## 🚀 Deployment

### Deploy Gratis (5 Menit)

#### Netlify
1. Buka [netlify.com](https://netlify.com)
2. Sign up / Login
3. Drag & drop `project` folder
4. Selesai! Dapatkan URL publik

#### Vercel
1. Buka [vercel.com](https://vercel.com)
2. Sign up / Login
3. Klik "New Project"
4. Import dari GitHub atau drag folder
5. Deploy!

#### GitHub Pages
1. Push folder ke GitHub
2. Settings → GitHub Pages
3. Select branch & folder
4. Publish!

---

## 📞 Support

### Tanya Jawab

**Q: Berapa besar file?**
A: ~215 KB (uncompressed), ~60 KB (gzipped)

**Q: Bisa offline?**
A: Ya, setelah first load, semua asset tersimpan di browser

**Q: Berapa user sekaligus?**
A: Unlimited, ini aplikasi client-side (tidak ada server)

**Q: Bisa di-embed di website lain?**
A: Ya, bisa di-iframe atau di-host sendiri

**Q: Bisa ditambah fitur?**
A: Ya, buka `TECHNICAL_DOCUMENTATION.md` untuk petunjuk

---

## ✅ Checklist Sebelum Submit

- [ ] Semua file lengkap (HTML, CSS, JS, JSON, SVG)
- [ ] Quiz bekerja (semua kategori teruji)
- [ ] Learning mode berfungsi
- [ ] Score tersimpan & di-review bekerja
- [ ] Responsive design teruji (mobile + desktop)
- [ ] Tidak ada error di Console
- [ ] Cross-browser tested
- [ ] Video demo sudah dibuat
- [ ] Dokumentasi lengkap (README, TECHNICAL_DOCS)
- [ ] File di-compress/ZIP untuk submission

---

## 🎓 Pembelajaran Lanjutan

Untuk membuat fitur lebih advanced:
- Baca `TECHNICAL_DOCUMENTATION.md`
- Modifikasi `js/app.js` untuk logika custom
- Update CSS di `css/components.css`
- Tambah data di `assets/data/`

---

**Selamat menggunakan Platform Quiz Aksara Jawa! 🎉**

*Melestarikan Budaya Jawa, Membangun Indonesia Emas 2045*
