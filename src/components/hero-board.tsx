import { LetterTile } from "@/components/letter-tile";

const LETTERS = ["S", "S", "S", "S", "O", "S", "S", "S", "S"] as const;
const DELAYS = [0, 45, 90, 140, 340, 190, 230, 280, 320];

export function HeroBoard() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-2 bottom-0 rounded-[2rem] bg-navy-edge" />
      <div className="relative mb-2 rounded-[2rem] bg-navy p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {LETTERS.map((letter, index) => (
            <LetterTile key={`${letter}-${index}`} letter={letter} delay={DELAYS[index]} />
          ))}
        </div>
      </div>
    </div>
  );
}
