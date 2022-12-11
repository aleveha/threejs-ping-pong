import { atom } from "jotai";
import { Texture } from "three";
import { DEFAULT_PADDLE_VALUES } from "./paddleState";

export interface BallState {
	angle: number;
	color: string;
	radius: number;
	speed: number;
	texture?: Texture;
}

const DEFAULT_BALL_VALUES: BallState = {
	angle: 0,
	color: "#ffffff",
	radius: DEFAULT_PADDLE_VALUES.height / 2,
	speed: 1,
};

export const ballState = atom(DEFAULT_BALL_VALUES);
