"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          console.error("API did not return an array", data);
          setWorkouts([]);
        }
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-oswald text-4xl font-bold uppercase mb-2">THE LIBRARY</h2>
          <p className="text-zinc-400">Twelve lifts covering every major muscle group.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading workouts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
