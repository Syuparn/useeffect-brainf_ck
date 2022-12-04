import { useState, useEffect } from "react";
import { Brain } from "../types/brain";

export const useBrain = (
  source: string,
  input: string = ""
): [Brain, () => void] => {
  const [brain, setBrain] = useState(
    Brain.create(source, new TextEncoder().encode(input))
  );

  const reset = () => {
    setBrain(Brain.create(source, new TextEncoder().encode(input)));
  };

  useEffect(() => {}, [brain]);

  return [brain, reset];
};
