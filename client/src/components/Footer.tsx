import { APP_LOGO } from "@/const";
import { Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={APP_LOGO} alt="Logo" className="h-10 w-10 object-contain" />
              <div>
                <h3 className="font-semibold">Friseur Spiegelbild</h3>
                <p className="text-sm text-muted-foreground">Beauty Lounge at Jennifer Tevs</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Ihr exklusiver Disney-Wellness-Friseur in Lotte-Wersen</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Zur Kupfermühle 8</p>
              <p>49504 Lotte, Germany</p>
              <p>Tel: 0172-7556153</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Bewertungen</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium">4.7</span>
            </div>
            <p className="text-sm text-muted-foreground">118 Google Bewertungen</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Friseur Spiegelbild - Beauty Lounge at Jennifer Tevs. Alle Rechte vorbehalten.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="/impressum" className="hover:text-primary transition-colors">Impressum</a>
            <span>|</span>
            <a href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</a>
            <span>|</span>
            <a href="/agb" className="hover:text-primary transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
