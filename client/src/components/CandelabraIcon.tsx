import { type SVGProps } from "react";

/**
 * CandelabraIcon — klassischer 3-armiger Kerzenleuchter
 * Optisch passend zum maerchenhaften Ambiente.
 * Nutzt currentColor, daher kompatibel mit Tailwind text-* Klassen.
 */
export function CandelabraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Sockel und Fuss */}
      <path d="M7 22h10" />
      <path d="M9 22v-1.5h6v1.5" />
      {/* Hauptstab */}
      <path d="M12 20.5V12" />
      {/* Querbalken */}
      <path d="M5 12h14" />
      {/* Seitliche Arme */}
      <path d="M5 12V10" />
      <path d="M19 12V10" />
      {/* Drei Kerzen */}
      <rect x="4" y="7" width="2" height="3" rx="0.2" />
      <rect x="11" y="5" width="2" height="7" rx="0.2" />
      <rect x="18" y="7" width="2" height="3" rx="0.2" />
      {/* Drei Flammen */}
      <path d="M5 7 Q4.4 6 5 5 Q5.6 6 5 7 Z" fill="currentColor" stroke="none" />
      <path d="M12 5 Q11.4 4 12 3 Q12.6 4 12 5 Z" fill="currentColor" stroke="none" />
      <path d="M19 7 Q18.4 6 19 5 Q19.6 6 19 7 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
