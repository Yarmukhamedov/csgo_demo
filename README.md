# CSDEMO.UZ - CS2 Highlight & Rolik Maker 🎮🎬

CS2 o'yinlaringiz (.dem fayllari va match kodlari)dan avtomatik **Ace**, **1vX Clutch**, **4K/3K** va ajoyib kadrlarni topib, **TikTok, Instagram Reels va YouTube (9:16 / 16:9)** uchun chiroyli MP4 video rolik tayyorlaydigan zamonaviy servis.

---

## ⚡ Asosiy Imkoniyatlar (Faza 1 MVP)

- **🔥 Avtomatik Highlight Detektori:** Demodagi minglab sekundlar orasidan eng zo'r kadrlarni (Ace, Clutch, Multi-kill, No-scope, Knife kill) soniyalarda aniqlash.
- **📱 9:16 TikTok / Reels & 16:9 YouTube Studio:** Rolik formatini tanlash, fon musiqasini ulash (CS2 Phonk, Lo-Fi, Trap), killfeed animatsiyasi va slow-mo effektlari.
- **✨ Jonli Video Prevyusi:** Rolikni saytning o'zida jonli ko'rish va 1080p MP4 formatida yuklab olish simulyatsiyasi.
- **🗺️ 2D Taktik Radar Replay:** Mirage xaritasida raund bo'yicha o'yinchilarning harakati, granatalar va otishmalarni interaktiv ko'rish.
- **📊 Kengaytirilgan Match Statistikasi:** HLTV 2.1 reytingi, K/D, ADR, Headshot foizi va Faceit/Premier unvonlari.
- **⚙️ CS2 HLAE 120 FPS Skripti:** O'yinchining o'z kompyuterida 120 FPS sifatli kinodek rolik renderlash uchun avtomatlashgan `.cfg` fayl yaratish.

---

## 🚀 Vercel'ga 100% Bepul Joylashtirish (Deploy)

Ushbu loyiha Vercel'ning bepul (Hobby) rejasiga to'liq moslangan:

### 1-usul: GitHub orqali (Tavsiya etiladi)
1. Ushbu loyihani o'zingizning GitHub hisobingizga yuklang (`git push`).
2. [vercel.com](https://vercel.com) saytiga kiring.
3. **"Add New Project"** tugmasini bosing va GitHub omboringizni tanlang.
4. Framework avtomatik **Next.js** deb aniqlanadi.
5. **"Deploy"** tugmasini bosing. 1 daqiqa ichida saytingiz bepul global domen (masalan, `csdemo.vercel.app`) bilan jonli ishga tushadi!

### 2-usul: Vercel CLI orqali
```bash
npm i -g vercel
vercel
```

---

## 🛠️ Mahalliy Ishga Tushirish

```bash
# Paketlarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish (http://localhost:3000)
npm run dev

# Ishlab chiqarish (Production) uchun yig'ish
npm run build
npm start
```

---

## 🗺️ Roadmap (Keyingi Qadamlar)

- [x] **Faza 1:** Next.js 15, TailwindCSS, Kiber-sport dizayni, Match Tahlili, Rolik Studio & 2D Radar Replay.
- [ ] **Faza 2:** WebAssembly (Wasm) asosidagi haqiqiy .dem fayllarni brauzerda to'g'ridan-to'g'ri o'qish & Cloudflare R2 xotirasi.
- [ ] **Faza 3:** Barcha CS2 xaritalari (Inferno, Dust2, Nuke, Anubis) uchun 2D Heatmap & Radar.
- [ ] **Faza 4:** Remotion video rendering & Telegram Bot integratsiyasi.
- [ ] **Faza 5:** Desktop Companion ilovasi (Tauri + HLAE 120 FPS avtomatlashtirish) va Android / iOS ilovalari.
