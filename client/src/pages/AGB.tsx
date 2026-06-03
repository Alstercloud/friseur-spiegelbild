import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function AGB() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Content */}
      <main className="container mx-auto px-4 py-12 pt-32 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 break-words">AGB</h1>
        <p className="text-sm text-muted-foreground mb-8">Stand 23.08.2022</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. ALLGEMEINES</h2>
            <p className="text-muted-foreground leading-relaxed">
              Der Umfang der Geschäftsbeziehung zwischen den Kunden und dem Friseursalon Friseur Spiegelbild, wird ausschließlich in den nachstehenden Allgemeine Geschäftsbedingung (AGB) geregelt. Ab dem 25.05.2018 erliegen auch wir den Richtlinien der neuen Datenschutz Grundverordnung (DSGVO). Diese regelt, unter anderem, die Verwendung von personenbezogenen Daten. Eine Einwilligung erfolgt, sobald wir Sie bedienen. Unsere Allgemeinen Geschäftsbedingungen (AGB) betreffen alle Aktionen im Salon, wie die Dienstleistungen und der Verkauf von Produkten, sowie Verträge und Angebote, die zwischen Friseur Spiegelbild, Zur Kupfermühle 8, 49504 Lotte und dem Kunden zustande kommen bzw. geschlossen werden. Ausnahmen, die nicht unter die Allgemeine Geschäftsbedingung fallen, bedürfen einer Vereinbarung in schriftlicher Form. Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich und schriftlich zugestimmt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. DIENSTLEISTUNGEN</h2>
            <p className="text-muted-foreground leading-relaxed">
              Friseur Spiegelbild führt seine Dienstleistungen nach bestem Wissen und Gewissen aus. Dabei werden Produkte der Industrie eingesetzt, welche dem aktuellen Qualitätsstandard entsprechen. Änderungen werden dem Kunden von Friseur Spiegelbild noch vor Beginn der durchzuführenden Leistung zur Kenntnis gebracht.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. TERMINE</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Friseur Spiegelbild arbeitet hauptsächlich nach Terminvereinbarung. Den Kunden werden nach der Angabe der vom Kunden gewünschten Dienstleistungen Termine angeboten. Nach Annahme des Termins durch den Kunden wird dieser dann fest mit Datum, Uhrzeit und den gewünschten Dienstleistungen reserviert.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dies kann persönlich, telefonisch (über: +49 172 7556153) oder über ein entsprechendes Buchungstool auf der Homepage www.friseursalon-osnabrueck.de geschehen. Sobald der Termin reserviert ist, entsteht zwischen dem Kunden und Friseur Spiegelbild ein Dienstleistungsvertrag.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bei bestimmten Terminen (z.B. Hochzeit / Haarverdichtung / Haarverlängerung) wird vom Kunden eine Vorab-Bezahlung verlangt. Dies wird dem Kunden bei Terminabsprache mitgeteilt. Diese Termine sind bis zur Bezahlung nur optioniert und können bis zum kompletten Geldeingang vom Friseur Spiegelbild abgesagt und storniert werden.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Noch nicht bezahlte Termine können von beiden Seiten mit einer Frist von 48 Stunden im Voraus verschoben werden. Dies muss telefonisch oder schriftlich geschehen. Sollte aus einem Verschulden (z.B. Fernbleiben oder zu spät kommen) des Kunden die vereinbarten Dienstleistungen aus Zeitmangel nicht ausgeführt werden können, ist Friseur Spiegelbild berechtigt vom Vertrag zurückzutreten und eine Termin-Ausfall-Gebühr in Höhe von 80% der geplanten Leistungen zu berechnen. Bei Dienstleistungen für eine Haarverlängerung, für welche der Salon die kundenspezifische Ware einkaufen musste und die an- oder vorab bezahlt wurden, beträgt die Termin-Ausfall-Gebühr 100%.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. PREISE UND ZAHLUNG</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Die Preise für Dienstleistungen sind inklusive der jeweiligen gesetzlichen Mehrwertsteuer. Preise vom Salon Spiegelbild können jederzeit öffentlich im Salon oder unter www.friseursalon-osnabrueck.de eingesehen werden. Für Dienstleistungen, die nicht in der Preisliste beschrieben sind, erteilt Friseur Spiegelbild gerne im Voraus Auskunft über den geplanten Preis.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Die angegebenen Preise sind Mindestpreise und können sich durch Mehraufwand (z.B. langes oder besonders dickes Haar uvm.) oder spontanes Hinzubuchen von weiteren Dienstleistungen erhöhen. Die Rechnungsbeträge sind, sofern nicht vorab bezahlt, sofort nach Leistungserfüllung fällig und sind ausschließlich in Bar per EC-Cash oder mit Gutschein zu bezahlen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. GUTSCHEINE</h2>
            <h3 className="text-xl font-medium text-foreground mb-3">Bezahlte Gutscheine / Kauf-Gutscheine:</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kunden können im Salon Gutscheine käuflich erwerben. Bezahlte Gutscheine können, wie Bargeld für die Bezahlung sämtlicher Dienstleistungen und Artikel bei Friseur Spiegelbild eingelöst werden.
            </p>
            <h3 className="text-xl font-medium text-foreground mb-3">Werbe- und Aktionsgutscheine sowie Rabatte:</h3>
            <p className="text-muted-foreground leading-relaxed">
              Der Salon bietet teilweise Werbe- und Aktionsgutscheine sowie Rabatte an. Diese Vergünstigungen können an bestimmte Bedingungen oder Fristen geknüpft sein. Die Annahme dieser Werbe- und Aktionsgutscheine bzw. die Gewährung von Rabatte gegenüber dem Kunden ist dem Salon freigestellt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. MINDERJÄHRIGE KUNDEN</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unter 16 Jahren kann Friseur Spiegelbild nur mit dem schriftlichen Einverständnis des Erziehungsberechtigten Dienstleistungen, die mit Farbe oder Blondierung durchgeführt werden, bedienen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. GEWÄHRLEISTUNG</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Zeigt sich ein Mangel, so hat der Kunden, diesen unverzüglich dem Friseur Spiegelbild mitzuteilen. Als unverzüglich gilt nur, wenn Reklamation spätestens innerhalb von 5 Tagen nach der Dienstleistung bzw. nach dem Kauf erfolgt.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dem Friseur Spiegelbild steht dann ein Nachbesserungsrecht zu. Die Wahl ob nachgebessert wird, oder ob die Kosten ganz- oder teilweise erstattet werden, liegt allein bei dem Friseur Spiegelbild.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bietet der Salon nach einer erfolgten Reklamation eine Nachbesserung an und der Kunde lehnt diese ab, so verzichtet der Kunde mit Ablehnung auf weitere Mängelansprüche und Rückzahlung. Reagiert der Kunde auf ein Nachbesserungsangebot innerhalb von 48 Stunden nicht, so gilt dies als Ablehnung der Nachbesserung.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Keine Mängelansprüche bestehen bei nur unerheblicher Abweichung von der vereinbarten Leistung oder Beschaffenheit, sowie bei nur unerheblicher Beeinträchtigung der Brauchbarkeit. Dies gilt auch bei natürlicher Abnutzung wie bei Schäden, die infolge fehlerhafter oder nachlässiger Behandlung, übermäßiger Beanspruchung, ungeeigneter haar- und hautkosmetischer Pflegemittel durch den Kunden oder aufgrund besonderer Einflüsse entstehen. Werden von Kunden oder Dritten Nachbesserungsarbeiten oder Änderungen vorgenommen, so bestehen für diese und die daraus resultierenden Folgen ebenfalls keine Mängelansprüche.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. GARANTIE</h2>
            <p className="text-muted-foreground leading-relaxed">
              Auf die geleistete Dienstleistung erhält der Kunde eine Garantiezeit von 5 Tagen. Diese Garantie entfällt, wenn der Kunde nicht die im Salon verwendeten und empfohlenen Produkte nutzt. Bei der Verwendung von Produkten auch von namhaften Drogerieketten können Beeinträchtigungen der Haare vorkommen, wenn diese Silikone beinhalten, die dem Haar die Farbe entziehen können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. PERSÖNLICHE DATEN UND PRIVATSPHÄRE</h2>
            <p className="text-muted-foreground leading-relaxed">
              Der Kunde versichert, alle persönlichen Daten und Informationen, die relevant für die professionelle Durchführung der Dienstleistung sind, an dem Friseur Spiegelbild weiterzugeben. Diese Daten werden in der Kundenkartei in elektronischer Form gespeichert. Der Friseur verpflichtet sich, diese Daten nur für den Zweck der zu erbringenden Dienstleistung unter Berücksichtigung der Datenschutzklausel einzusetzen und die Daten nicht an Dritte oder außenstehende Personen weiterzuleiten ohne schriftliche Einwilligung des Kunden. Die Beachtung der Datenschutzverordnung wird versichert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. HAFTUNG</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Der Salon übernimmt keine Haftung für Garderobe, Taschen, Gepäckstücke und Wertgegenstände der Kunden. Schmuck ist vor Behandlungsbeginn abzulegen. Der Salon übernimmt keine Haftung für Kleidung der Kunden, wenn diese durch Verschulden der Kunden beschädigt wird, gleiches gilt für evtl. Unverträglichkeiten und Allergien, ob bekannt oder unbekannt.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Haftungsausschluss besteht für die vom Kunden ausdrücklich gewünschten chemischen, thermischen, haar- und hautkosmetischen Behandlungen, sowie für sämtliche spezielle friseurtechnischen Maßnahmen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bei vom Salon nicht zu vertretenden Umständen, z.B. Krankheit oder höhere Gewalt, wie Stromausfall und dergleichen, die der Erfüllung eines Kundenauftrages teilweise oder ganz entgegenstehen kann kein Haftungsanspruch hergeleitet werden. Auch übernimmt Salon Friseur Spiegelbild keine Haftung für Terminverschiebungen bzw. Terminverspätungen die Salon Spiegelbild nicht zu vertreten hat. Sollte Salon Spiegelbild einen Termin verschieben müssen, so wird der Kunde so früh wie möglich darüber informiert. Der Kunde hat dann die Möglichkeit sich mit Salon auf den neuen Termin zu einigen oder den Termin kostenfrei zu stornieren. Sollte der Kunde den Termin bereits angezahlt oder komplett bezahlt haben werden sämtliche Gelder für nicht in Anspruch genommene Dienstleistungen an den Kunden zurückgezahlt.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Der Salon versucht die Termine so zu planen, dass der Termin pünktlich begonnen werden kann. Aufgrund nicht absehbarer Ereignisse kann es passieren, dass dem Kunden Wartezeiten entstehen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ein Anspruch auf Schadensersatz kann daraus nicht hergeleitet werden.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. BESCHÄDIGUNG UND DIEBSTAHL</h2>
            <p className="text-muted-foreground leading-relaxed">
              Der Salon hat das Recht für alle vom Kunden verursachten Schäden eine Wiedergutmachung zu fordern. Ladendiebstähle werden sofort zur Anzeige gebracht.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. BILDER</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wenn Friseur Spiegelbild Bildbeispiele im Salon oder auf der Homepage veröffentlicht, sind dies lediglich Beispiele. Selbst wenn die Frisur oder Farbe am Kunden nachgearbeitet wird, kann es zu Abweichungen bezüglich des Designs, der Form und der Wirkung des Designs am Kunden kommen. Das Resultat kann von der gezeigten Bildvorlage abweichen. Das Urheberrecht für das Design verbleibt bei Friseur Spiegelbild. Sollte der Kunde vom erstellten Design Fotografien anfertigen, die für kommerzielle Zwecke verwendet werden (Internet, Publikationen usw.), bedarf dies einer schriftlichen Einverständniserklärung durch den Salon. Bei Unterlassen kann der Salon angemessene Ansprüche geltend machen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. VERHALTENSWEISE</h2>
            <p className="text-muted-foreground leading-relaxed">
              Der Kunde verpflichtet sich während des Besuches im Salon sich angemessen zu verhalten. Sollte der Kunde sich selbst nach einer Verwarnung weiterhin nicht angemessen verhalten, hat das Recht, den Kunden aus dem Salon zu verweisen und gegebenenfalls ein Hausverbot auszusprechen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. SCHLUSSKLAUSEL</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sollten einzelne Bestimmungen dieser allgemeinen Geschäftsbedingungen ganz oder teilweise nichtig sein, bleiben die übrigen Bestimmungen davon unberührt. Die unwirksame Regelung wird durch eine ersetzt, die rechtmäßig ist und dem Sinngehalt der nichtigen Bestimmung am nächsten kommt.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
