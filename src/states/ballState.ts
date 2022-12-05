import { atom } from "jotai";
import { DEFAULT_PADDLE_VALUES } from "./paddleState";

export interface BallState {
	color: string;
	radius: number;
	speed: number;
}

const DEFAULT_BALL_VALUES: BallState = {
	color: "red",
	radius: DEFAULT_PADDLE_VALUES.height / 2,
	speed: 0.1,
};

export const ballState = atom(DEFAULT_BALL_VALUES);
