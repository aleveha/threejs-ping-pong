import { atom } from "jotai";

export interface PaddleState {
	color: string;
	depth: number;
	height: number;
	width: number;
}

export const DEFAULT_PADDLE_VALUES: Omit<PaddleState, "color" | "position"> = {
	depth: 0.5,
	height: 1,
	width: 3,
};

export const leftPaddleState = atom({
	...DEFAULT_PADDLE_VALUES,
	color: "blue",
});

export const rightPaddleState = atom({
	...DEFAULT_PADDLE_VALUES,
	color: "yellow",
});
