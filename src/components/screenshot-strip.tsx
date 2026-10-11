import Image from "next/image";

const shots = [1, 2, 3, 4] as const;

export function ScreenshotStrip() {
  return (
    <ul
      aria-label="Screenshot placeholders"
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
    >
      {shots.map((shot) => (
        <li key={shot} className="w-[210px] shrink-0 snap-center sm:w-[240px]">
          <div className="rounded-[2rem] bg-[#0e2a3c] p-2 shadow-[0_10px_0_#091e2d]">
            <div className="mx-auto mb-2 mt-1 h-1.5 w-14 rounded-full bg-white/25" />
            <div className="overflow-hidden rounded-[1.35rem]">
              <Image
                src={`/screens/${shot}.png`}
                alt={`Placeholder for screenshot ${shot}`}
                width={780}
                height={1688}
                className="h-auto w-full"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
