import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { Calendar, Clock, MapPin, Phone, Sparkles, Star, Facebook, Instagram, Youtube, Menu, X } from "lucide-react";
import { useState } from "react";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { TeamSection } from "@/components/TeamSection";
import { SEOHead } from "@/components/SEOHead";
import { CandelabraIcon } from "@/components/CandelabraIcon";
import { useHeroContent, useAboutContent, useServicesContent, useFooterContent, useContentBlock } from "@/hooks/useContentBlocks";
import * as LucideIcons from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load content from Supabase
  const { heroMain, heroBackground, heroCTAs, loading: heroLoading } = useHeroContent();
  const { header: aboutHeader, paragraphs: aboutParagraphs, image: aboutImage, features: aboutFeatures, loading: aboutLoading } = useAboutContent();
  const { header: servicesHeader, subsectionHeaders, images: servicesImages, specialCards, loading: servicesLoading } = useServicesContent();
  const { block: testimonialsHeader, loading: testimonialsLoading } = useContentBlock('testimonials_header');
  const { block: contactHeader, loading: contactLoading } = useContentBlock('contact_header');
  const { description: footerDescription, copyright: footerCopyright, loading: footerLoading } = useFooterContent();

  // Helper function to render Lucide icons dynamically
  const renderIcon = (iconName: string | null, className: string = "w-6 h-6") => {
    if (!iconName) return null;
    const Icon = (LucideIcons as any)[iconName];
    if (!Icon) return null;
    return <Icon className={className} />;
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        pageSlug="home"
        fallback={{
          title: "Friseur Spiegelbild bei Jennifer Tevs | Lotte",
          description: "Friseur Spiegelbild bei Jennifer Tevs — exklusiver Salon mit märchenhaftem Ambiente in Lotte bei Osnabrück. Jennifer Tevs (bekannt aus dem TV) und Jenifer Fenske bieten höchste Qualität für anspruchsvolle Haare."
        }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/logo.webp" alt="Friseur Spiegelbild Logo" className="h-20 w-20 object-contain" width="123" height="94" />              <div>
                <h1 className="text-lg font-semibold text-foreground">Friseur Spiegelbild bei Jennifer Tevs</h1>
                <p className="text-xs text-muted-foreground">In jedem Spiegelbild träumt ein Leben</p>
              </div>
            </a>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Über uns</a>
              <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Leistungen</a>
              <a href="#team" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Team</a>
              <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Kontakt</a>
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
                href="#about"
                className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Über uns
              </a>
              <a
                href="#services"
                className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leistungen
              </a>
              <a
                href="#team"
                className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
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

      {/* Hero Section - NOW WITH SUPABASE! */}
      <section className="relative pt-24 md:pt-32 lg:pt-20 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          {heroBackground?.image_url ? (
            <img
              src={heroBackground.image_url}
              alt={heroBackground.image_alt || "Hero Background"}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <ResponsiveImage
              baseName="hero-banner"
              imageSizes={["-sm", "-md", "-lg"]}
              mediaQueries={["(max-width: 768px)", "(max-width: 1024px)", "(min-width: 1025px)"]}
              alt="Luxuriöser Friseursalon mit märchenhaftem Ambiente"
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40"></div>
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {heroMain?.badge_text && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">{heroMain.badge_text}</span>
              </div>
            )}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {heroMain?.title || "Für alle, die mehr wollen als 08/15"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {heroMain?.subtitle || "Ein Friseurbesuch wie jeder andere? Nicht bei uns. Unser Salon ist ein Unikat – für alle, die Exklusivität, Persönlichkeit und ein Erlebnis suchen, das man so nur selten findet."}
            </p>
            <div className="flex flex-wrap gap-4">
              {heroCTAs.length > 0 ? (
                heroCTAs.map((cta, index) => (
                  <Button
                    key={cta.id}
                    size="lg"
                    className={index === 0 ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
                    variant={index === 0 ? "default" : "outline"}
                    asChild
                  >
                    <a href={cta.cta_url || "#"} target={cta.cta_target || "_self"} rel={cta.cta_target === "_blank" ? "noopener noreferrer" : undefined}>
                      <Calendar className="w-5 h-5 mr-2" />
                      {cta.cta_text}
                    </a>
                  </Button>
                ))
              ) : (
                <>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-5 h-5 mr-2" />
                      Jetzt Termin buchen
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#services">Unsere Leistungen</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - NOW WITH SUPABASE! */}
      <section id="about" className="py-20 bg-card relative">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 md:whitespace-nowrap">
            {aboutHeader?.title || "Friseur Lotte-Wersen - Spiegelbild"}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {aboutParagraphs.length > 0 ? (
                  aboutParagraphs.map(p => (
                    <p key={p.id} className={p.metadata?.bold ? "font-semibold text-foreground" : ""}>
                      {p.content}
                    </p>
                  ))
                ) : (
                  <>
                    <p>Jennifer Tevs, bekannt aus dem TV, insbesondere DSDS und „Einfach Crazy, Normal kann jeder“, ist bühnen- und medienpräsent. Sie steht für außergewöhnliche Momente, für das Besondere – und für einen Salon, der sich bewusst von der Masse abhebt. Gemeinsam mit Jenifer Fenske vereinen wir höchste Qualität, fundiertes Handwerk und das Gespür für individuelle Schönheit.</p>
                    <p>Bei uns geht es nicht nur um Haare – es geht darum, mehr aus Ihrem Typ herauszuholen. Ob Haaraufbau, dünnes Haar, sensible Kopfhaut, Haarausfall, anspruchsvolle Farb- und Strähnentechniken oder exklusive Haarverlängerungen und Verdichtungen – wir bieten maßgeschneiderte Lösungen für höchste Ansprüche.</p>
                    <p>Unser Ambiente vereint Ästhetik, Privatsphäre und den Hauch von Märchenwelt – dezent, stilvoll und einzigartig.</p>
                    <p>Damit wir uns voll und ganz auf Sie und Ihr Erlebnis konzentrieren können, bitten wir um Terminbuchung über unser Online-Portal. So gestalten wir Ihren Besuch von Anfang bis Ende entspannt, diskret und perfekt vorbereitet.</p>
                  </>
                )}
                <p className="font-semibold text-foreground">Wer nicht online buchen will, darf gerne anrufen.</p>
                <div className="pt-2">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <a href="tel:+4954049129314">
                      <Phone className="w-5 h-5 mr-2" />
                      Jetzt anrufen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative md:-mt-64">
                {aboutImage?.image_url ? (
                  <img
                    src={aboutImage.image_url}
                    alt={aboutImage.image_alt || "About"}
                    className="w-full max-w-md mx-auto rounded-lg"
                    loading="lazy"
                    width={aboutImage.image_width || 480}
                    height={aboutImage.image_height || 640}
                  />
                ) : (
                  <ResponsiveImage
                    baseName="jennifer-tevs-superstar-nobg"
                    imageSizes={["-sm", "-md"]}
                    mediaQueries={["(max-width: 640px)", "(min-width: 641px)"]}
                    alt="Jennifer Tevs - Deutschland sucht den Superstar"
                    className="w-full max-w-md mx-auto rounded-lg"
                    loading="lazy"
                    width="480"
                    height="640"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutFeatures.length > 0 ? (
              aboutFeatures.map(feature => (
                <Card key={feature.id} className="border-border bg-background">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {renderIcon(feature.icon_name, "w-6 h-6 text-primary") || <Sparkles className="w-6 h-6 text-primary" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="border-border bg-background">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CandelabraIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Exklusives Ambiente</h3>
                    <p className="text-muted-foreground">Unser Ambiente vereint Ästhetik, Privatsphäre und den Hauch von Märchenwelt – dezent, stilvoll und einzigartig.</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-background">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Höchste Qualität</h3>
                    <p className="text-muted-foreground">Ob Haaraufbau, dünnes Haar, sensible Kopfhaut oder anspruchsvolle Farbtechniken – wir bieten maßgeschneiderte Lösungen für höchste Ansprüche.</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-background">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Persönliche Betreuung</h3>
                    <p className="text-muted-foreground">Damit wir uns voll und ganz auf Sie konzentrieren können, bitten wir um Terminbuchung über unser Online-Portal.</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {servicesHeader?.title || "Unsere Leistungen"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {servicesHeader?.subtitle || "Schönheit trifft Märchenzauber"}
            </p>
          </div>

          {/* Ladies Services */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                {servicesImages.find(img => img.block_key === 'services_ladies_image')?.image_url ? (
                  <img
                    src={servicesImages.find(img => img.block_key === 'services_ladies_image')!.image_url!}
                    alt={servicesImages.find(img => img.block_key === 'services_ladies_image')!.image_alt || "Damen Friseur Service"}
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <ResponsiveImage
                    baseName="service-ladies"
                    imageSizes={["-sm", "-md"]}
                    mediaQueries={["(max-width: 768px)", "(min-width: 769px)"]}
                    alt="Damen Friseur Service"
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  {subsectionHeaders.find(h => h.block_key === 'services_ladies_header')?.title || "Damen"}
                </h3>
                <p className="text-muted-foreground mb-8">Bei uns erwartet dich nicht nur ein Friseurbesuch, sondern ein Erlebnis voller Pflege, Wohlgefühl & individueller Beratung – für gesundes, glänzendes Haar und einen strahlenden Auftritt.</p>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">Haarschnitt „Prinzessin Jasmin“</h4>
                        <span className="text-primary font-semibold">56,00 €</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Umfassende Beratung, sanfte Haar- & Kopfhautpflege, präziser Schnitt, natürliches Styling</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">Farbe „Arielle, die Meerjungfrau“</h4>
                        <div className="text-right">
                          <div className="text-primary font-semibold">ab 55,00 €</div>
                          <div className="text-xs text-muted-foreground">Ansatz 55€ / Komplett 76€</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Typgerechte Farbberatung, strahlende lebendige Farbergebnisse</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">„Elsas Eiskönigin-Strähnen“</h4>
                        <div className="text-right">
                          <div className="text-primary font-semibold">ab 89,00 €</div>
                          <div className="text-xs text-muted-foreground">Oberkopf 89€ / Ganzer Kopf 135€</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Typberatung, natürliche oder auffällige Akzente, glanzvolle Ergebnisse</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-accent/30">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">„Cinderellas Balayage-Traum“</h4>
                        <span className="text-primary font-semibold">265,00 €</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Balayage, Root Shadow, Intensivpflege, Haarschnitt inklusive, natürliches Styling</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Men Services */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold mb-6">
                  {subsectionHeaders.find(h => h.block_key === 'services_men_header')?.title || "Herren"}
                </h3>
                <p className="text-muted-foreground mb-8">Auch unsere Herren sollen bei uns nicht zu kurz kommen – deshalb bieten wir mehr als nur einen klassischen Haarschnitt. Durch unsere spezielle Menswork-Haarschneidetechnik und hochwertige Herrenpflegeprodukte sorgen wir für ein typgerechtes Styling.</p>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">Haarschnitt „Dschinni“</h4>
                        <span className="text-primary font-semibold">38,00 €</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Waschen, präziser Schnitt, typgerechte Beratung, magische Haar- & Kopfhautpflege, Styling</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-accent/30">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">Prinzen Luxusmoment</h4>
                        <span className="text-primary font-semibold">47,00 €</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Haarschnitt inkl. intensive Kopfhautpflege mit modernster Technologie (Dampf & Ozon), wohltuende Kopfmassage</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                {servicesImages.find(img => img.block_key === 'services_men_image')?.image_url ? (
                  <img
                    src={servicesImages.find(img => img.block_key === 'services_men_image')!.image_url!}
                    alt={servicesImages.find(img => img.block_key === 'services_men_image')!.image_alt || "Herren Friseur Service"}
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <ResponsiveImage
                    baseName="service-men"
                    imageSizes={["-sm", "-md"]}
                    mediaQueries={["(max-width: 768px)", "(min-width: 769px)"]}
                    alt="Herren Friseur Service"
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Special Services */}
          <div className="grid md:grid-cols-2 gap-8">
            {specialCards.length > 0 ? (
              specialCards.map(card => (
                <Card key={card.id} className="border-border overflow-hidden">
                  {card.image_url && (
                    <img
                      src={card.image_url}
                      alt={card.image_alt || card.title || "Service"}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  )}
                  <CardContent className="pt-6">
                    <h4 className="text-2xl font-semibold mb-3">{card.title}</h4>
                    <p className="text-muted-foreground mb-4">{card.content}</p>
                    {card.cta_text && card.cta_url && (
                      <Button variant="outline" asChild>
                        <a href={card.cta_url} target={card.cta_target || "_self"} rel={card.cta_target === "_blank" ? "noopener noreferrer" : undefined}>
                          {card.cta_text}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="border-border overflow-hidden">
                  <ResponsiveImage
                    baseName="hair-extension"
                    imageSizes={["-sm", "-md", "-lg"]}
                    alt="Haarverlängerung"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <CardContent className="pt-6">
                    <h4 className="text-2xl font-semibold mb-3">Haarverlängerung & Haarverdichtung</h4>
                    <p className="text-muted-foreground mb-4">Langes, volles Haar war schon immer Ihr Traum? Auch Carmen Geiss vertraut seit Jahren auf die Premium-Qualität von Hairdreams – für Haarverlängerung und Verdichtung auf höchstem Niveau.</p>
                    <Button variant="outline" asChild>
                      <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">Beratung anfragen</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border overflow-hidden">
                  <img
                    src="/dornroeschen-luxusmoment.webp"
                    alt="Dornröschens Luxusmoment – entspannendes Kopfhautritual"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <CardContent className="pt-6">
                    <h4 className="text-2xl font-semibold mb-3">Dornröschens Luxusmoment</h4>
                    <p className="text-muted-foreground mb-4">Entspannendes Kopfhautritual mit Massage, Anwendung modernster Maletti-Technologie mit Dampf & Ozon. Der perfekte Wohlfühlmoment für gesunde Kopfhaut und glänzendes Haar.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">35,00 €</span>
                      <Button variant="outline" asChild>
                        <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">Jetzt buchen</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NOW WITH SUPABASE! */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {testimonialsHeader?.title || "Was unsere Kunden sagen"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {testimonialsHeader?.subtitle || "Authentische Bewertungen von Google"}
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-card">
        <div className="container">
          <TeamSection />
        </div>
      </section>

      {/* Contact Section - NOW WITH SUPABASE! */}
      <section id="contact" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {contactHeader?.title || "Kontakt & Öffnungszeiten"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {contactHeader?.subtitle || "Wir freuen uns auf Ihren Besuch"}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Adresse</h4>
                      <p className="text-muted-foreground">Zur Kupfermühle 8<br />49504 Lotte, Germany</p>
                      <p className="text-sm text-primary mt-2">Kostenloses Parken direkt vorm Salon</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Telefon</h4>
                      <a href="tel:+4954049129314" className="text-muted-foreground hover:text-primary transition-colors">05404 9129314</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Online Buchung</h4>
                      <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">studiobookr.com</a>
                    </div>
                  </div>
                </div>
                {/* Google Maps */}
                <div className="mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.684951026505!2d7.942881!3d52.321719099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9e6eb8cc9af8d%3A0xd5c79e990c738f79!2sFriseur%20Spiegelbild%20bei%20Jennifer%20Tevs!5e0!3m2!1sde!2sde!4v1764260746566!5m2!1sde!2sde"
                    className="w-full h-[300px] rounded-lg"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Friseur Spiegelbild - Standort"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary" />
                  Öffnungszeiten
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Montag</span>
                    <span className="text-muted-foreground">Geschlossen</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Dienstag</span>
                    <span className="text-foreground">9:00 - 15:00 Uhr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Mittwoch</span>
                    <span className="text-foreground">9:00 - 17:00 Uhr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Donnerstag</span>
                    <span className="text-foreground">9:00 - 15:00 Uhr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Freitag</span>
                    <span className="text-foreground">9:00 - 18:00 Uhr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">Samstag</span>
                    <span className="text-muted-foreground">Geschlossen</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium">Sonntag</span>
                    <span className="text-muted-foreground">Geschlossen</span>
                  </div>
                </div>
                <p className="text-sm text-primary mt-6 text-center">Termine außerhalb der Öffnungszeiten möglich</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>



      {/* Booking Button Section */}
      <section className="py-12">
        <div className="container">
          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="https://www.studiobookr.com/friseur-spiegelbild-67817#/" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Jetzt Termin online buchen
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - NOW WITH SUPABASE! */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={APP_LOGO} alt="Logo" className="h-10 w-10 object-contain" />
                <div>
                  <h3 className="font-semibold">Friseur Spiegelbild bei Jennifer Tevs</h3>
                  <p className="text-sm text-muted-foreground">In jedem Spiegelbild träumt ein Leben</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {footerDescription?.content || "Ihr exklusiver Disney-Wellness-Friseur in Lotte-Wersen"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Zur Kupfermühle 8</p>
                <p>49504 Lotte, Germany</p>
                <p>Tel: <a href="tel:+4954049129314" className="hover:text-primary transition-colors">05404 9129314</a></p>
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
            <p>
              {footerCopyright?.content || `© ${new Date().getFullYear()} Friseur Spiegelbild bei Jennifer Tevs. Alle Rechte vorbehalten.`}
            </p>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/491727556153"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp kontaktieren"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
