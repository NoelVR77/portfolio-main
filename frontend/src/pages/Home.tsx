import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Copy, Download, Eye, Heart, Menu, Star, X } from "lucide-react";
import { toast } from "sonner";

const personalImages = {
  poster:
    "https://customer-assets-agu9un31.emergentagent.net/job_21debd6c-88ee-4661-8473-763862305470/artifacts/2emwuyqd_image.png",
  portrait:
    "https://customer-assets-agu9un31.emergentagent.net/job_21debd6c-88ee-4661-8473-763862305470/artifacts/k8oiknq7_image.png",
  studio:
    "https://customer-assets-agu9un31.emergentagent.net/job_21debd6c-88ee-4661-8473-763862305470/artifacts/izs8pydl_image.png",
};

const contact = {
  email: "noelvr67@gmail.com",
  links: [
    { label: "Instagram", handle: "@noelvincentr_", href: "https://www.instagram.com/noelvincentr_?stkn=ZWxzOWs5dDV2aGMz", id: "instagram" },
    { label: "WhatsApp", handle: "+62 877-4507-1161", href: "https://wa.me/6287745071161", id: "whatsapp" },
    { label: "LinkedIn", handle: "noel-vincent-ramli", href: "https://www.linkedin.com/in/noel-vincent-ramli-8b71963b3", id: "linkedin" },
  ],
};

const cvFile = "/CV_Noel_Vincent_Ramli.pdf";

type ProjectCategory = "All" | "UI/UX" | "Visual";

interface Project {
  id: number;
  slug: string;
  year: string;
  category: Exclude<ProjectCategory, "All">;
  title: string;
  description: string;
  metric: string;
  image: string;
  color: string;
  logo?: BrandLogo;
  caseStudy?: CaseStudy;
  visualStudy?: VisualStudy;
}

interface BrandLogo {
  bg: string;
  accent: string;
  icon?: "heart" | "star";
  bold: string;
  light: string;
  caption: string;
}

interface VisualStudy {
  role: string;
  tools: string;
  context: string;
  summary: string;
  highlights: { label: string; value: string }[];
  findings: { title: string; description: string }[];
  deck?: { url: string; label: string; pages: number };
  website?: { url: string; label: string };
  gallery: Screen[];
}

type Screen = { label: string; image?: string; portrait?: boolean; bg?: string };

interface CaseStudy {
  role: string;
  team?: string;
  tools: string;
  context: string;
  previewIndexes: number[];
  previewDescription: string;
  problemTitle: string;
  problem: string;
  process?: { step: string; title: string; description: string }[];
  personas: { name: string; meta?: string; quote?: string; description: string }[];
  journey?: { stage: string; mood: string; note: string }[];
  solutionTitle: [string, string];
  solution: { title: string; description: string }[];
  designSystem?: { colors: { name: string; hex: string }[]; typography: string; spacing: string };
  figmaFeatures?: string[];
  screens: Screen[];
}

