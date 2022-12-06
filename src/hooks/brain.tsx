import { useState, useEffect } from "react";
import { Brain } from "../types/brain";

export const useBrain = (): [
  Brain,
  (source: string, input: string) => void
] => {
  const [brain, setBrain] = useState(
    Brain.create("", new TextEncoder().encode(""))
  );

  const runBrain = (source: string, input: string) => {
    setBrain(Brain.create(source, new TextEncoder().encode(input)));
  };

  useEffect(() => {
    setBrain((brain) => brain.next());
  }, [brain]);

  return [brain, runBrain];
};
