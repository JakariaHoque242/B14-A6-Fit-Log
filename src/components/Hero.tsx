"use client";
import Image from "next/image";

export default function Hero() {
  const handleScroll = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <p className="text-[#ccff00] font-bold tracking-widest text-sm">WORKOUT LIBRARY</p>
        <h1 className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-tight">
          Train with intent. <br className="hidden md:block" />
          Log every set.
        </h1>
        <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <button
          onClick={handleScroll}
          className="bg-[#ccff00] hover:bg-[#b3e600] text-black px-6 py-4 rounded-lg font-bold transition-colors inline-block"
        >
          BROWSE WORKOUTS
        </button>
      </div>
      <div className="flex-1 w-full aspect-square md:aspect-auto md:h-[500px] relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/30">
        <Image 
          src="/banner.png"
          alt="FitLog Hero"
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    </section>
  );
}
