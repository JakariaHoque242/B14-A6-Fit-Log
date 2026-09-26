"use client";

import { usePlanContext } from "@/context/PlanContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ArrowRight, Activity, Timer } from "lucide-react";
import clsx from "clsx";
import { PlannedWorkout, Workout } from "@/types";

export default function MyPlan() {
  const { plan, saved, isLoaded, removeFromPlan, markDone, removeFromSaved } = usePlanContext();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

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

  const displayList = activeTab === "plan" ? plan : saved;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="font-oswald text-5xl md:text-6xl font-bold uppercase mb-4">MY PLAN</h1>
        <p className="text-zinc-400 text-lg">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-[#ccff00]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 font-bold uppercase text-sm mb-1">Exercises</p>
            <p className="text-3xl font-oswald font-bold">{exercises}</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-[#ccff00]">
            <Timer className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 font-bold uppercase text-sm mb-1">Minutes</p>
            <p className="text-3xl font-oswald font-bold">{minutes}</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-[#ccff00]">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 font-bold uppercase text-sm mb-1">Calories</p>
            <p className="text-3xl font-oswald font-bold">{calories}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={clsx(
            "pb-4 px-6 font-bold uppercase text-sm tracking-wider transition-colors relative",
            activeTab === "plan" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          Today&apos;s Plan
          {activeTab === "plan" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ccff00]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={clsx(
            "pb-4 px-6 font-bold uppercase text-sm tracking-wider transition-colors relative",
            activeTab === "saved" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          Saved
          {activeTab === "saved" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
          )}
        </button>
      </div>

      {/* List */}
      {displayList.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="font-oswald text-3xl font-bold uppercase mb-2">NOTHING HERE YET</h3>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-6 py-3 rounded-lg font-bold transition-colors"
          >
            GO TO WORKOUTS
            <ArrowRight className="w-4 h-4" />
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
              
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                <Link
                  href={`/workout/${workout.id}`}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold text-sm transition-colors flex-1 md:flex-none text-center"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    onClick={() => markDone(workout.id)}
                    className="px-4 py-2 bg-[#ccff00] hover:bg-[#b3e600] text-black rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none"
                  >
                    <Check className="w-4 h-4" />
                    Done
                  </button>
                )}
                <button
                  onClick={() => activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                  className="p-2 border border-zinc-700 hover:bg-red-500 hover:border-red-500 hover:text-white text-zinc-400 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
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