const projects: Project[] = [
  {
    id: 1,
    slug: "binus-health",
    year: "2025",
    category: "UI/UX",
    title: "Binus Health",
    description: "Aplikasi kesehatan mobile yang membantu mahasiswa Binus Semarang menyeimbangkan kehidupan akademik dengan pola hidup sehat — mulai dari cek kalori, menu kantin kampus, sampai pengingat olahraga.",
    metric: "RISET & DESAIN UX / 01",
    image: personalImages.poster,
    color: "#dd3028",
    logo: { bg: "#0b3a2c", accent: "#a9e6bf", icon: "heart", bold: "BINUS", light: "Health", caption: "KESEHATAN / 2025" },
    caseStudy: {
      role: "Desainer UI/UX",
      team: "Health One, Physique Two",
      tools: "Figma",
      context: "Proyek mata kuliah, ISYS6724052 — UX Research & Design, Binus University",
      previewIndexes: [1, 2, 3],
      previewDescription: "Tiga layar utama untuk melihat bagaimana Binus Health membantu mahasiswa membangun ritme hidup sehat di tengah kesibukan kampus.",
      problemTitle: "Mahasiswa tahu harus hidup sehat.",
      problem: "Mahasiswa tahu harus hidup sehat. Yang sulit adalah meluangkan waktunya. Jadwal akademik yang padat, kegiatan ekstrakurikuler, dan kehidupan sosial yang aktif membuat mahasiswa Binus sulit menyisihkan waktu untuk olahraga dan menjaga pola makan. Riset ke target pengguna — mahasiswa Binus usia 18-24 tahun — menemukan tiga keluhan utama: sulit konsisten berolahraga di tengah jadwal padat, minim kesadaran akan asupan kalori harian, dan butuh pengingat dari luar supaya tetap konsisten.",
      process: [
        { step: "01", title: "Empathize", description: "Mengobservasi pola hidup mahasiswa Binus Semarang dan berkaca dari pengalaman tim sendiri dalam menyeimbangkan tugas kuliah dan kesehatan." },
        { step: "02", title: "Define", description: "Menyusun 6 user persona, memetakan user journey, dan melakukan riset kompetitor (SWOT & Lightning Demo) untuk menajamkan arah fitur." },
        { step: "03", title: "Ideate", description: "Brainstorming terbuka yang disaring menjadi 8 ide fitur inti berdasarkan relevansi dan kelayakan." },
      ],
      personas: [{ name: "Andi Kusuma", description: "Mahasiswa Desain Komunikasi Visual yang kesulitan meluangkan waktu untuk olahraga dan makan sehat di tengah jadwal kuliah yang padat. Ia berharap ada aplikasi yang membuatnya lebih bersemangat menjalani hidup sehat, bukan menambah beban." }],
      solutionTitle: ["Lima fitur utama", "untuk ritme yang lebih sehat."],
      solution: [
        { title: "Home", description: "Akses cepat ke Customer Service, About Us & FAQ lewat draggable tab, artikel kesehatan, dan ringkasan kalori dari koneksi wearable." },
        { title: "Cek Kalori", description: "Cari makanan dan masukkan beratnya untuk melihat kandungan kalori, lengkap dengan indikator warna hijau/oranye/merah." },
        { title: "Cek Kantin", description: "Jelajahi menu tiap kantin kampus lengkap dengan harga, kalori, dan rincian gizi." },
        { title: "Reminder", description: "Jadwalkan aktivitas lewat kalender dan atur alarm dengan getaran, nada dering, dan catatan kustom." },
        { title: "Profil & Analisis", description: "Kelola data diri dan pantau kalori masuk vs terbakar secara harian, mingguan, dan bulanan." },
      ],
      screens: [
        { label: "01 / Splash · Onboarding · Auth", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/qwl89205_1.%20Splash%2C%20Onboarding%20%26%20Auth.webp" },
        { label: "02 / Home", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/mgd88shv_2.%20Home.png" },
        { label: "03 / Cek Kalori", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/d979hfxs_3.%20Cek%20Kalori.webp" },
        { label: "04 / Cek Kantin", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/q3087h8v_4.%20Cek%20Kantin.webp" },
        { label: "05 / Reminder", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/a5sfkxmx_5.%20Reminder.png" },
        { label: "06 / Analisis", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/uex1h6tu_6.%20Analisis.webp" },
        { label: "07 / Profil", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/l8jwpmyu_7.%20Profil.png" },
        { label: "08 / Support", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/98oypkky_8.%20Support.png" },
      ],
    },
  },
  {
    id: 2,
    slug: "munchware",
    year: "2025",
    category: "Visual",
    title: "Munchware",
    description: "Kampanye visual dan strategi konten digital untuk Munchware — brand sendok edible yang mengajak orang makan makanannya, sekaligus sendoknya. Dari identitas visual, konten Instagram & TikTok, sampai laporan analitik digitalnya.",
    metric: "VISUAL SYSTEM / 02",
    image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/5qbalxbs_munchware_cover.png",
    color: "#e4efdf",
    visualStudy: {
      role: "Visual & Content Designer",
      tools: "Figma, Canva, CapCut, Google Analytics 4",
      context: "Digital Analytics Strategic Report — Sessions 15-17: Navigation & Acquisition Reports",
      summary: "Munchware (EcoVibes) adalah brand sendok edible berbasis kue yang 100% alami dan biodegradable. Tantangannya: membuat produk yang terdengar aneh — sendok yang bisa dimakan — jadi terasa lezat, aman, dan menyenangkan lewat visual. Saya merancang sistem visual bernuansa hijau-alam dan cokelat gandum, menurunkannya ke feed Instagram, video TikTok, dan landing page, lalu mengukur hasilnya lewat GA4. Hook konten \"Makan sendoknya?! Emang aman?\" dipakai untuk memancing rasa penasaran dan menjawabnya lewat konten edukatif.",
      highlights: [
        { label: "Pengguna aktif · Organic Social, 30 hari", value: "858" },
        { label: "Sesi browsing berkualitas", value: "640" },
        { label: "Return ratio Instagram", value: "83,3%" },
        { label: "Slide deck analitik", value: "12" },
      ],
      findings: [
        { title: "Facebook = volume", description: "Kanal sosial dengan pengguna terbanyak (101 users). Langkah lanjut: uji Facebook Shops dan penetrasi grup eco-conscious & F&B." },
        { title: "Instagram = kualitas", description: "Volume kecil (18 users) tapi sessions-to-users ratio tertinggi, 83,3%. Fokus pada Reels \"people eating their spoons\" dan frekuensi Stories." },
        { title: "LinkedIn = peluang B2B", description: "7 pengguna datang organik tanpa strategi. Peluang outbound ke katering dan penyelenggara acara korporat." },
        { title: "Measurement plan", description: "Lima event GA4 — view_item, add_to_cart, begin_checkout, purchase, share — untuk mengukur corong dari penelusuran produk sampai pembayaran." },
      ],
      deck: { url: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/gtd957q7_Munchware%20Analytics%20Strategic%20Deck.pdf", label: "Munchware Analytics Strategic Deck", pages: 12 },
      website: { url: "https://ecovibes-web.vercel.app/", label: "ecovibes-web.vercel.app" },
      gallery: [
        { label: "01 / Cover laporan analitik", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/5qbalxbs_munchware_cover.png" },
        { label: "02 / Feed Instagram @munchware_ecovibe", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/02bv8r6g_image.png", portrait: true },
        { label: "03 / Profil TikTok", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/rtvfgtnk_image.png", portrait: true },
        { label: "04 / Konten \"Makan sendoknya?!\"", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/0oum17g3_image.png", portrait: true },
      ],
    },
  },
  {
    id: 3,
    slug: "starwave",
    year: "2025",
    category: "UI/UX",
    title: "StarWave",
    description: "Aplikasi mobile yang menghubungkan fans langsung dengan idola favorit mereka — konten eksklusif, forum diskusi per artis, chat bot, dan toko merchandise resmi.",
    metric: "RISET & DESAIN UX / 03",
    image: personalImages.portrait,
    color: "#0E2A2F",
    logo: { bg: "#0E2A2F", accent: "#20988F", icon: "star", bold: "STAR", light: "Wave", caption: "HIBURAN / 2025" },
    caseStudy: {
      role: "UI/UX Designer",
      tools: "Figma",
      context: "Proyek mata kuliah, ISYS6724052 — UX Research & Design, Binus University",
      previewIndexes: [3, 4, 6],
      previewDescription: "Tiga layar utama untuk melihat bagaimana StarWave mendekatkan fans dengan idolanya — dari beranda, ruang interaksi, sampai toko merchandise resmi.",
      problemTitle: "Media sosial mendekatkan fans ke idola, tapi tidak cukup dekat.",
      problem: "Instagram, X, dan YouTube memungkinkan fans mengikuti idola, tapi interaksinya terbatas dan kurang personal. Fans juga kesulitan mendapat informasi kegiatan idola yang terpercaya, dan sering ragu saat membeli merchandise resmi karena takut tertipu penjual tidak resmi. Target pengguna: fans berusia 13-30 tahun di Indonesia yang aktif mengikuti dunia hiburan.",
      personas: [
        { name: "Nadia Putri", meta: "19 · Mahasiswi & fans aktif K-pop, Bandung", quote: "Aku mau update tentang idolaku yang valid, dan bisa beli merch official tanpa takut ketipu.", description: "Frustrasi: interaksi di media sosial tenggelam di antara banyak komentar, informasi simpang siur, dan takut tertipu saat membeli merchandise tidak resmi." },
        { name: "Raka Pratama", meta: "25 · Karyawan muda, penggemar musisi & aktor, Jakarta", quote: "Aku sibuk. Kasih aku cara cepat untuk cek kabar idola dan checkout merch tanpa ribet.", description: "Frustrasi: formulir panjang yang melelahkan, tidak ada konfirmasi jelas setelah membeli, dan antarmuka ramai yang membingungkan." },
      ],
      journey: [
        { stage: "Discover & Download", mood: "4/5", note: "Antusias" },
        { stage: "Onboarding & Sign Up", mood: "3/5", note: "Netral — form 6 isian terasa panjang" },
        { stage: "Explore Home", mood: "4.5/5", note: "Senang" },
        { stage: "Engage: Interact & Chat Bot", mood: "4.5/5", note: "Senang" },
        { stage: "Purchase di Shop", mood: "3/5", note: "Netral — dibatasi 1 barang per checkout" },
        { stage: "Manage Profile & Bantuan", mood: "4/5", note: "Antusias" },
      ],
      solutionTitle: ["Lima menu utama", "untuk fans yang ingin lebih dekat."],
      solution: [
        { title: "Home", description: "Banner update yang auto-slide tiap 2 detik, daftar merchandise tren yang bisa di-scroll horizontal, dan idola baru yang bergabung." },
        { title: "Interact", description: "Pilih artis, lalu jelajahi tab Feed (postingan sesama fans) dan tab Artist (postingan resmi dari idola yang bisa di-like)." },
        { title: "Chat Bot", description: "Asisten \"Ron\" yang menjawab pertanyaan seputar aplikasi dan idola, lengkap tutorial saat pertama kali dibuka." },
        { title: "Shop", description: "Katalog merchandise resmi 2 kolom lengkap rating & harga, checkout dengan batas 1 barang per transaksi dan pop-up konfirmasi." },
        { title: "Profile", description: "Kelola data diri, plus sub-menu FAQ (accordion) dan About Us dengan draggable map lokasi kantor." },
      ],
      designSystem: {
        colors: [
          { name: "Primary", hex: "#20988F" },
          { name: "Primary Dark", hex: "#0F5F5A" },
          { name: "Accent Pink · tombol aksi & harga", hex: "#DD5FE9" },
          { name: "Accent Purple · tab bar footer", hex: "#916EFF" },
          { name: "BG Dark · latar seluruh halaman", hex: "#0E2A2F" },
          { name: "Surface · kartu & form", hex: "#FFFFFF" },
          { name: "Star · rating bintang", hex: "#FFC53D" },
        ],
        typography: "Poppins — Heading/Title 20px SemiBold · Heading/Section 16px SemiBold · Body 13px · Caption 11px",
        spacing: "Spacing 4 / 8 / 12 / 16 / 24 / 32px · Radius 8 / 12 / 16 / 24px",
      },
      figmaFeatures: ["Smart Animate — animasi logo splash & carousel onboarding", "Auto Layout", "Overlay Actions — pop-up sukses sign up / sign in / pembelian", "Tab Control — Feed/Artist, Profile", "Accordion Control — FAQ", "Light Box — preview foto", "Photo Carousel", "Draggable Maps — About Us"],
      screens: ([
        { label: "01 / Splash Animation", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/5d5hxyno_Splash%20Animation.webp" },
        { label: "02 / Onboarding", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/o9qpa1fk_Onboarding.png" },
        { label: "03 / Auth", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/dherdh7y_Auth.webp" },
        { label: "04 / Home", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/e9jj94ja_Home.png" },
        { label: "05 / Interact", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/perpbnkf_Interact.png" },
        { label: "06 / Chat Bot", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/9a8oviog_Chat%20Bot.png" },
        { label: "07 / Shop", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/qcwcoazl_Shop.png" },
        { label: "08 / Profile", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/61i6ruaz_Profile.webp" },
        { label: "09 / Pop-ups & Overlay", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/84lwy88e_Popups%20%28Overlay%29.png" },
        { label: "10 / About Us", image: "https://customer-assets-agu9un31.emergentagent.net/job_ux-showcase-126/artifacts/34xb95rw_About%20Us.png" },
      ] as Screen[]).map((screen) => ({ ...screen, bg: "#454545" })),
    },
  },
  {
    id: 4,
    slug: "boskaf",
    year: "2026",
    category: "UI/UX",
    title: "Boskaf",
    description: "Sistem pemesanan mandiri (self-order) berbasis web/mobile untuk Boskaf Coffee Roaster — memudahkan pelanggan memesan dari meja, memilih varian menu, kustomisasi dapur, hingga pembayaran QRIS/tunai tanpa antre.",
    metric: "RISET & DESAIN UX / 04",
    image: "/projects/boskaf/cover.jpg",
    color: "#231709",
    logo: { bg: "#231709", accent: "#c49a6c", bold: "BOSKAF", light: "Roasters", caption: "SELF-ORDER / 2026" },
    caseStudy: {
      role: "UI/UX Designer",
      team: "Boskaf Experience Team",
      tools: "Figma",
      context: "Proyek Desain Sistem Pemesanan Mandiri (Table Self-Ordering) — Boskaf Coffee Roaster",
      previewIndexes: [0, 1, 2],
      previewDescription: "Tiga alur utama Boskaf: mulai dari onboarding meja, eksplorasi katalog menu dengan modal kustomisasi, hingga ringkasan order dan pembayaran QRIS langsung dari meja.",
      problemTitle: "Antrean kasir yang menumpuk dan miskomunikasi pesanan saat kafe ramai.",
      problem: "Di coffee shop dan roastery yang ramai, pelanggan sering harus antre lama di kasir hanya untuk memilih menu dan membayar. Selain itu, catatan kustom (seperti preferensi gula, es, atau permintaan dapur tertentu) kerap kali salah tercatat saat suasana kafe bising. Boskaf memerlukan sistem pemesanan mandiri berbasis meja yang cepat, fleksibel dalam pilihan pembayaran (QRIS instan atau tunai ke kasir), dan menyajikan visual menu yang menggugah selera.",
      process: [
        { step: "01", title: "Empathize", description: "Mengamati alur pemesanan langsung di kafe, mencatat titik frustrasi antrean kasir, serta mewawancarai pelanggan dan barista terkait efisiensi pemesanan." },
        { step: "02", title: "Define", description: "Menyusun user persona, memetakan flow dari scan QR meja menuju pembayaran, dan merumuskan fitur kunci seperti catatan dapur dan pelacakan pesanan." },
        { step: "03", title: "Ideate & Prototype", description: "Merancang wireframe hingga interactive prototype di Figma dengan nuansa warna warm coffee roaster yang ramah dan konsisten." },
      ],
      personas: [
        { name: "Dimas Nugraha", meta: "23 · Remote Worker & Coffee Enthusiast, Semarang", quote: "Saya ingin langsung duduk, buka menu lewat HP tanpa harus antre di kasir, dan bayar lewat QRIS.", description: "Frustrasi: Antrean kasir yang membuang waktu produktif, menu fisik yang kotor/robek, dan repot memanggil barista saat ingin pesan tambahan." },
        { name: "Siti Rahma", meta: "21 · Mahasiswi & Penggemar Kuliner, Semarang", quote: "Kadang mau pesan menu dengan request khusus, tapi takut pelayan salah dengar kalau kafe lagi ramai.", description: "Frustrasi: Kurang detailnya info bahan/menu makanan, serta kekhawatiran catatan kustom tidak tersampaikan dengan akurat ke bagian dapur." },
      ],
      journey: [
        { stage: "Duduk & Buka Menu Meja", mood: "4.5/5", note: "Cepat — langsung tersambung ke Table 01 tanpa login rumit" },
        { stage: "Jelajahi Katalog Kategori", mood: "5/5", note: "Sangat puas — navigasi kategori rapi dan gambar menu jelas" },
        { stage: "Kustomisasi & Catatan Dapur", mood: "4/5", note: "Jelas — pop-up catatan memudahkan instruksi khusus" },
        { stage: "Pilih Metode Pembayaran", mood: "4.5/5", note: "Fleksibel — pilihan bayar langsung via QRIS atau tunai di kasir" },
        { stage: "Pesanan Diterima & Estimasi", mood: "5/5", note: "Tenang — ada konfirmasi nomor meja dan estimasi penyajian ~15 menit" },
        { stage: "Lihat Riwayat Pesanan", mood: "4/5", note: "Praktis — pelanggan dapat memeriksa kembali rincian tagihan" },
      ],
      solutionTitle: ["Tiga flow esensial", "untuk pengalaman ngopi tanpa hambatan."],
      solution: [
        { title: "Table Landing & Onboarding", description: "Identifikasi otomatis nomor meja (Table 01), banner selamat datang, tombol akses menu utama, riwayat pesanan, dan pemanggilan staf jika butuh bantuan." },
        { title: "Katalog Menu & Kategori", description: "Pengelompokan menu rapi (Indonesian - Asian, Western, Bakery, Side & Snack, Coffee, Non-Coffee, Signature) lengkap dengan modal pop-up detail dan counter kuantitas." },
        { title: "List Order & Catatan Khusus Dapur", description: "Halaman checkout yang merinci subtotal, pajak & layanan, serta modal interaktif untuk menambahkan instruksi khusus bagi barista atau juru masak." },
        { title: "Metode Pembayaran Fleksibel", description: "Dukungan penuh untuk scan QRIS mandiri bagi pembayaran nontunai, serta opsi bayar tunai terarah ke kasir." },
        { title: "Konfirmasi & Riwayat Transaksi", description: "Layar status pesanan sukses dengan estimasi waktu (~15 menit) dan arsip riwayat pesanan meja." },
      ],
      designSystem: {
        colors: [
          { name: "Espresso Dark · Latar utama", hex: "#1E140A" },
          { name: "Coffee Roast · Kartu & Surface", hex: "#2C1D11" },
          { name: "Caramel Gold · Tombol & Aksen", hex: "#C49A6C" },
          { name: "Warm Cream · Teks & Kontras", hex: "#EAE2D7" },
          { name: "Deep Charcoal · Sub-elemen", hex: "#140D07" },
          { name: "Soft Tan · Garis & Border", hex: "#4A3B2C" },
          { name: "Accent Amber · Status & Tag", hex: "#D4A373" },
        ],
        typography: "Poppins & Sora — Heading/Title SemiBold · Body 13px Clean · Caption 11px Monospace",
        spacing: "Spacing 4 / 8 / 12 / 16 / 24 / 32px · Radius 8 / 12 / 16 / 24px",
      },
      figmaFeatures: ["Auto Layout", "Interactive Components — counter & modal catatan", "Overlay Actions — pop-up kustomisasi menu & modal dapur", "Smart Animate — transisi splash screen", "Component Variants — tab kategori aktif", "Draggable / Scrollable Lists — katalog menu horizontal & vertikal"],
      screens: ([
        { label: "01 / Splash · Loading · Table Landing", image: "/projects/boskaf/onboarding.png" },
        { label: "02 / Katalog Menu & Kategori", image: "/projects/boskaf/menu.png" },
        { label: "03 / Order List · Pembayaran QRIS · Status", image: "/projects/boskaf/checkout.png" },
      ] as Screen[]).map((screen) => ({ ...screen, bg: "#1E140A" })),
    },
  },
];

const navItems = [
  { label: "Projects", href: "#projects", testId: "nav-projects-link" },
  { label: "Experiments", href: "#experiments", testId: "nav-experiments-link" },
  { label: "About", href: "#about", testId: "nav-about-link" },
  { label: "CV", href: "#cv", testId: "nav-cv-link" },
];

function PacmanIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3600);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onComplete]);

  return (
    <section className="fixed inset-0 z-50 flex min-h-svh flex-col overflow-hidden bg-[#090909] text-white" data-testid="pacman-intro-screen" aria-label="Portfolio loading intro">
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 sm:px-10" data-testid="pacman-intro-header">
        <span data-testid="pacman-intro-brand">NVR / PORTFOLIO 01</span>
        <span data-testid="pacman-intro-score">HIGH SCORE: 19982026</span>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-6">
        <div className="absolute inset-x-6 top-1/2 h-px bg-[#ffe600]/25 sm:inset-x-20" />
        <div className="absolute inset-x-12 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-32" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span key={index} className="pac-dot" />)}
        </div>
        <div className="pacman-runner" aria-hidden="true"><span /></div>
        <div className="relative z-10 text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#ffe600]" data-testid="pacman-loading-label">INSERT COFFEE / LOADING CREATIVE SYSTEM</p>
          <h1 className="font-heading text-5xl font-black uppercase tracking-[-0.08em] sm:text-8xl" data-testid="pacman-loading-title">READY PLAYER<br /><span className="text-[#ff2a2a]">NOEL</span></h1>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/15 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 sm:px-10" data-testid="pacman-intro-footer">
        <span data-testid="pacman-loading-status">LOADING 03 / 03</span>
        <button className="group border border-white/30 px-4 py-2 text-white transition-colors hover:border-[#ffe600] hover:text-[#ffe600]" onClick={onComplete} data-testid="skip-intro-button">SKIP INTRO <span className="text-white/40 group-hover:text-[#ffe600]">[ESC]</span></button>
      </div>
    </section>
  );
}

function BrandLogoCover({ slug, title, logo, compact = false, scope }: { slug: string; title: string; logo: BrandLogo; compact?: boolean; scope: "card" | "detail" }) {
  const Icon = logo.icon === "star" ? Star : logo.icon === "heart" ? Heart : null;
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${compact ? "h-full w-full" : "min-h-56 sm:min-h-72"}`} style={{ backgroundColor: logo.bg }} data-testid={`${slug}-logo-cover-${scope}`} aria-label={`Logo ${title}`}>
      <div className={`relative flex flex-col items-center justify-center rounded-full ${compact ? "h-24 w-24 gap-1" : "h-44 w-44 gap-2 sm:h-52 sm:w-52"}`} style={{ backgroundColor: logo.accent, color: logo.bg, boxShadow: `0 0 0 10px ${logo.accent}1a` }}>
        {Icon && <Icon style={{ fill: logo.bg }} size={compact ? 16 : 28} strokeWidth={1.5} data-testid={`${slug}-logo-icon-${scope}`} />}
        <span className={`text-center font-heading font-black leading-none tracking-[-0.04em] ${compact ? "text-xs" : "text-2xl"}`} data-testid={`${slug}-logo-wordmark-${scope}`}>{logo.bold}</span>
        <span className={`text-center font-heading leading-none ${compact ? "text-[9px]" : "text-base"}`}>{logo.light}</span>
      </div>
      <span className={`absolute font-mono uppercase tracking-[0.2em] opacity-60 ${compact ? "bottom-3 left-3 text-[8px]" : "bottom-4 left-4 text-[9px]"}`} style={{ color: logo.accent }} data-testid={`${slug}-logo-caption-${scope}`}>{logo.caption}</span>
    </div>
  );
}

function ScreenSlot({ screen, index, testPrefix, tone, onZoom }: { screen: Screen; index: number; testPrefix: string; tone: "preview" | "detail"; onZoom: (screen: Screen) => void }) {
  const id = `${testPrefix}-${index + 1}`;
  const placeholder = tone === "preview"
    ? <div className="absolute inset-3 border border-dashed border-[#a9e6bf]/30 bg-[#0b3a2c]/25"><span className="absolute left-2 top-2 font-mono text-[8px] text-[#a9e6bf]/60">UNGGAH LAYAR</span><span className="absolute bottom-2 right-2 text-2xl text-[#a9e6bf]/80">+</span></div>
    : <div className="absolute inset-3 border border-dashed border-white/15"><span className="absolute left-2 top-2 font-mono text-[8px] text-white/25">UNGGAH LAYAR</span><span className="absolute bottom-2 right-2 text-2xl text-[#ff2a2a]/70">+</span></div>;
  const frame = `relative flex w-full ${screen.portrait ? "aspect-[0.5]" : "aspect-[1.6]"} flex-col justify-end overflow-hidden border border-white/15 bg-[#18181a] p-3 text-left`;
  const label = <span className="relative font-mono text-[9px] uppercase leading-4 tracking-[0.12em] text-white/75" data-testid={`${id}-label`}>{screen.label}</span>;
  if (!screen.image) return <div className={frame} data-testid={id}>{placeholder}{label}</div>;
  return (
    <button type="button" className={`${frame} group cursor-zoom-in transition hover:border-[#ff2a2a]`} onClick={() => onZoom(screen)} aria-label={`Perbesar ${screen.label}`} data-testid={id}>
      <img src={screen.image} alt={screen.label} loading="lazy" className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]" style={{ backgroundColor: screen.bg ?? "#ffffff" }} data-testid={`${id}-image`} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 to-transparent" aria-hidden="true" />
      {label}
    </button>
  );
}

function ScreenLightbox({ screen, onClose }: { screen: Screen; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={screen.label} onClick={onClose} data-testid="screen-lightbox">
      <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70" data-testid="screen-lightbox-label">{screen.label}</span><button className="border border-white/20 p-2 text-white/70 transition hover:border-[#ff2a2a] hover:text-white" onClick={onClose} aria-label="Tutup gambar" data-testid="screen-lightbox-close-button"><X size={18} /></button></div>
      <img src={screen.image} alt={screen.label} className="mt-4 min-h-0 flex-1 w-full object-contain" style={{ backgroundColor: screen.bg ?? "#ffffff" }} onClick={(event) => event.stopPropagation()} data-testid="screen-lightbox-image" />
    </div>
  );
}

function CVPreviewModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex='-1'])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const frame = iframeRef.current;
    const attachFrameKeydown = () => frame?.contentWindow?.addEventListener("keydown", onKeyDown, true);
    frame?.addEventListener("load", attachFrameKeydown);
    attachFrameKeydown();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      frame?.removeEventListener("load", attachFrameKeydown);
      frame?.contentWindow?.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm animate-in fade-in-0 duration-200 sm:p-6" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="cv-preview-overlay">
      <section ref={dialogRef} className="flex max-h-[90vh] w-full max-w-5xl animate-in fade-in-0 zoom-in-95 flex-col overflow-hidden border border-white/20 bg-[#111112] duration-200" role="dialog" aria-modal="true" aria-label="CV Noel Vincent Ramli" onBlurCapture={(event) => { const nextTarget = event.relatedTarget; if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) closeButtonRef.current?.focus(); }} data-testid="cv-preview-modal">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70" data-testid="cv-preview-label">CV / Noel Vincent Ramli</p>
          <div className="flex flex-wrap items-center gap-2">
            <a href={cvFile} download="CV_Noel_Vincent_Ramli.pdf" className="inline-flex items-center gap-2 bg-[#ff2a2a] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#ff2a2a]" data-testid="cv-preview-download"><Download size={13} />Download CV</a>
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/75 transition hover:border-[#ff2a2a] hover:text-[#ff2a2a]" data-testid="cv-preview-new-tab">Open in new tab <ArrowUpRight size={13} /></a>
            <button ref={closeButtonRef} type="button" className="border border-white/20 p-2 text-white/70 transition hover:border-[#ff2a2a] hover:text-white" onClick={onClose} aria-label="Close CV preview" data-testid="cv-preview-close"><X size={16} /></button>
          </div>
        </header>
        <iframe ref={iframeRef} src={cvFile} title="CV Noel Vincent Ramli PDF preview" className="min-h-0 w-full flex-1 bg-white" style={{ height: "78vh" }} data-testid="cv-preview-frame" />
      </section>
    </div>
  );
}

function ProjectQuickPreview({ project, onClose, onContinue, onZoom }: { project: Project; onClose: () => void; onContinue: () => void; onZoom: (screen: Screen) => void }) {
  const detail = project.caseStudy;
  const screens = detail ? detail.previewIndexes.map((index) => detail.screens[index]).filter((screen): screen is Screen => Boolean(screen)) : [];
  const slug = project.slug;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Preview cepat ${project.title}`} data-testid="project-quick-preview">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/20 bg-[#111112] p-5 sm:p-8">
        <button className="absolute right-4 top-4 border border-white/20 p-2 text-white/70 transition hover:border-[#ff2a2a] hover:text-white" onClick={onClose} aria-label={`Tutup preview ${project.title}`} data-testid={`${slug}-preview-close-button`}><X size={18} /></button>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff2a2a]" data-testid={`${slug}-preview-kicker`}>{project.title.toUpperCase()} / PREVIEW CEPAT</p>
        <h2 className="pr-10 font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl" data-testid={`${slug}-preview-title`}>Lihat sekilas<br /><span className="text-white/35">desainnya.</span></h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-white/55" data-testid={`${slug}-preview-description`}>{detail?.previewDescription}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3" data-testid={`${slug}-preview-gallery`}>
          {screens.map((screen, index) => <ScreenSlot key={screen.label} screen={screen} index={index} testPrefix={`${slug}-preview-screen`} tone="preview" onZoom={onZoom} />)}
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35" data-testid={`${slug}-preview-note`}>{screens.map((screen) => screen.label.replace(/^\d+\s\/\s/, "")).join(" / ")}</span><button className="inline-flex items-center justify-center gap-2 bg-[#ff2a2a] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#ff2a2a]" onClick={onContinue} data-testid={`${slug}-full-case-study-button`}>Buka studi kasus lengkap <ArrowUpRight size={14} /></button></div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onZoom }: { project: Project; onClose: () => void; onZoom: (screen: Screen) => void }) {
  const detail = project.caseStudy;
  const visual = project.visualStudy;
  const slug = project.slug;
  const sectionLabel = (index: number, name: string) => `${String(index).padStart(2, "0")} / ${name}`;
  let sectionNumber = 0;
  const nextLabel = (name: string) => sectionLabel(++sectionNumber, name);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${project.title} preview`} data-testid="project-modal">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/20 bg-[#111112] p-5 sm:p-8">
        <button className="absolute right-4 top-4 border border-white/20 p-2 text-white/70 transition hover:border-[#ff2a2a] hover:text-white" onClick={onClose} aria-label={detail ? `Tutup studi kasus ${project.title}` : "Close project preview"} data-testid="project-modal-close-button"><X size={18} /></button>
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff2a2a]" data-testid="project-modal-category">{project.metric}</p>
        <h2 className="max-w-xl pr-10 font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl" data-testid="project-modal-title">{project.title}</h2>
        <div className="my-7 overflow-hidden">{project.logo ? <BrandLogoCover slug={slug} title={project.title} logo={project.logo} scope="detail" /> : <div className="h-56 sm:h-72"><img src={project.image} alt={`${project.title} visual`} className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" data-testid="project-modal-image" /></div>}</div>
        <p className="max-w-2xl text-base leading-7 text-white/65" data-testid="project-modal-description">{project.description}</p>
        {detail ? (
          <div className="mt-10 space-y-12" data-testid={`${slug}-case-study`}>
            <div className={`grid gap-4 border-y border-white/15 py-6 sm:grid-cols-2 ${detail.team ? "lg:grid-cols-5" : "lg:grid-cols-4"}`} data-testid={`${slug}-metadata`}>
              {([['PERAN', detail.role, 'role'], ...(detail.team ? [['TIM', detail.team, 'team']] : []), ['ALAT', detail.tools, 'tools'], ['TAHUN', project.year, 'year'], ['KONTEKS', detail.context, 'context']] as [string, string, string][]).map(([label, value, id]) => <div key={id} className="font-mono text-[10px] uppercase tracking-[0.16em]" data-testid={`${slug}-meta-${id}`}><span className="mb-2 block text-white/30">{label}</span><span className="leading-5 text-white/75">{value}</span></div>)}
            </div>
            <section data-testid={`${slug}-problem-section`}><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-problem-label`}>{nextLabel("Masalah")}</p><h3 className="mb-4 font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-problem-title`}>{detail.problemTitle}</h3><p className="max-w-2xl text-sm leading-7 text-white/60" data-testid={`${slug}-problem-copy`}>{detail.problem}</p></section>
            {detail.process && <section data-testid={`${slug}-process-section`}><div className="mb-6 flex items-end justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-process-label`}>{nextLabel("Proses")}</p><h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-process-title`}>Design thinking,<br /><span className="text-white/35">dibuat praktis.</span></h3></div><span className="font-mono text-[10px] text-white/30" data-testid={`${slug}-process-count`}>{String(detail.process.length).padStart(2, "0")} TAHAP</span></div><div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-3">{detail.process.map((item) => <article key={item.step} className="bg-[#111112] p-5" data-testid={`${slug}-process-${item.step}`}><span className="font-mono text-3xl text-[#ff2a2a]" data-testid={`${slug}-process-${item.step}-number`}>{item.step}</span><h4 className="mt-8 font-heading text-xl font-black uppercase" data-testid={`${slug}-process-${item.step}-title`}>{item.title}</h4><p className="mt-3 text-xs leading-6 text-white/50" data-testid={`${slug}-process-${item.step}-description`}>{item.description}</p></article>)}</div></section>}
            <section className={detail.personas.length > 1 ? "grid gap-3 sm:grid-cols-2" : ""} data-testid={`${slug}-persona-section`}>
              {detail.personas.map((persona, index) => <article key={persona.name} className="border-l-2 border-[#ffe600] bg-[#1b1b1d] p-6" data-testid={`${slug}-persona-${index + 1}`}><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ffe600]" data-testid={`${slug}-persona-${index + 1}-label`}>{detail.personas.length > 1 ? `Persona ${index + 1}` : "Sorotan persona"}</p><h3 className="font-heading text-3xl font-black uppercase tracking-[-0.05em]" data-testid={`${slug}-persona-${index + 1}-name`}>{persona.name}</h3>{persona.meta && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40" data-testid={`${slug}-persona-${index + 1}-meta`}>{persona.meta}</p>}{persona.quote && <p className="mt-4 border-l border-white/20 pl-4 text-sm italic leading-6 text-white/80" data-testid={`${slug}-persona-${index + 1}-quote`}>“{persona.quote}”</p>}<p className="mt-3 max-w-2xl text-sm leading-7 text-white/60" data-testid={`${slug}-persona-${index + 1}-description`}>{persona.description}</p></article>)}
            </section>
            {detail.journey && <section data-testid={`${slug}-journey-section`}><div className="mb-6 flex items-end justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-journey-label`}>{nextLabel("User Journey")}</p><h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-journey-title`}>Perjalanan {detail.personas[0]?.name.split(" ")[0]},<br /><span className="text-white/35">tahap demi tahap.</span></h3></div><span className="font-mono text-[10px] text-white/30" data-testid={`${slug}-journey-count`}>{String(detail.journey.length).padStart(2, "0")} TAHAP</span></div><ol className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-3">{detail.journey.map((step, index) => <li key={step.stage} className="bg-[#111112] p-5" data-testid={`${slug}-journey-${index + 1}`}><div className="flex items-baseline justify-between"><span className="font-mono text-xs text-[#ff2a2a]" data-testid={`${slug}-journey-${index + 1}-number`}>0{index + 1}</span><span className="font-heading text-2xl font-black tracking-[-0.05em] text-[#ffe600]" data-testid={`${slug}-journey-${index + 1}-mood`}>{step.mood}</span></div><h4 className="mt-4 font-heading text-base font-black uppercase leading-tight" data-testid={`${slug}-journey-${index + 1}-stage`}>{step.stage}</h4><p className="mt-2 text-xs leading-5 text-white/50" data-testid={`${slug}-journey-${index + 1}-note`}>{step.note}</p></li>)}</ol></section>}
            <section data-testid={`${slug}-solution-section`}><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-solution-label`}>{nextLabel("Solusi")}</p><h3 className="mb-6 font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-solution-title`}>{detail.solutionTitle[0]}<br /><span className="text-white/35">{detail.solutionTitle[1]}</span></h3><div className="grid gap-3">{detail.solution.map((item, index) => <article key={item.title} className="grid gap-3 border-t border-white/15 py-4 sm:grid-cols-[35px_150px_1fr]" data-testid={`${slug}-solution-${index + 1}`}><span className="font-mono text-xs text-[#ff2a2a]" data-testid={`${slug}-solution-${index + 1}-number`}>0{index + 1}</span><h4 className="font-heading text-lg font-black uppercase" data-testid={`${slug}-solution-${index + 1}-title`}>{item.title}</h4><p className="text-sm leading-6 text-white/55" data-testid={`${slug}-solution-${index + 1}-description`}>{item.description}</p></article>)}</div></section>
            {detail.designSystem && <section data-testid={`${slug}-design-system-section`}><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-design-system-label`}>{nextLabel("Design System")}</p><h3 className="mb-6 font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-design-system-title`}>Warna, tipe,<br /><span className="text-white/35">dan ritme jarak.</span></h3><div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-4 lg:grid-cols-7" data-testid={`${slug}-design-system-colors`}>{detail.designSystem.colors.map((color, index) => <div key={color.hex} className="bg-[#111112] p-3" data-testid={`${slug}-color-${index + 1}`}><span className="block aspect-square w-full border border-white/10" style={{ backgroundColor: color.hex }} aria-hidden="true" /><span className="mt-3 block font-mono text-[10px] text-white/80" data-testid={`${slug}-color-${index + 1}-hex`}>{color.hex}</span><span className="mt-1 block font-mono text-[8px] uppercase leading-4 tracking-[0.12em] text-white/40" data-testid={`${slug}-color-${index + 1}-name`}>{color.name}</span></div>)}</div><div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="border border-white/15 p-4" data-testid={`${slug}-design-system-typography`}><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Tipografi</span><p className="text-sm leading-6 text-white/70">{detail.designSystem.typography}</p></div><div className="border border-white/15 p-4" data-testid={`${slug}-design-system-spacing`}><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Spacing & Radius</span><p className="text-sm leading-6 text-white/70">{detail.designSystem.spacing}</p></div></div></section>}
            {detail.figmaFeatures && <section data-testid={`${slug}-figma-section`}><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-figma-label`}>{nextLabel("Prototyping")}</p><h3 className="mb-6 font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-figma-title`}>Fitur Figma lanjutan<br /><span className="text-white/35">yang dipakai.</span></h3><ul className="flex flex-wrap gap-2" data-testid={`${slug}-figma-features`}>{detail.figmaFeatures.map((feature, index) => <li key={feature} className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75" data-testid={`${slug}-figma-feature-${index + 1}`}>{feature}</li>)}</ul></section>}
            <section data-testid={`${slug}-screens-section`}><div className="mb-6 flex items-end justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid={`${slug}-screens-label`}>{nextLabel("Layar")}</p><h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid={`${slug}-screens-title`}>Produk ini,<br /><span className="text-white/35">frame demi frame.</span></h3></div><span className="font-mono text-[10px] text-white/30" data-testid={`${slug}-screens-count`}>{String(detail.screens.length).padStart(2, "0")} LAYAR</span></div><div className="grid gap-3 sm:grid-cols-2">{detail.screens.map((screen, index) => <ScreenSlot key={screen.label} screen={screen} index={index} testPrefix={`${slug}-screen`} tone="detail" onZoom={onZoom} />)}</div><p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30" data-testid={`${slug}-screens-note`}>Klik gambar untuk memperbesar. {detail.screens.filter((screen) => screen.image).length} dari {detail.screens.length} layar sudah terisi.</p></section>
          </div>
        ) : visual ? (
          <div className="mt-10 space-y-12" data-testid="visual-study">
            {(visual.deck || visual.website) && <div className="flex flex-col gap-3 sm:flex-row" data-testid="visual-study-links">
              {visual.deck && <a href={visual.deck.url} target="_blank" rel="noopener noreferrer" download={`${visual.deck.label}.pdf`} className="inline-flex items-center justify-center gap-2 bg-[#ff2a2a] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#ff2a2a]" data-testid="visual-study-download-pdf-button"><Download size={14} /> Download Laporan Lengkap (PDF · {visual.deck.pages} hal)</a>}
              {visual.website && <a href={visual.website.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition hover:border-[#ff2a2a] hover:text-[#ff2a2a]" data-testid="visual-study-website-button">Kunjungi Website <ArrowUpRight size={14} /></a>}
            </div>}
            <div className="grid gap-4 border-y border-white/15 py-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="visual-study-metadata">
              {[['PERAN', visual.role, 'role'], ['ALAT', visual.tools, 'tools'], ['TAHUN', project.year, 'year'], ['KONTEKS', visual.context, 'context']].map(([label, value, id]) => <div key={id} className="font-mono text-[10px] uppercase tracking-[0.16em]" data-testid={`visual-study-meta-${id}`}><span className="mb-2 block text-white/30">{label}</span><span className="leading-5 text-white/75">{value}</span></div>)}
            </div>
            <section data-testid="visual-study-summary-section"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid="visual-study-summary-label">01 / Cerita</p><h3 className="mb-4 font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid="visual-study-summary-title">Makan makanannya,<br /><span className="text-white/35">makan juga sendoknya.</span></h3><p className="max-w-2xl text-sm leading-7 text-white/60" data-testid="visual-study-summary-copy">{visual.summary}</p></section>
            <section data-testid="visual-study-highlights-section"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid="visual-study-highlights-label">02 / Angka</p><div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-4">{visual.highlights.map((item, index) => <article key={item.label} className="bg-[#111112] p-5" data-testid={`visual-study-highlight-${index + 1}`}><span className="font-heading text-3xl font-black tracking-[-0.05em] text-white" data-testid={`visual-study-highlight-${index + 1}-value`}>{item.value}</span><p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45" data-testid={`visual-study-highlight-${index + 1}-label`}>{item.label}</p></article>)}</div></section>
            <section data-testid="visual-study-findings-section"><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid="visual-study-findings-label">03 / Temuan</p><h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid="visual-study-findings-title">Data bicara,<br /><span className="text-white/35">visual menjawab.</span></h3></div><span className="font-mono text-[10px] text-white/30" data-testid="visual-study-findings-count">{String(visual.findings.length).padStart(2, "0")} TEMUAN</span></div><div className="grid gap-3">{visual.findings.map((item, index) => <article key={item.title} className="grid gap-3 border-t border-white/15 py-4 sm:grid-cols-[35px_190px_1fr]" data-testid={`visual-study-finding-${index + 1}`}><span className="font-mono text-xs text-[#ff2a2a]" data-testid={`visual-study-finding-${index + 1}-number`}>0{index + 1}</span><h4 className="font-heading text-lg font-black uppercase" data-testid={`visual-study-finding-${index + 1}-title`}>{item.title}</h4><p className="text-sm leading-6 text-white/55" data-testid={`visual-study-finding-${index + 1}-description`}>{item.description}</p></article>)}</div></section>
            <section data-testid="visual-study-gallery-section"><div className="mb-6 flex items-end justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a2a]" data-testid="visual-study-gallery-label">04 / Galeri</p><h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]" data-testid="visual-study-gallery-title">Dari laporan<br /><span className="text-white/35">sampai feed.</span></h3></div><span className="font-mono text-[10px] text-white/30" data-testid="visual-study-gallery-count">{String(visual.gallery.length).padStart(2, "0")} VISUAL</span></div><div className="grid gap-3 sm:grid-cols-3">{visual.gallery.map((screen, index) => <div key={screen.label} className={screen.portrait ? "" : "sm:col-span-3"}><ScreenSlot screen={screen} index={index} testPrefix="visual-study-gallery-item" tone="detail" onZoom={onZoom} /></div>)}</div><p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30" data-testid="visual-study-gallery-note">Klik gambar untuk memperbesar.</p></section>
          </div>
        ) : <div className="mt-7 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-[1fr_180px]"><p className="max-w-xl text-base leading-7 text-white/65" data-testid="project-modal-placeholder-description">This placeholder is structured for your final project story: the brief, the tension, the design decisions, the shipped result, and the lesson worth keeping.</p><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45" data-testid="project-modal-meta"><span className="mb-2 block text-white/30">STATUS</span><span className="text-[#ffe600]">OPEN FOR YOUR STORY</span><span className="mt-5 mb-2 block text-white/30">YEAR</span><span>{project.year}</span></div></div>}
      </div>
    </div>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [zoomedScreen, setZoomedScreen] = useState<Screen | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formStatusMessage, setFormStatusMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const visibleProjects = useMemo(() => category === "All" ? projects : projects.filter((project) => project.category === category), [category]);

  const finishIntro = () => setShowIntro(false);
  const openCv = () => {
    const shouldOpenInNewTab = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (shouldOpenInNewTab) {
      window.open(cvFile, "_blank", "noopener,noreferrer");
    } else {
      setCvOpen(true);
    }
    setMobileOpen(false);
  };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(contact.email); } catch { /* Clipboard can be blocked in static previews. */ }
    setCopied(true);
    toast.success("Email copied — let’s make something memorable.");
    window.setTimeout(() => setCopied(false), 1800);
  };
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading");
    setFormStatusMessage("");

    const payload = new FormData();
    payload.append("access_key", "301e1284-351a-47a7-8a29-bcdc985d24ff");
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const result = await response.json() as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms submission failed");
      }

      setFormStatus("success");
      setFormStatusMessage("Brief received. Noel will be in touch soon.");
      toast.success("Your brief has been sent.");
    } catch {
      setFormStatus("error");
      setFormStatusMessage("Could not send your brief. Please try again.");
      toast.error("Could not send your brief. Please try again.");
    }
  };

  return (
    <div className="min-h-svh bg-[#080808] text-white selection:bg-[#ff2a2a] selection:text-white">
      {showIntro && <PacmanIntro onComplete={finishIntro} />}
      {previewProject && <ProjectQuickPreview project={previewProject} onClose={() => setPreviewProject(null)} onContinue={() => { setPreviewProject(null); setSelectedProject(previewProject); }} onZoom={setZoomedScreen} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onZoom={setZoomedScreen} />}
      {zoomedScreen && <ScreenLightbox screen={zoomedScreen} onClose={() => setZoomedScreen(null)} />}
      {cvOpen && <CVPreviewModal onClose={() => setCvOpen(false)} />}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080808]/85 backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button className="group flex items-center gap-2 font-heading text-lg font-black tracking-[-0.06em]" onClick={() => scrollTo("top")} data-testid="brand-home-button"><span className="h-2 w-2 rounded-full bg-[#ff2a2a] transition-transform group-hover:scale-150" />NVR / 01</button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation" data-testid="desktop-navigation">
            {navItems.map((item) => <a key={item.label} href={item.href} onClick={(event) => { if (item.label === "CV") { event.preventDefault(); openCv(); } }} className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#ff2a2a]" data-testid={item.testId}>{item.label}</a>)}
          </nav>
          <button className="hidden border border-[#ff2a2a] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff2a2a] transition hover:bg-[#ff2a2a] hover:text-white md:block" onClick={() => scrollTo("contact")} data-testid="nav-contact-button">Let&apos;s talk <ArrowUpRight className="ml-1 inline" size={13} /></button>
          <button className="p-2 md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" data-testid="mobile-menu-button">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <nav className="border-t border-white/10 px-5 py-5 md:hidden" data-testid="mobile-navigation">{navItems.map((item) => <a key={item.label} href={item.href} className="block border-b border-white/10 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70" onClick={(event) => { if (item.label === "CV") { event.preventDefault(); openCv(); } else { setMobileOpen(false); } }} data-testid={`${item.testId}-mobile`}>{item.label}</a>)}<button className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#ff2a2a]" onClick={() => scrollTo("contact")} data-testid="mobile-contact-button">Let&apos;s talk →</button></nav>}
      </header>

      <main id="top">
        <section className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] items-end gap-10 overflow-hidden px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_0.52fr] lg:px-12 lg:pt-24" data-testid="hero-section">
          <div className="pointer-events-none absolute -right-20 top-10 font-heading text-[18rem] font-black leading-none text-white/[0.025] sm:text-[28rem]" aria-hidden="true">N</div>
          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff2a2a]" data-testid="hero-eyebrow"><span className="h-px w-8 bg-[#ff2a2a]" />UI/UX DESIGNER / VISUAL EXPLORER</p>
            <h1 className="max-w-5xl font-heading text-[clamp(3.8rem,11vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.1em]" data-testid="hero-title">Noel<br /><span className="text-[#ff2a2a]">Vincent</span><br />Ramli<span className="text-[#ff2a2a]">.</span></h1>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm text-sm leading-6 text-white/55" data-testid="hero-description">I shape digital products, visual worlds, and the weird in-between — with a sharp eye for systems that still feel human.</p>
              <button className="group inline-flex w-fit items-center gap-3 border border-white/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-[#ff2a2a] hover:text-[#ff2a2a]" onClick={() => scrollTo("projects")} data-testid="hero-projects-cta">Explore projects <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></button>
            </div>
          </div>
          <div className="relative ml-auto w-full max-w-sm lg:mb-3" data-testid="hero-portrait-frame">
            <div className="absolute -left-3 -top-3 z-10 h-16 w-16 border-l border-t border-[#ff2a2a]" />
            <div className="aspect-[0.78] overflow-hidden bg-[#1b1b1d]"><img src={personalImages.portrait} alt="Noel Vincent Ramli seated in a studio" className="h-full w-full object-cover grayscale contrast-125 transition duration-700 hover:scale-105 hover:grayscale-0" data-testid="hero-portrait-image" /></div>
            <div className="absolute -bottom-5 -right-5 bg-[#ff2a2a] p-4 font-mono text-[10px] uppercase leading-5 tracking-[0.15em] text-white" data-testid="hero-availability-stamp">Available<br />for good<br />collabs</div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35" data-testid="hero-image-caption">01 / SELF-PORTRAIT / 2026</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#111112]" data-testid="stats-strip">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {[["10", "Projects built"], ["04", "Years in design"], ["03", "Creative modes"], ["∞", "Curiosity"]].map(([value, label], index) => <div key={label} className="p-6 sm:p-8" data-testid={`stat-${index + 1}`}><p className="font-heading text-4xl font-black tracking-[-0.06em]" data-testid={`stat-${index + 1}-value`}>{value}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40" data-testid={`stat-${index + 1}-label`}>{label}</p></div>)}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="projects-section">
          <div className="mb-12 flex flex-col gap-8 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff2a2a]" data-testid="projects-kicker">02 / Selected work</p><h2 className="font-heading text-5xl font-black uppercase leading-[0.85] tracking-[-0.08em] sm:text-7xl" data-testid="projects-title">The work<br /><span className="text-white/35">so far.</span></h2></div>
            <p className="max-w-xs text-sm leading-6 text-white/50" data-testid="projects-description">One real case study is now in the archive. More project stories can land here with the same clarity, rhythm, and point of view.</p>
          </div>
          <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Project categories" data-testid="project-filters">
            {(["All", "UI/UX", "Visual"] as ProjectCategory[]).map((item) => <button key={item} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition ${category === item ? "border-[#ff2a2a] bg-[#ff2a2a] text-white" : "border-white/15 text-white/45 hover:border-white/50 hover:text-white"}`} onClick={() => setCategory(item)} role="tab" aria-selected={category === item} data-testid={item === "All" ? "project-filter-all" : `project-filter-${item.toLowerCase().replace("/", "")}`}>{item}</button>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-grid">
            {visibleProjects.map((project) => <button key={project.id} className="group relative flex flex-col overflow-hidden border border-white/10 bg-[#111112] text-left transition duration-500 hover:-translate-y-1 hover:border-[#ff2a2a]" onClick={() => project.caseStudy ? setPreviewProject(project) : setSelectedProject(project)} data-testid={`project-card-${project.id}`}>
              <div className="relative aspect-[2.1] shrink-0 overflow-hidden sm:aspect-[1.6]" style={{ backgroundColor: project.color }}>{project.logo ? <BrandLogoCover slug={project.slug} title={project.title} logo={project.logo} compact scope="card" /> : <img src={project.image} alt={`${project.title} cover`} className="h-full w-full object-cover grayscale mix-blend-multiply opacity-75 transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100" data-testid={`project-card-${project.id}-image`} />}<span className="absolute right-3 top-3 border border-white/50 bg-black/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white" data-testid={`project-card-${project.id}-category`}>{project.category}</span><span className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100" aria-hidden="true"><ArrowUpRight size={14} /></span></div>
              <div className="flex items-start justify-between gap-3 p-4"><div><p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#ff2a2a]" data-testid={`project-card-${project.id}-metric`}>{project.metric}</p><h3 className="font-heading text-xl font-black uppercase tracking-[-0.05em] sm:text-2xl" data-testid={`project-card-${project.id}-title`}>{project.title}</h3><p className="mt-1.5 line-clamp-2 max-w-md text-xs leading-5 text-white/45" data-testid={`project-card-${project.id}-description`}>{project.description}</p></div><span className="shrink-0 font-mono text-[9px] text-white/30" data-testid={`project-card-${project.id}-year`}>{project.year}</span></div>
            </button>)}
          </div>
        </section>

        <section id="experiments" className="border-y border-white/10 bg-[#e7d9c1] text-[#111112]" data-testid="experiments-section">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#d72222]" data-testid="experiments-kicker">03 / Side quests</p><h2 className="font-heading text-5xl font-black uppercase leading-[0.82] tracking-[-0.08em] sm:text-8xl" data-testid="experiments-title">Make<br /><span className="text-[#d72222]">noise.</span></h2><p className="mt-8 max-w-sm text-sm leading-6 text-black/60" data-testid="experiments-description">Not everything needs to become a product. Some ideas just need a little room to be loud.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="group relative aspect-square overflow-hidden bg-[#d72222] p-6 text-white transition hover:rotate-1" data-testid="experiment-card-1"><span className="font-mono text-[9px] uppercase tracking-[0.2em]" data-testid="experiment-card-1-label">TYPE STUDY / 01</span><p className="absolute bottom-5 left-5 font-heading text-5xl font-black uppercase leading-[0.78] tracking-[-0.08em]" data-testid="experiment-card-1-title">Type<br />as<br />texture.</p><span className="absolute right-5 top-5 text-3xl" aria-hidden="true">✳</span></div><div className="group relative aspect-square overflow-hidden bg-[#111112] p-6 text-white transition hover:-rotate-1" data-testid="experiment-card-2"><img src={personalImages.poster} alt="Noel in a red jacket from a visual experiment" className="absolute inset-0 h-full w-full object-cover opacity-75 grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0" data-testid="experiment-card-2-image" /><div className="relative flex h-full flex-col justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.2em]" data-testid="experiment-card-2-label">IMAGE PLAY / 02</span><p className="font-heading text-5xl font-black uppercase leading-[0.78] tracking-[-0.08em]" data-testid="experiment-card-2-title">Frame<br />the<br />feeling.</p></div></div></div></div></div>
        </section>

        <section id="about" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="about-section">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff2a2a]" data-testid="about-kicker">04 / About Noel</p>
              <div className="relative max-w-sm">
                <img src={personalImages.studio} alt="Noel Vincent Ramli working at a desk" className="aspect-[0.8] w-full object-cover grayscale contrast-125" data-testid="about-image" />
                <div className="absolute -bottom-4 -right-4 bg-[#ffe600] p-4 font-mono text-[9px] uppercase leading-5 tracking-[0.15em] text-black" data-testid="about-note">Design is<br />a team sport.</div>
              </div>
            </div>
            <div>
              <h2 className="max-w-3xl font-heading text-5xl font-black uppercase leading-[0.84] tracking-[-0.08em] sm:text-7xl" data-testid="about-title">I turn<br /><span className="text-[#ff2a2a]">curiosity</span><br />into form.</h2>
              <p className="mt-9 max-w-2xl text-base leading-8 text-white/60" data-testid="about-description">I&apos;m Noel, a UI/UX designer who likes connecting the dots between a useful interface and a memorable feeling. My practice moves between product thinking, visual direction, and small experiments that make the internet feel a little more alive.</p>
              <div className="mt-7 flex flex-wrap items-center gap-3" data-testid="about-cv-actions">
                <button type="button" className="inline-flex items-center gap-2 border border-[#ff2a2a] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff2a2a] transition hover:bg-[#ff2a2a] hover:text-white" onClick={openCv} data-testid="about-view-cv-button"><Eye size={14} />View CV</button>
                <a href={cvFile} download="CV_Noel_Vincent_Ramli.pdf" className="inline-flex items-center gap-2 border border-white/30 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70 transition hover:border-white hover:text-white" data-testid="about-download-cv-button"><Download size={13} />Download</a>
              </div>
              <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35" data-testid="toolbox-label">Toolbox / currently</p>
                  <div className="space-y-3 text-sm leading-6 text-white/70" data-testid="toolbox-list">
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Design &amp; UI</span>Figma · Framer · Canva</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">AI Models &amp; LLMs</span>ChatGPT · Gemini · Claude</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">AI Builders &amp; Dev</span>Lovable · Emergent · Antigravity</p>
                  </div>
                </div>
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35" data-testid="principles-label">Skills &amp; principles</p>
                  <div className="space-y-3 text-sm leading-6 text-white/70" data-testid="principles-list">
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Core Skills</span>Prototyping · Art Direction · Storytelling</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">AI &amp; Engineering</span>Prompt Engineering · Generative AI</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Mindset &amp; Ethics</span>Systems Thinking · Critical Thinking in AI · Ethical AI Usage</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Design Principles</span>Emotion First · Zero Friction · Contrast as Rhythm</p>
                    <p><span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Other Skills</span>Leadership · Artificial Intelligence (AI) · Analysis · Time Management · Web Design · Teamwork · Communication · Adaptability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#ff2a2a] text-white" data-testid="contact-section"><div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="grid gap-14 lg:grid-cols-[1fr_0.55fr] lg:items-end"><div><p className="mb-8 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70" data-testid="contact-kicker">05 / Open channel</p><h2 className="max-w-4xl font-heading text-6xl font-black uppercase leading-[0.8] tracking-[-0.09em] sm:text-8xl" data-testid="contact-title">Have a<br />good one?</h2><p className="mt-8 max-w-md text-sm leading-6 text-white/75" data-testid="contact-description">A product to shape, a visual world to build, or a strange idea that needs a partner? Start with a hello.</p><div className="mt-8 flex flex-wrap gap-3" data-testid="contact-channels"><button className="inline-flex items-center gap-3 border border-white px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition hover:bg-white hover:text-[#ff2a2a]" onClick={copyEmail} data-testid="copy-email-button">{copied ? <Check size={14} /> : <Copy size={14} />} {contact.email}</button>{contact.links.map((link) => <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition hover:border-white hover:bg-white hover:text-[#ff2a2a]" data-testid={`contact-link-${link.id}`}><span className="text-white/60" data-testid={`contact-link-${link.id}-label`}>{link.label}</span><span data-testid={`contact-link-${link.id}-handle`}>{link.handle}</span><ArrowUpRight size={13} /></a>)}</div></div><form className="border border-white/35 p-5 sm:p-7" onSubmit={submitForm} data-testid="contact-form"><p className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65" data-testid="contact-form-label">Or send a short brief</p><label className="mb-5 block" data-testid="contact-form-name-label"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">Your name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full border-b border-white/45 bg-transparent py-2 text-sm outline-none placeholder:text-white/40 focus:border-white" placeholder="Noel&apos;s future collaborator" data-testid="contact-form-name" /></label><label className="mb-5 block" data-testid="contact-form-email-label"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">Email</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full border-b border-white/45 bg-transparent py-2 text-sm outline-none placeholder:text-white/40 focus:border-white" placeholder="you@somewhere.com" data-testid="contact-form-email" /></label><label className="mb-5 block" data-testid="contact-form-message-label"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">The idea</span><textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="min-h-20 w-full resize-none border-b border-white/45 bg-transparent py-2 text-sm outline-none placeholder:text-white/40 focus:border-white" placeholder="Tell me the good part..." data-testid="contact-form-message" /></label>{formStatus === "idle" || formStatus === "loading" ? <button type="submit" disabled={formStatus === "loading"} className="mt-2 flex w-full items-center justify-between bg-white px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff2a2a] transition hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-70" data-testid="contact-form-submit-button"><span>{formStatus === "loading" ? "Sending..." : "Send the brief"}</span>{formStatus === "loading" ? null : <ArrowUpRight size={15} />}</button> : <p role="status" aria-live="polite" className={`mt-2 border border-white/50 px-4 py-3 text-sm ${formStatus === "success" ? "bg-white text-[#ff2a2a]" : "bg-black text-white"}`} data-testid={`contact-form-${formStatus}`}>{formStatusMessage}</p>}</form></div></div><div className="border-t border-white/25 px-5 py-5 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 sm:flex-row" data-testid="site-footer"><span data-testid="footer-copyright">Noel Vincent Ramli © 2026</span><span data-testid="footer-location">Based in Indonesia / Available worldwide</span><span data-testid="footer-credit">Built with intent + a little chaos</span></div></div></section>
      </main>
    </div>
  );
}
