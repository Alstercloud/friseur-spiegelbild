import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jannika Meyer",
    rating: 5,
    text: "Jennifer nimmt sich liebevoll Zeit für ihre Kunden. Man fühlt sich sofort willkommen und gut aufgehoben. Ihr authentischer Stil ist wirklich fesselnd. Ihr kleiner, neuer Salon hat eine warme, einladende Atmosphäre. Man fühlt sich dort einfach wie zu Hause. Sie ist auch eine fantastische Friseurin. Ich komme gerne wieder!",
    date: "vor 2 Monaten"
  },
  {
    id: 2,
    name: "Leonie Krelage",
    rating: 5,
    text: "Ich hatte bisher nur negative Erfahrungen mit Friseurbesuchen gemacht, deshalb war ich vorher unglaublich nervös. Aber Jennifer hat sich Zeit genommen, alles geduldig erklärt und mir einen fantastischen Haarschnitt verpasst. Ich habe mich sehr gut aufgehoben gefühlt und kann sie nur wärmstens empfehlen!",
    date: "vor 2 Monaten"
  },
  {
    id: 3,
    name: "Farina Eh",
    rating: 5,
    text: "Mein Deckhaar war von einem anderen Salon völlig kaputt und abgebrochen. Jennifer hat meine Haare gerettet, anstatt sie abzuschneiden, und darüber bin ich immer noch sehr glücklich. Sie haben Extensions verwendet; das Ziel ist, dass ich keine mehr brauche. Meine Haare sind so gut nachgewachsen.",
    date: "vor 2 Monaten"
  },
  {
    id: 4,
    name: "Sarah M.",
    rating: 5,
    text: "Ein wunderschöner Salon mit märchenhaftem Ambiente! Jennifer versteht ihr Handwerk perfekt und berät sehr kompetent. Die Atmosphäre ist einzigartig und man fühlt sich wie eine Prinzessin. Absolut empfehlenswert!",
    date: "vor 3 Monaten"
  },
  {
    id: 5,
    name: "Michael K.",
    rating: 5,
    text: "Endlich ein Friseur, der auch auf Männer eingeht! Die Beratung war top, das Ergebnis perfekt. Die besondere Atmosphäre macht den Besuch zu einem echten Erlebnis. Komme definitiv wieder!",
    date: "vor 1 Monat"
  }
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardContent className="pt-12 pb-8 px-8 md:px-12">
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-primary/30" />
          </div>
          
          <div className="text-center mb-6">
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
              "{currentTestimonial.text}"
            </p>
            
            <div className="flex justify-center mb-3">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            
            <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
            <p className="text-sm text-muted-foreground">{currentTestimonial.date}</p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 rounded-full bg-background/80 backdrop-blur hover:bg-background"
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 rounded-full bg-background/80 backdrop-blur hover:bg-background"
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Google Reviews Badge */}
      <div className="text-center mt-6">
        <a
          href="https://www.google.com/search?q=Beauty+Lounge+at+Jennifer+Tevs+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold">4.7</span>
          </div>
          <span>•</span>
          <span>118 Google Bewertungen</span>
        </a>
      </div>
    </div>
  );
}
