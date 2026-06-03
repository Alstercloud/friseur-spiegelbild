import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { Calendar, Facebook, Instagram, Youtube, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={APP_LOGO} alt="Friseur Spiegelbild Logo" className="h-20 w-20 object-contain" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Friseur Spiegelbild</h1>
              <p className="text-xs text-muted-foreground">Beauty Lounge at Jennifer Tevs</p>
            </div>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="/#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Über uns</a>
            <a href="/#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Leistungen</a>
            <a href="/#team" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Team</a>
            <a href="/#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Kontakt</a>
            <div className="flex items-center gap-3 ml-2">
              <a href="https://www.facebook.com/profile.php?id=100089057303676" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/jennifertevs/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@jennifertevs" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Termin buchen
              </a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="/#about" 
              className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Über uns
            </a>
            <a 
              href="/#services" 
              className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leistungen
            </a>
            <a 
              href="/#team" 
              className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="/#contact" 
              className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </a>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 py-2 border-t border-border pt-4">
              <a href="https://www.facebook.com/profile.php?id=100089057303676" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/jennifertevs/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com/@jennifertevs" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            
            {/* Booking Button */}
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Termin buchen
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
