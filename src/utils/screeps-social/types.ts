// src/screeps-social/types.ts

export interface LanguagePack {
  [category: string]: {
    [group: string]: string[] | string | ((creep: Creep) => string);
  };
}

export interface ScreepsSocialMemory {
  interactions: Array<string>; // Store messages or interactions
  lastSpoken?: string; // Optionally store the last message spoken
}

declare global {
  interface CreepMemory {
    screepssocial?: ScreepsSocialMemory; // Add the screepssocial property
  }
}
