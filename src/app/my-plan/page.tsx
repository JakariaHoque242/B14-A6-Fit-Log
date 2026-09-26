"use client";

import { usePlanContext } from "@/context/PlanContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { PlannedWorkout, Workout } from "@/types";

export default function MyPlan() {
  const { plan, saved, isLoaded, removeFromPlan, markDone, removeFromSaved } = usePlanContext();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Loading workouts...</p>
      </div>
    );
  }

  const exercises = plan.length;
  const minutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
  const calories = plan.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const rawList = activeTab === "plan" ? plan : saved;
  const displayList = [...rawList].sort((a, b) => {
    if (sortBy === "Duration") return b.duration - a.duration;
    if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="font-oswald text-5xl md:text-6xl font-bold uppercase mb-4">MY PLAN</h1>
        <p className="text-zinc-400 text-lg">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-wider mb-1">Exercises</p>
          <p className="text-3xl font-oswald font-bold">{exercises}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-wider mb-1">Minutes</p>
          <p className="text-3xl font-oswald font-bold">{minutes}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-wider mb-1">Calories</p>
          <p className="text-3xl font-oswald font-bold">{calories}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 inline-flex">
          <button
            onClick={() => setActiveTab("plan")}
            className={clsx(
              "px-6 py-2 rounded-lg font-bold text-sm transition-colors",
              activeTab === "plan" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={clsx(
              "px-6 py-2 rounded-lg font-bold text-sm transition-colors",
              activeTab === "saved" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-sm font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "Duration" | "Calories" | "Rating")}
              className="appearance-none bg-zinc-900 border border-zinc-800 text-white px-4 py-2 pr-10 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer outline-none"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {displayList.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="font-oswald text-3xl font-bold uppercase mb-2">NOTHING HERE YET</h3>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black px-6 py-3 rounded-lg font-bold transition-colors"
          >
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {displayList.map((workout: PlannedWorkout | Workout) => (
            <div
              key={workout.id}
              className={clsx(
                "flex flex-col md:flex-row gap-6 bg-zinc-900 border rounded-2xl p-4 transition-colors items-start md:items-center",
                "isDone" in workout && workout.isDone ? "border-green-500 opacity-60" : "border-zinc-800 hover:border-zinc-700"
              )}
            >
              <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="font-oswald text-xl font-bold uppercase mb-1">{workout.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{workout.equipment}</p>
                <div className="flex items-center gap-4 text-zinc-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-zinc-400" />
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                <Link
                  href={`/workout/${workout.id}`}
                  className="px-6 py-2 border border-zinc-700 hover:bg-zinc-800 text-white rounded-full font-semibold text-sm transition-colors flex-1 md:flex-none text-center"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    onClick={() => markDone(workout.id)}
                    className="px-6 py-2 bg-[#ccff00] hover:bg-[#b3e600] text-black rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Done
                  </button>
                )}
                <button
                  onClick={() => activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Remove"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
