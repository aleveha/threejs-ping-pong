import { atom } from "jotai";

export interface PaddleState {
	color: string;
	depth: number;
	height: number;
	width: number;
}

export const DEFAULT_PADDLE_VALUES: PaddleState = {
	color: "#ffffff",
	depth: 5,
	height: 10,
	width: 30,
};

export const leftPaddleState = atom(DEFAULT_PADDLE_VALUES);

export const rightPaddleState = atom(DEFAULT_PADDLE_VALUES);
