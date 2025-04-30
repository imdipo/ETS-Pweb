# Website Layanan Pelanggan EcoHydrate

Proyek ini adalah aplikasi web front-end untuk layanan pelanggan dari produk botol minum ramah lingkungan EcoHydrate. Website ini menampilkan informasi produk dan menyediakan berbagai fitur layanan pelanggan seperti formulir kontak, FAQ, dan sistem pelacakan tiket.

## Demo

![Screenshot website](/Frontend/images/tampilan_depan.png)

## Fitur Utama

### 1. Halaman Produk
- Showcase produk botol minum EcoHydrate dengan gambar dan deskripsi
- Tampilan fitur dan harga produk
- Layout responsif untuk semua ukuran layar

### 2. Formulir Kontak Pelanggan
- Formulir kontak yang terhubung langsung ke Google Sheets
- Preview pesan secara real-time
- Validasi input dengan JavaScript
- Responsif untuk semua ukuran layar

### 3. Halaman FAQ
- Tampilan accordion interaktif untuk daftar pertanyaan umum
- Animasi smooth untuk membuka dan menutup item FAQ
- Styling yang mudah dibaca dan profesional

### 4. Simulasi Lacak Tiket
- Form input nomor tiket dengan validasi format
- Simulasi status tiket yang berbeda berdasarkan angka dalam nomor tiket
- Tampilan status yang berbeda dengan warna yang sesuai

### 5. Navigasi & Layout
- Navigasi responsif dengan smooth scrolling
- Menu hamburger untuk tampilan mobile
- Aktifasi link navigasi otomatis berdasarkan posisi scroll
- Footer dengan informasi kontak dan navigasi cepat

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman web dan form
- **CSS3**: 
  - Styling responsif dengan media queries
  - Flexbox untuk layout
  - Animasi dan transisi untuk interaksi pengguna
- **JavaScript**: 
  - Manipulasi DOM
  - Validasi form
  - Event handling
  - Simulasi pelacakan tiket

## Cara Mengintegrasikan dengan Google Sheets

Website ini menggunakan Google Forms yang di-embed untuk mengirim data ke Google Sheets tanpa perlu backend server. Berikut langkah-langkahnya:

