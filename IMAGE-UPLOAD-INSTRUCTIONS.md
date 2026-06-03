# 📤 AUTOMATISCHER IMAGE UPLOAD

## 🚀 AUSFÜHREN DES SCRIPTS

### **SCHRITT 1: Dependencies installieren**

Das Script braucht `dotenv` (falls noch nicht installiert):

```bash
cd ~/Projects/friseur-spiegelbild
pnpm add -D dotenv
```

### **SCHRITT 2: Script ausführen**

```bash
node upload-images.mjs
```

**Das passiert automatisch:**

1. ✅ Scannt alle Bilder in `/client/public/`
2. ✅ Lädt sie zu Supabase Storage hoch
3. ✅ Erstellt Ordnerstruktur (hero/, team/, services/, about/)
4. ✅ Aktualisiert URLs in `content_blocks` Tabelle
5. ✅ Aktualisiert URLs in `team_members` Tabelle

---

## 📋 **WAS HOCHGELADEN WIRD:**

### **Hero Section**
- `hero-banner-lg.webp` → `images/hero/hero-banner-lg.webp`
- `hero-banner-md.webp` → `images/hero/hero-banner-md.webp`
- `hero-banner-sm.webp` → `images/hero/hero-banner-sm.webp`

### **Team Section**
- `jennifer-tevs-red-dress.webp` → `images/team/jennifer-tevs-red-dress.webp`
- `farbe-service.webp` → `images/team/jenifer-fenske.webp`

### **About Section**
- `jennifer-tevs-superstar-nobg.webp` → `images/about/jennifer-tevs-superstar-nobg.webp`
- `jennifer-tevs-superstar-nobg-md.webp` → `images/about/jennifer-tevs-superstar-nobg-md.webp`

### **Services Section**
- `service-ladies-md.webp` → `images/services/service-ladies-md.webp`
- `service-men-md.webp` → `images/services/service-men-md.webp`
- `hair-extension-lg.webp` → `images/services/hair-extension-lg.webp`
- `relaxation-treatment-lg.webp` → `images/services/relaxation-treatment-lg.webp`

*(+ alle -sm und -md Varianten)*

---

## 📊 **ERWARTETER OUTPUT:**

```
🚀 SUPABASE IMAGE UPLOAD SCRIPT
================================

📂 Scanning: /Users/freywerk/Projects/friseur-spiegelbild/client/public

📤 Uploading: hero-banner-lg.webp → hero/hero-banner-lg.webp
   ✅ Success: https://fzebopbrklmgxvnuwdxn.supabase.co/storage/v1/object/public/images/hero/hero-banner-lg.webp

📤 Uploading: jennifer-tevs-red-dress.webp → team/jennifer-tevs-red-dress.webp
   ✅ Success: https://fzebopbrklmgxvnuwdxn.supabase.co/storage/v1/object/public/images/team/jennifer-tevs-red-dress.webp

... (weitere Uploads)

📊 Upload Summary:
   ✅ Uploaded: 15
   ⏭️  Skipped: 2
   📝 Total: 17

📝 Updating database URLs...

   ✅ Updated hero_background
   ✅ Updated about_jennifer_image
   ✅ Updated services_ladies_image
   ✅ Updated services_men_image
   ✅ Updated jennifer_tevs
   ✅ Updated jenifer_fenske

✅ Updated 6/8 database records

🎉 DONE! All images uploaded and database updated!
```

---

## ⚠️ **TROUBLESHOOTING**

### **Fehler: "Missing Supabase credentials"**

→ Prüfe, ob `client/.env` existiert und enthält:
```
VITE_SUPABASE_URL=https://fzebopbrklmgxvnuwdxn.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
```

### **Fehler: "Cannot find module"**

→ Führe aus: `pnpm add -D dotenv`

### **Fehler: "File not found"**

→ Das Script überspringt fehlende Dateien automatisch (z.B. wenn du nur -lg, aber nicht -sm hast)

---

## 🔍 **NACH DEM UPLOAD:**

1. **Prüfe Supabase Dashboard:**
   - Storage → images → Sollte Ordner `hero/`, `team/`, `services/`, `about/` enthalten

2. **Prüfe Datenbank:**
   - Table Editor → content_blocks → `image_url` sollte Supabase URLs haben
   - Table Editor → team_members → `image_url` sollte Supabase URLs haben

3. **Teste im Browser:**
   - `pnpm run dev`
   - Öffne http://localhost:3000
   - Bilder sollten aus Supabase Storage laden

---

## 🎯 **BEREIT?**

Führe aus:

```bash
cd ~/Projects/friseur-spiegelbild
node upload-images.mjs
```

**Viel Erfolg!** 🚀
