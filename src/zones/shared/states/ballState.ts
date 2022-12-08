import { atom } from "jotai";
import { DEFAULT_PADDLE_VALUES } from "./paddleState";

export interface BallState {
	angle: number;
	color: string;
	radius: number;
	speed: number;
}

const DEFAULT_BALL_VALUES: BallState = {
	angle: 0,
	color: "white",
	radius: DEFAULT_PADDLE_VALUES.height / 2,
	speed: 1,
};

export const ballState = atom(DEFAULT_BALL_VALUES);
