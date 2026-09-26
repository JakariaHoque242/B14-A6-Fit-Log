"use client";

import { Workout } from "@/types";
import { usePlanContext } from "@/context/PlanContext";
import { Plus, Bookmark } from "lucide-react";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, plan } = usePlanContext();

  const isAtCap = plan.length >= 5;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={() => addToPlan(workout)}
        disabled={isAtCap}
        className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-4 rounded-lg font-bold transition-colors"
      >
        <Plus className="w-5 h-5" />
        {isAtCap ? "PLAN IS FULL (5/5)" : "ADD TO TODAY'S PLAN"}
      </button>
      <button
        onClick={() => addToSaved(workout)}
        className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white px-6 py-4 rounded-lg font-bold transition-colors"
      >
        <Bookmark className="w-5 h-5" />
        SAVE FOR LATER
      </button>
    </div>
  );
}
