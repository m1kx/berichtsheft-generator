import { readFileSync } from "fs";
import type { Config } from "../types/config";

export const loadConfig = (): Config => {
  const config: Config = JSON.parse(readFileSync('config.json', 'utf8'));
  return config;
}