1. Buat Google Form baru di [Google Forms](https://forms.google.com/)
2. Tambahkan field berikut:
   - Nama (Text)
   - Email (Email)
   - Topik (Dropdown atau Text)
   - Pesan (Paragraph)
3. Klik tombol "Send" di pojok kanan atas
4. Pilih tab `<>` untuk mendapatkan kode embed
5. Salin ID form dari URL
6. Buka file HTML dan ganti `YOUR_FORM_ID` pada kode berikut:
   ```javascript
   document.getElementById('google-form').src = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";
   ```
7. Secara otomatis, setiap submission dari form akan tersimpan di Google Sheets yang terhubung dengan form tersebut

## Penjelasan Logika JavaScript

### 1. Navigasi Responsif

```javascript
// Navigasi mobile toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('show');
});
```
- Fungsi ini menangani tombol hamburger pada tampilan mobile
- Saat diklik, ia menambahkan/menghapus kelas CSS 'show' pada menu navigasi
- Kelas 'show' mengatur tampilan menu dari `display: none` menjadi `display: flex`

### 2. Smooth Scrolling

```javascript
// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Menutup menu mobile setelah klik
        document.querySelector('.nav-links').classList.remove('show');
    });
});
```
- Kode ini menambahkan event listener untuk semua link yang href-nya dimulai dengan "#"
- Saat link diklik, halaman akan scroll dengan animasi smooth ke elemen yang dituju
- Secara otomatis menutup menu navigasi mobile setelah link diklik

### 3. Aktifasi Link Navigasi berdasarkan Scroll

```javascript
// Aktifkan link navigasi berdasarkan scroll
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
```
- Mendeteksi posisi scroll pengguna di halaman
- Mengidentifikasi section mana yang sedang dilihat berdasarkan offsetTop
- Menambahkan kelas 'active' pada link navigasi yang sesuai
- Offset 150px ditambahkan agar section terdeteksi lebih awal saat scrolling

### 4. Accordion untuk FAQ

```javascript
// Toggle accordion untuk FAQ
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        
        // Toggle active class untuk item yang diklik
        accordionItem.classList.toggle('active');
        
        // Tutup accordion item lain
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
            }
        });
    });
});
```
- Menambahkan event listener click pada setiap header accordion
- Saat header diklik, toggle kelas 'active' pada parent element
- Kelas 'active' mengubah max-height accordion body dari 0 menjadi 1000px melalui CSS
- Secara otomatis menutup accordion item lain (behavior accordion)

### 5. Simulasi Tracking Tiket

```javascript
// Track Ticket Simulation
document.getElementById('ticket-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validasi nomor tiket
    const ticketNumber = document.getElementById('ticket-number').value;
    const ticketRegex = /^ECO-\d{5}$/;
    
    if (!ticketRegex.test(ticketNumber)) {
        document.getElementById('ticket-error').style.display = 'block';
        hideAllTicketResults();
        return;
    }
    
    document.getElementById('ticket-error').style.display = 'none';
    
    // Simulasi status tiket dengan hasil acak
    hideAllTicketResults();
    
    // Mendapatkan status acak berdasarkan nomor tiket
    const randomNum = getNumberFromTicket(ticketNumber);
    const status = getStatusByNumber(randomNum);
    
    // Menampilkan hasil status
    document.getElementById(status).style.display = 'block';
});
```
- Event listener untuk form submit pada form pelacakan tiket
- Validasi format tiket menggunakan regular expression (format: ECO-XXXXX)
- Jika format tidak valid, menampilkan pesan error
- Jika valid, memanggil fungsi untuk mendapatkan status tiket berdasarkan nomor

### 6. Fungsi Pendukung untuk Simulasi Tracking Tiket

```javascript
function hideAllTicketResults() {
    document.querySelectorAll('.ticket-result').forEach(result => {
        result.style.display = 'none';
    });
}

function getNumberFromTicket(ticket) {
    // Mengambil angka dari nomor tiket
    const matches = ticket.match(/\d+/);
    if (matches && matches.length > 0) {
        return parseInt(matches[0]);
    }
    return 0;
}

function getStatusByNumber(num) {
    // Menentukan status berdasarkan angka
    const lastDigit = num % 10;
    
    if (lastDigit >= 0 && lastDigit <= 3) {
        return 'ticket-processing';
    } else if (lastDigit >= 4 && lastDigit <= 6) {
        return 'ticket-completed';
    } else if (lastDigit >= 7 && lastDigit <= 8) {
        return 'ticket-waiting';
    } else {
        return 'ticket-not-found';
    }
}
```
- `hideAllTicketResults()`: Menyembunyikan semua elemen hasil tracking tiket
- `getNumberFromTicket()`: Mengekstrak angka dari string nomor tiket menggunakan regex
- `getStatusByNumber()`: Menentukan status tiket berdasarkan digit terakhir dari nomor tiket:
  - 0-3: Sedang Diproses
  - 4-6: Selesai
  - 7-8: Menunggu Tanggapan
  - 9: Tidak Ditemukan

### 7. Preview Pesan Formulir Kontak

```javascript
// Preview Form Contact
function updateMessagePreview() {
    // Ambil nilai dari iframe Google Form jika ada
    // Catatan: Ini hanya simulasi karena kita tidak bisa mengakses form di dalam iframe secara langsung
    // Dalam kasus nyata, Anda perlu menggunakan Google Form yang memungkinkan callback
    
    // Untuk demo, kita akan memperbarui preview saat pengguna mengisi form kontak
    const previewFields = {
        name: "John Doe",
        email: "johndoe@example.com",
        topic: "Informasi Produk",
        message: "Saya tertarik dengan botol EcoHydrate Classic. Apakah tersedia dalam warna lain selain yang ditampilkan di website?"
    };
    
    // Update preview
    document.getElementById('preview-name').textContent = previewFields.name;
    document.getElementById('preview-email').textContent = previewFields.email;
    document.getElementById('preview-topic').textContent = previewFields.topic;
    document.getElementById('preview-message').textContent = previewFields.message;
}

// Panggil fungsi updateMessagePreview untuk menampilkan data contoh
updateMessagePreview();
```
- Fungsi ini mensimulasikan preview pesan dari form kontak
- Dalam implementasi aktual dengan Google Form, kita perlu menggunakan solusi tambahan seperti:
  1. Custom form HTML dengan JavaScript yang mengirim data ke Google Form
  2. Menggunakan Google Apps Script untuk membuat form yang bisa berkomunikasi dengan halaman
- Untuk demo, fungsi ini menampilkan data contoh

