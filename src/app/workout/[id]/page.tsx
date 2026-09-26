import Image from "next/image";
import { Workout } from "@/types";
import WorkoutActions from "@/components/WorkoutActions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const workout = await fetchWorkout(resolvedParams.id);
  if (!workout) return { title: "Workout Not Found" };
  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

async function fetchWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function WorkoutDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await fetchWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 sticky top-24">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-4">
            {workout.name}
          </h1>
          <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
            {workout.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-[#ccff00] text-black text-xs px-3 py-1 rounded-full uppercase font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden mb-8">
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Equipment</span>
              <span className="text-white font-medium">{workout.equipment}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Difficulty</span>
              <span className="text-white font-medium">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Sets</span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Reps</span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Duration</span>
              <span className="text-white font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/50 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Calories</span>
              <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Rating</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-oswald text-2xl font-bold uppercase text-white mb-6">
              Instructions
            </h3>
            <ol className="space-y-4 counter-reset-step">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-zinc-300 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
