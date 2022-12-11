import { atom } from "jotai";
import { Texture } from "three";

export interface PaddleState {
	color: string;
	depth: number;
	height: number;
	texture?: Texture;
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
