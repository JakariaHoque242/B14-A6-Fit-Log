import { Workout } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="block group">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors h-full flex flex-col">
        <div className="relative h-48 w-full bg-zinc-800">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-[#ccff00] text-black text-[10px] px-2 py-0.5 rounded-full uppercase font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-oswald text-xl font-bold uppercase mb-1">{workout.name}</h3>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-1">{workout.equipment}</p>
          
          <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between text-zinc-400 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#ccff00]" />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
