#!/bin/bash
# Asset Cleanup Script für friseur-spiegelbild
# Entfernt unnötige große Bild-Dateien (9.7 MB)

set -e

echo "🧹 Friseur Spiegelbild - Asset Cleanup"
echo "==========================================="
echo ""

# Prüfe ob wir im richtigen Verzeichnis sind
if [ ! -f "package.json" ]; then
    echo "❌ Fehler: Bitte führe dieses Script im Repository-Root aus"
    exit 1
fi

echo "📋 Zu löschende Dateien:"
echo ""

# Array mit zu löschenden Dateien
files_to_delete=(
    "client/public/hero-banner.jpg"
    "client/public/hair-extension.jpg"
    "client/public/relaxation-treatment.jpg"
    "client/public/service-ladies.jpg"
    "client/public/service-men.jpg"
    "client/public/farbe-service.jpeg"
    "client/public/farbe-service.webp"
    "client/public/jennifer-tevs-red-dress.jpeg"
    "client/public/jennifer-tevs-red-dress.webp"
    "client/public/jennifer-tevs-superstar.png"
)

total_size=0

# Zeige Dateien und berechne Größe
for file in "${files_to_delete[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "  ❌ $file ($size)"
        # Addiere zur Gesamtgröße (in KB für einfachere Berechnung)
        size_kb=$(du -k "$file" | cut -f1)
        total_size=$((total_size + size_kb))
    else
        echo "  ⚠️  $file (bereits gelöscht)"
    fi
done

echo ""
echo "💾 Gesamtgröße: $(echo "scale=1; $total_size/1024" | bc) MB"
echo ""

# Bestätigung
read -p "⚠️  Möchtest du diese Dateien wirklich löschen? (ja/nein): " confirm

if [ "$confirm" != "ja" ]; then
    echo "❌ Abgebrochen"
    exit 0
fi

echo ""
echo "🗑️  Lösche Dateien..."
echo ""

deleted_count=0

# Lösche jede Datei
for file in "${files_to_delete[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "  ✅ Gelöscht: $file"
        deleted_count=$((deleted_count + 1))
    fi
done

echo ""
echo "✅ Cleanup abgeschlossen!"
echo "   Gelöschte Dateien: $deleted_count"
echo "   Eingesparte Größe: $(echo "scale=1; $total_size/1024" | bc) MB"
echo ""
echo "🔄 Nächste Schritte:"
echo "   1. git add ."
echo "   2. git commit -m 'perf: remove unused large image assets (-9.7MB)'"
echo "   3. git push origin main"
echo ""
