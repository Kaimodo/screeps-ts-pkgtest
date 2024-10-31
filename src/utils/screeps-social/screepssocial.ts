// src/screeps-social/screepssocial.ts
import defaultLanguage from "./language.default";
import { LanguagePack } from "./types";

export class ScreepsSocial {
  private languagePack: LanguagePack;

  constructor(customLanguagePath?: string) {
    this.languagePack = this.loadLanguage(customLanguagePath);
  }

  private loadLanguage(customPath?: string): LanguagePack {
    try {
      if (customPath) {
        const { default: customLanguage } = require(customPath) as { default: LanguagePack };
        return customLanguage;
      }
    } catch (error) {
      console.warn(`Custom language file not found at ${customPath}. Using default language.`);
    }
    return defaultLanguage;
  }

  public talk(creep: Creep, category: string, group: string) {
    const phrases = this.languagePack[category]?.[group];
    if (phrases) {
      const message = Array.isArray(phrases)
        ? phrases[Math.floor(Math.random() * phrases.length)]
        : typeof phrases === "function"
        ? phrases(creep)
        : phrases;

      creep.say(message, true); // 'true' for public chat

      // Update memory
      if (!creep.memory.screepssocial) {
        creep.memory.screepssocial = { interactions: [] };
      }
      creep.memory.screepssocial.interactions.push(message);
    }
  }
}
