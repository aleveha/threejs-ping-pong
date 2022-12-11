import { atom } from "jotai";
import { Audio } from "three";

type GameStatus = "not-started" | "started" | "playing" | "ended";

export interface GameState {
	state: GameStatus;
	winSound?: Audio;
}

export const gameState = atom<GameState>({
	state: "not-started",
});
