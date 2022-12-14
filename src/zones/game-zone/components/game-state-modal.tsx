import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { FC } from "react";
import { modalState } from "../states/modal-state";

export const GameStateModal: FC = () => {
	const [{ handleButtonClick, isBallMovingRight, isGameEnded, isOpen }] = useAtom(modalState);

	return (
		<div
			className={clsx(
				"absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-90 p-8",
				isOpen ? "block" : "hidden",
			)}
		>
			<div className="flex flex-col items-start space-y-12 p-16 text-white">
				<h1 className="font-mono text-center text-4xl font-bold">
					{isGameEnded ? `Player ${isBallMovingRight ? 1 : 2} won!` : "Game Instructions"}
				</h1>
				<p className="flex flex-col space-y-4 text-lg">
					<span>The goal is to get the ball behind the opponent.</span>
					<span>
						Press <b>W</b> or <b>S</b> to move the left paddle.
					</span>
					<span>Press ⬆️ or ⬇️ to move the right paddle.</span>
					<span>Use the mouse to zoom or move the camera.</span>
				</p>
				<div className="flex h-8 items-start space-x-8">
					<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/">
						Back
					</Link>
					<button type="button" className="border-b-2 px-1 pb-1 hover:border-b-8" onClick={handleButtonClick}>
						{isGameEnded ? "Play again" : "Play"}
					</button>
				</div>
			</div>
		</div>
	);
};
