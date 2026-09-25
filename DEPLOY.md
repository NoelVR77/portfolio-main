# Deploy guide — Frontend (Vercel) + Backend (Render / Railway)

Ringkasan cepat
- Frontend: deploy statis dari folder `frontend` ke Vercel.
- Backend: deploy FastAPI (`backend`) ke Render atau Railway (direkomendasikan). Backend membutuhkan `MONGO_URL` dan `DB_NAME`.

File yang dibuat
- `frontend/vercel.json` — config Vercel untuk project frontend.
- `.github/workflows/deploy-frontend-vercel.yml` — action build & deploy frontend.
- `.github/workflows/deploy-backend.yml` — action to trigger Render or Railway deploys.
- `backend/Dockerfile`, `backend/Procfile` — untuk container / process start.
- `render.yaml` — template Render service (optional).

1) Siapkan secrets GitHub

- Frontend (Vercel): di repo → Settings → Secrets → Actions, tambahkan:
  - `VERCEL_TOKEN` — Personal token dari Vercel (Account Settings → Tokens).
  - `VERCEL_ORG_ID` — Org id (dari Vercel project settings).
  - `VERCEL_PROJECT_ID` — Project id (dari Vercel project settings).

- Backend (Render):
  - `RENDER_API_KEY` — Create API key di Render (Account → API Keys).
  - `RENDER_SERVICE_ID` — Service ID untuk backend (di Dashboard → Service → Settings → ID).

- Backend (Railway) — alternatif:
  - `RAILWAY_API_KEY` — dari Railway (Account → Personal API Key).
  - `RAILWAY_PROJECT_ID` — Project ID di Railway.

2) Men-deploy frontend ke Vercel (otomatis)

- Pastikan Anda telah menambahkan `VERCEL_*` secrets di atas.
- Workflow `.github/workflows/deploy-frontend-vercel.yml` akan berjalan setiap ada push ke `main` yang mengubah folder `frontend`.
- Build command: `npm run build` di `frontend`; output Vite ke `dist` (kecuali Anda ubah `vite.config.ts`).

Manual quick test (lokal):
```
cd frontend
npm ci
npm run build
```

3) Men-deploy backend ke Render

Setup cepat di Render:
- Buat Web Service baru, sambungkan repo GitHub dan pilih path `backend`.
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn -k uvicorn.workers.UvicornWorker server:app`
- Tambahkan Environment Variables di Render: `MONGO_URL`, `DB_NAME` (dan lainnya jika perlu).

Jika Anda ingin trigger deploy via GitHub Actions: tambahkan `RENDER_API_KEY` dan `RENDER_SERVICE_ID` ke Secrets. Workflow akan memanggil Render API untuk memicu deploy setelah push ke `main`.

4) Men-deploy backend ke Railway (alternatif)

- Buat project di Railway dan sambungkan repo.
- Railway biasanya auto-deploy pada push; jika ingin workflow-triggered deploy, tambahkan `RAILWAY_API_KEY` dan `RAILWAY_PROJECT_ID` ke Secrets. Workflow akan install Railway CLI dan menjalankan `railway up`.

5) CORS & env pada frontend

- Setelah backend online, set env di Vercel (Project → Settings → Environment Variables): tambahkan `VITE_API_URL` (atau `PUBLIC_API_URL`) pointing to your backend URL (e.g., `https://your-backend.onrender.com/api`).

6) Tips optimasi frontend singkat
- Kurangi font variable yang tidak dipakai (hapus dari `package.json` dependencies yang tidak dipakai).
- Gunakan image optimization (serve WebP/AVIF), lazy-load gambar.
- Pastikan bundle-splitting dan dynamic import untuk halaman besar.

7) Jika mau, saya bisa:
- Membuat GitHub Actions yang juga menjalankan tests sebelum deploy.
- Menambahkan Health-check job yang memverifikasi `/api` setelah deploy Render.
