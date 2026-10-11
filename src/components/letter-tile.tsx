type TileTone = "orange" | "white" | "gold";

const tones: Record<TileTone, { face: string; edge: string; letter: string }> = {
  orange: { face: "bg-orange", edge: "bg-orange-edge", letter: "text-white" },
  white: { face: "bg-tile", edge: "bg-tile-edge", letter: "text-ink" },
  gold: { face: "bg-gold", edge: "bg-gold-edge", letter: "text-ink" },
};

export function LetterTile({
  letter,
  tone,
  delay = 0,
}: {
  letter: string;
  tone?: TileTone;
  delay?: number;
}) {
  const resolved = tone ?? (letter === "O" ? "white" : "orange");
  const colors = tones[resolved];

  return (
    <div
      aria-hidden="true"
      className="tile-pop relative aspect-square"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-x-0 top-[8%] bottom-0 rounded-[22%] ${colors.edge}`} />
      <div
        className={`relative flex h-[90%] items-center justify-center rounded-[22%] [container-type:size] ${colors.face}`}
      >
        <span
          className={`font-display leading-none ${colors.letter}`}
          style={{ fontSize: "62cqmin", transform: "translateY(-4%)" }}
        >
          {letter}
        </span>
      </div>
    </div>
  );
}
