import React from 'react';

interface FoodIconProps {
  type: string;
  className?: string;
  size?: number;
}

export const FoodIcon: React.FC<FoodIconProps> = ({ type, className = '', size = 64 }) => {
  const s = size;

  switch (type) {
    case 'bread':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Bread Toast */}
          <path
            d="M16 18C16 11 23 8 32 8C41 8 48 11 48 18C52 20 54 26 53 45C52.5 52 48 56 44 56H20C16 56 11.5 52 11 45C10 26 12 20 16 18Z"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner soft bread surface */}
          <path
            d="M18 20C18 14 24 11 32 11C40 11 46 14 46 20C49 22 50 27 49 43C48.5 49 45 52 42 52H22C19 52 15.5 49 15 43C14 27 15 22 18 20Z"
            fill="#FDE68A"
          />
          {/* Melting Butter slice */}
          <rect x="26" y="24" width="12" height="10" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <path d="M38 32C38 34 36 36 34 36" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cute shine highlight */}
          <path d="M22 18C25 15 30 14 34 14" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'milk':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Milk Carton Base */}
          <path
            d="M20 22L24 13H40L44 22V52C44 55 41 57 38 57H26C23 57 20 55 20 52V22Z"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Blue Label Banner */}
          <rect x="20" y="28" width="24" height="16" fill="#38BDF8" />
          {/* Milk Droplet Icon */}
          <path
            d="M32 31C32 31 27 38 27 40C27 42.8 29.2 45 32 45C34.8 45 37 42.8 37 40C37 38 32 31 32 31Z"
            fill="#FFFFFF"
          />
          {/* Straw */}
          <path d="M34 14L38 4" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M38 4L44 7" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          {/* Gable top lines */}
          <path d="M24 13L32 19L40 13" stroke="#0284C7" strokeWidth="2" fill="#E0F2FE" />
          <path d="M32 19V22" stroke="#0284C7" strokeWidth="2" />
        </svg>
      );

    case 'noodles':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Bowl */}
          <path
            d="M12 30C12 44 21 54 32 54C43 54 52 44 52 30H12Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.5"
          />
          {/* Bowl foot */}
          <path d="M25 54H39V57H25V54Z" fill="#991B1B" />
          {/* Yellow Broth & Noodles */}
          <ellipse cx="32" cy="30" rx="20" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {/* Noodle strands */}
          <path d="M20 28Q24 24 28 29Q32 34 36 29" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 33Q28 28 32 32Q36 36 40 31" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
          {/* Egg half topping */}
          <ellipse cx="38" cy="28" rx="6" ry="4" fill="#FFFFFF" />
          <ellipse cx="38" cy="28" rx="3.5" ry="2.5" fill="#F97316" />
          {/* Green scallions */}
          <circle cx="26" cy="27" r="1.5" fill="#22C55E" />
          <circle cx="29" cy="30" r="1.5" fill="#22C55E" />
          {/* Chopsticks lifting noodles */}
          <path d="M16 12L42 24" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 9L44 21" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Steams */}
          <path d="M28 18Q26 14 28 10" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 17Q37 13 35 9" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'rice':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Fluffy Rice Mounds */}
          <circle cx="32" cy="25" r="15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="40" cy="28" r="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Green Garnish Peas / Mint */}
          <path d="M30 18C30 18 32 14 34 16C36 18 33 21 30 18Z" fill="#22C55E" />
          <path d="M34 18C34 18 36 15 37 18C38 21 35 22 34 18Z" fill="#16A34A" />
          {/* Bowl */}
          <path
            d="M14 30C14 44 22 53 32 53C42 53 50 44 50 30H14Z"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />
          {/* Bowl Ring / Stand */}
          <path d="M25 53H39V56H25V53Z" fill="#1D4ED8" />
          {/* Traditional bowl wave pattern */}
          <path d="M19 38Q25 43 32 38Q39 43 45 38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'chicken_leg':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Bone */}
          <path d="M18 46L13 51" stroke="#F1F5F9" strokeWidth="5" strokeLinecap="round" />
          <circle cx="11" cy="53" r="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <circle cx="15" cy="55" r="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          {/* Plump Fried Drumstick Meat */}
          <path
            d="M20 44C16 38 18 28 25 21C33 13 46 14 51 22C56 31 52 43 44 47C35 51 24 49 20 44Z"
            fill="#D97706"
            stroke="#78350F"
            strokeWidth="2.5"
          />
          {/* Crispy highlights */}
          <path
            d="M28 22C34 16 43 17 46 23"
            stroke="#FDE68A"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="44" cy="32" r="2.5" fill="#B45309" />
          <circle cx="36" cy="38" r="2" fill="#B45309" />
          <circle cx="32" cy="30" r="1.5" fill="#FBBF24" />
        </svg>
      );

    case 'meat_skewer':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Wooden skewer stick */}
          <path d="M10 54L54 10" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
          {/* Meat chunk 1 (bottom) */}
          <rect x="18" y="38" width="13" height="11" rx="3" transform="rotate(-45 18 38)" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.5" />
          {/* Veggie onion/pepper slice */}
          <rect x="25" y="31" width="12" height="6" rx="2" transform="rotate(-45 25 31)" fill="#16A34A" stroke="#14532D" strokeWidth="1.2" />
          {/* Meat chunk 2 (middle) */}
          <rect x="30" y="26" width="14" height="12" rx="3" transform="rotate(-45 30 26)" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
          {/* Veggie tomato/pepper */}
          <circle cx="37" cy="23" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
          {/* Meat chunk 3 (top) */}
          <rect x="40" y="16" width="13" height="11" rx="3" transform="rotate(-45 40 16)" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.5" />
          {/* Grill marks */}
          <path d="M22 36L26 38" stroke="#450A0A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M33 24L37 26" stroke="#450A0A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'steamed_bun':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Paper pad */}
          <ellipse cx="32" cy="52" rx="19" ry="4" fill="#CBD5E1" />
          {/* Steamed Bun Body */}
          <path
            d="M14 47C13 36 21 24 32 23C43 24 51 36 50 47C50 51 43 53 32 53C21 53 14 51 14 47Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2.5"
          />
          {/* Pleated knot at top */}
          <circle cx="32" cy="24" r="3.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Pleat creases */}
          <path d="M32 24C28 29 22 36 21 44" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 24C32 30 32 38 32 46" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 24C36 29 42 36 43 44" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          {/* Steam swirling */}
          <path d="M26 16Q24 12 28 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 15Q38 11 34 7" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'dumplings':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Dumpling 1 (Main) */}
          <path
            d="M14 44C13 28 28 20 46 25C48 37 38 50 20 48L14 44Z"
            fill="#FEF9C3"
            stroke="#CA8A04"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Pleat ridges on rim */}
          <path d="M22 25C23 29 23 32 22 34" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 24C30 28 30 32 29 35" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M36 25C37 29 36 33 35 36" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M43 27C43 31 41 34 40 37" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
          {/* Golden crispy bottom */}
          <path d="M18 46C24 48 34 48 44 42" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dumpling 2 behind */}
          <path
            d="M32 20C40 14 50 17 54 26C48 29 44 26 36 21"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'broccoli':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Stem */}
          <path d="M28 38L27 54C27 56 37 56 37 54L36 38" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
          {/* Fluffy Green florets */}
          <circle cx="32" cy="22" r="14" fill="#22C55E" />
          <circle cx="22" cy="28" r="11" fill="#16A34A" />
          <circle cx="42" cy="28" r="11" fill="#16A34A" />
          <circle cx="32" cy="32" r="11" fill="#15803D" />
          {/* Highlights */}
          <circle cx="30" cy="18" r="3" fill="#4ADE80" />
          <circle cx="21" cy="25" r="2.5" fill="#4ADE80" />
          <circle cx="41" cy="25" r="2.5" fill="#4ADE80" />
        </svg>
      );

    case 'carrot':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Green leaves */}
          <path d="M44 20C48 14 56 12 55 7C50 6 46 12 42 16" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
          <path d="M45 17C50 16 54 18 57 14C56 11 50 12 45 15" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          {/* Carrot Body */}
          <path
            d="M45 17C46 22 41 26 36 29L12 53C10 55 8 54 8 52L17 28C20 23 24 18 29 19C35 20 43 14 45 17Z"
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Ridges */}
          <path d="M30 25L34 29" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M23 33L27 37" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 41L21 44" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'corn':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Husk leaves */}
          <path d="M22 52C16 42 16 30 22 18C20 28 20 44 28 54" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
          <path d="M42 52C48 42 48 30 42 18C44 28 44 44 36 54" fill="#4ADE80" stroke="#16A34A" strokeWidth="2" />
          {/* Corn Cob */}
          <rect x="23" y="14" width="18" height="36" rx="9" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          {/* Kernels grid */}
          <circle cx="27" cy="22" r="2" fill="#EAB308" />
          <circle cx="32" cy="22" r="2" fill="#FEF08A" />
          <circle cx="37" cy="22" r="2" fill="#EAB308" />
          <circle cx="27" cy="28" r="2" fill="#FEF08A" />
          <circle cx="32" cy="28" r="2" fill="#EAB308" />
          <circle cx="37" cy="28" r="2" fill="#FEF08A" />
          <circle cx="27" cy="34" r="2" fill="#EAB308" />
          <circle cx="32" cy="34" r="2" fill="#FEF08A" />
          <circle cx="37" cy="34" r="2" fill="#EAB308" />
          <circle cx="32" cy="40" r="2" fill="#FEF08A" />
        </svg>
      );

    case 'tomato':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Tomato Body */}
          <circle cx="32" cy="35" r="19" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          {/* Highlights */}
          <ellipse cx="26" cy="27" rx="5" ry="3" transform="rotate(-30 26 27)" fill="#F87171" />
          {/* Green Stem and Star Calyx */}
          <path d="M32 16V10" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 16L24 14" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 16L40 14" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 16L26 20" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 16L38 20" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'steak':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Sizzling Steak */}
          <path
            d="M14 36C12 25 24 16 38 18C48 20 54 29 50 40C46 51 28 53 18 47C15 44 14 40 14 36Z"
            fill="#831843"
            stroke="#500724"
            strokeWidth="2.5"
          />
          {/* Tender inner meat */}
          <path
            d="M17 35C15 27 25 20 36 21C45 23 49 30 46 38C42 47 28 48 20 43C18 41 17 38 17 35Z"
            fill="#BE123C"
          />
          {/* Grill Lines */}
          <path d="M23 26L41 38" stroke="#500724" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 22L46 33" stroke="#500724" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M23 37L40 25" stroke="#500724" strokeWidth="2" strokeLinecap="round" />
          {/* Butter rosemary garnish */}
          <ellipse cx="28" cy="30" rx="3" ry="2" fill="#FDE047" />
        </svg>
      );

    case 'sausage':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Skewer */}
          <path d="M12 52L22 42" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
          {/* Curved Sausage */}
          <path
            d="M18 42C12 36 14 22 25 15C36 8 47 13 52 24C57 35 48 45 37 46C29 47 22 45 18 42Z"
            fill="#E11D48"
            stroke="#9F1239"
            strokeWidth="2.5"
          />
          {/* Diagonal grill cuts */}
          <path d="M24 24L28 29" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 22L36 27" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <path d="M39 26L43 31" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          {/* Gloss highlight */}
          <path d="M28 17C35 15 42 18 45 23" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'fried_egg':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Egg White Shape */}
          <path
            d="M16 35C14 26 21 16 32 15C43 14 52 22 51 32C50 42 42 51 30 50C20 49 17 42 16 35Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />
          {/* Golden Egg Yolk */}
          <circle cx="34" cy="31" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          {/* Yolk gloss reflection */}
          <circle cx="31" cy="28" r="3" fill="#FEF3C7" />
          <circle cx="36" cy="33" r="1.5" fill="#FEF3C7" />
          {/* Seasoning flakes */}
          <circle cx="22" cy="38" r="1" fill="#475569" />
          <circle cx="43" cy="25" r="1" fill="#475569" />
          <circle cx="40" cy="40" r="1" fill="#475569" />
        </svg>
      );

    case 'fish':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Tail fin */}
          <path d="M12 25L20 32L12 39" fill="#0284C7" stroke="#0369A1" strokeWidth="2" strokeLinejoin="round" />
          {/* Fish Body */}
          <path
            d="M18 32C24 22 40 20 52 32C40 44 24 42 18 32Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          {/* Cute Eye */}
          <circle cx="45" cy="30" r="3" fill="#FFFFFF" />
          <circle cx="46" cy="30" r="1.5" fill="#0F172A" />
          {/* Smile */}
          <path d="M49 34Q47 37 45 35" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fin */}
          <path d="M30 31Q33 27 38 29" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          {/* Scales stripes */}
          <path d="M26 27Q28 32 26 37" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M33 26Q35 32 33 38" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="24" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
          <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#9CA3AF">🍽️</text>
        </svg>
      );
  }
};
