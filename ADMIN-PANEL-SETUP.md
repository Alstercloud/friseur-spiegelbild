# 🎨 ADMIN PANEL - SETUP ANLEITUNG

## ✅ FERTIGGESTELLT

Das komplette Admin Panel ist fertig und bereit zur Nutzung!

---

## 📁 STRUKTUR

```
client/src/
├── contexts/
│   └── AdminAuthContext.tsx        # Supabase Auth Context
├── components/admin/
│   ├── ProtectedRoute.tsx          # Route Protection
│   └── AdminLayout.tsx             # Dashboard Layout mit Sidebar
├── pages/admin/
│   ├── AdminLogin.tsx              # Login Seite
│   ├── AdminDashboard.tsx          # Dashboard Overview
│   ├── AdminContent.tsx            # Content Editor (HAUPTFEATURE!)
│   ├── AdminImages.tsx             # Bild-Verwaltung (Placeholder)
│   ├── AdminTeam.tsx               # Team-Verwaltung (Placeholder)
│   └── AdminSettings.tsx           # Einstellungen (Placeholder)
└── routes/
    └── AdminRoutes.tsx             # Admin Routing Config
```

---

## 🚀 INSTALLATION - SCHRITT FÜR SCHRITT

### **1. ADMIN USER IN SUPABASE ANLEGEN**

**Öffne:** https://supabase.com/dashboard/project/fzebopbrklmgxvnuwdxn/auth/users

**Klicke:** "Add User" → "Create new user"

**Eingeben:**
- Email: `deine-admin-email@example.com`
- Password: `sicheres-passwort-123`
- ✅ "Auto Confirm User" aktivieren

**Speichern!**

---

### **2. ROUTES EINBINDEN**

Die Admin Routes sind in `App.tsx` eingebunden:

```tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AdminRoutes } from './routes/AdminRoutes';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
```

---

### **3. GIT PULL & DEPENDENCIES**

```bash
cd ~/Projects/friseur-spiegelbild
git pull
pnpm install  # Falls neue Dependencies
pnpm run dev
```

---

## 🎯 ADMIN PANEL NUTZEN

### **LOGIN**

1. **Öffne:** http://localhost:3000/admin
2. **Login mit deinem Supabase User:**
   - Email: Deine Admin-Email
   - Password: Dein Passwort

---

### **DASHBOARD**

Nach dem Login siehst du:

- ✅ **Statistiken** - Anzahl Content Blocks, Bilder, Team Members
- ✅ **Schnellzugriff** - Buttons zu allen Funktionen
- ✅ **System Status** - Supabase Online-Status

**Navigation:**
- Dashboard
- Inhalte ← **WICHTIGSTER BEREICH!**
- Bilder (coming soon)
- Team (coming soon)
- Einstellungen (coming soon)

---

### **CONTENT EDITOR** 💎

**Der Content Editor ist das Herzstück!**

#### **Features:**

**1. ALLE CONTENT BLOCKS SEHEN**
- Gruppiert nach Section (Hero, About, Services, etc.)
- Suche nach Block-Key, Titel, Inhalt
- Aktiv/Inaktiv Status

**2. BLOCKS BEARBEITEN**
- ✅ Titel
- ✅ Untertitel
- ✅ Inhalt (Textarea)
- ✅ Badge Text
- ✅ CTA Button Text + URL
- ✅ Bild Alt-Text
- ✅ Aktiv/Inaktiv Toggle

**3. LIVE SPEICHERN**
- Klick auf "Bearbeiten"
- Ändere Felder
- Klick auf "Speichern"
- ✅ Änderungen sind SOFORT auf der Website live!

---

## 📝 BEISPIELE

### **Hero Section Text ändern:**

1. Login → Inhalte
2. Suche: "hero_main"
3. Bearbeiten
4. Titel ändern: "Neuer Mega-Titel!"
5. Speichern
6. ✅ Auf Website sichtbar!

### **About Paragraph ändern:**

1. Inhalte → About Section
2. Finde "about_paragraph_1"
3. Bearbeiten
4. Content ändern
5. Speichern
6. ✅ Live!

### **CTA Button ändern:**

1. Inhalte → Hero Section
2. Finde "hero_cta_primary"
3. CTA Text: "Jetzt buchen!"
4. CTA URL: "https://booking.example.com"
5. Speichern
6. ✅ Button aktualisiert!

---

## 🔐 SICHERHEIT

**Wichtig:**
- ✅ Nur authentifizierte User haben Zugriff
- ✅ Protected Routes mit Supabase Auth
- ✅ Automatischer Redirect zu Login wenn nicht eingeloggt
- ✅ Session wird gespeichert (bleibst eingeloggt)

**Logout:**
- Klick auf "Abmelden" Button in der Sidebar

---

## 🎨 FEATURES ÜBERSICHT

### **✅ FERTIG:**
- Login/Logout System
- Dashboard mit Stats
- Content Editor (ALLE content_blocks)
- Edit Forms mit allen Feldern
- Live-Speichern in Supabase
- Search/Filter
- Responsive Design
- Protected Routes

### **🚧 COMING SOON:**
- Image Upload (direkt zu Supabase Storage)
- Team Member Editor (CRUD für team_members)
- Rich Text Editor für Content
- Drag & Drop für Bilder
- Preview Mode
- Änderungs-Historie

---

## 🐛 TROUBLESHOOTING

### **"Cannot read property 'email' of null"**
→ Du bist nicht eingeloggt. Gehe zu `/admin/login`

### **"Invalid credentials"**
→ Überprüfe Email/Passwort in Supabase

### **"Forbidden" Fehler**
→ RLS Policies in Supabase prüfen

### **Admin Panel lädt nicht**
→ Routes richtig eingebunden? `pnpm run dev` läuft?

---

## 📊 DATENBANK SCHEMA

**Bearbeitbare Felder in `content_blocks`:**
```sql
- title         (Text)
- subtitle      (Text)
- content       (Textarea)
- badge_text    (Text)
- cta_text      (Button Text)
- cta_url       (URL)
- image_alt     (Alt Text)
- is_active     (Boolean)
```

**Nur-Lesen Felder:**
```sql
- id            (UUID)
- section       (Section Name)
- block_type    (Block Type)
- block_key     (Unique Key)
- sort_order    (Number)
- created_at    (Timestamp)
- updated_at    (Timestamp)
```

---

## 🎉 NÄCHSTE SCHRITTE

1. ✅ Admin User anlegen
2. ✅ Routes einbinden
3. ✅ Git pull & pnpm install
4. ✅ Login testen
5. ✅ Content bearbeiten
6. ✅ Auf Website checken!

**Viel Erfolg! 🚀**
