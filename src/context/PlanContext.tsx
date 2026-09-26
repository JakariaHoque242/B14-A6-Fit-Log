"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlannedWorkout, Workout } from "@/types";
import toast from "react-hot-toast";

interface PlanContextType {
  plan: PlannedWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markDone: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isLoaded: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedWorkouts = localStorage.getItem("fitlog_saved");
      if (savedPlan) setPlan(JSON.parse(savedPlan));
      if (savedWorkouts) setSaved(JSON.parse(savedWorkouts));
    } catch (e) {
      console.error("Failed to parse local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("You can only add up to 5 lifts for today.");
      return;
    }
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Workout is already in today's plan.");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from plan");
  };

  const markDone = (id: number) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isDone: true } : w))
    );
    toast.success("Workout marked as done");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Workout is already saved.");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        markDone,
        addToSaved,
        removeFromSaved,
        isLoaded,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
