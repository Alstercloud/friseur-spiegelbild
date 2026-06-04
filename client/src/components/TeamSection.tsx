import { Card, CardContent } from "@/components/ui/card";
import { useTeamMembers } from "@/hooks/useSupabaseData";
import { Loader2 } from "lucide-react";
import { GallerySlider, type GalleryImage } from "@/components/GallerySlider";

// Bilder für den "Einblicke"-Slider (liegen in client/public)
const galleryImages: GalleryImage[] = [
  { src: "/friseur-lotte.webp", alt: "Friseursalon Spiegelbild in Lotte" },
  { src: "/damenfriseur-lotte.webp", alt: "Damenfriseur in Lotte – Friseur Spiegelbild" },
  { src: "/herrenfriseur-lotte.webp", alt: "Herrenfriseur in Lotte – Friseur Spiegelbild" },
  { src: "/Wellness-in-lotte.webp", alt: "Wellness im Friseursalon Spiegelbild in Lotte" },
];

export function TeamSection() {
  const { data: teamMembers, loading, error } = useTeamMembers();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Lade Team-Daten aus Supabase...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Fehler beim Laden der Team-Daten: {error.message}</p>
      </div>
    );
  }

  const fallbackMembers = [
    {
      id: "jennifer-tevs",
      name: "Jennifer Tevs",
      role: "Singende Friseurprinzessin / Master Stylistin / Inhaberin",
      quote: "Sei wie du bist – natürlich schön.",
      bio: "Jeder Mensch ist einzigartig – genau das liebe ich an meinem Beruf. Mit viel Herz, Erfahrung und einem geschulten Blick fürs Detail begleite ich meine Gäste auf ihrem Weg zu mehr Wohlbefinden und Ausstrahlung. Gerade bei anspruchsvollen Haaren oder schwierigen Situationen bin ich in meinem Element.",
      image_url: "/jennifer-tevs-red-dress.webp",
      image_alt: "Jennifer Tevs",
    },
    {
      id: "jenifer-fenske",
      name: "Jenifer Fenske",
      role: "Top Stylistin – Fokus Haarpflege & Haaraufbau",
      quote: "Nichts, was mit Liebe und Hingabe gemacht wird, bleibt ohne Wirkung.",
      bio: "Mein Ziel ist es, deine Haare nicht nur zu verschönern, sondern ihre Struktur sichtbar zu verbessern. Besonders bei feinem, sensiblem oder problematischem Haar setze ich auf individuelle Pflege und gezielte Beratung.",
      image_url: "/jenifer-fenske-throne.webp",
      image_alt: "Jenifer Fenske",
    },
  ];

  const members = (teamMembers && teamMembers.length > 0) ? teamMembers : fallbackMembers;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch max-w-7xl mx-auto">
      {/* Team-Block: Überschrift + zwei Kacheln */}
      <div className="flex flex-col lg:flex-[2]">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Unser Team</h2>
          <p className="text-lg text-muted-foreground">Leidenschaft trifft Expertise</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1 items-stretch">
          {members.map((member) => (
            <Card key={member.id} className="border-border h-full">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <img
                    src={member.image_url}
                    alt={member.image_alt || member.name}
                    className="w-full h-96 object-contain rounded-lg mb-4 bg-muted"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                {member.quote && (
                  <p className="text-muted-foreground mb-4 italic">"{member.quote}"</p>
                )}
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Einblicke-Block: Überschrift + Foto-Slider */}
      <div className="flex flex-col lg:flex-1">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Einblicke</h2>
          {/* unsichtbarer Platzhalter, damit beide Überschrift-Blöcke gleich hoch sind und die Kacheln fluchten */}
          <p className="text-lg text-muted-foreground invisible" aria-hidden="true">Leidenschaft trifft Expertise</p>
        </div>
        <Card className="border-border overflow-hidden relative h-[420px] lg:h-auto lg:flex-1 py-0 gap-0 lg:min-h-[420px]">
          <GallerySlider images={galleryImages} />
        </Card>
      </div>
    </div>
  );
}
