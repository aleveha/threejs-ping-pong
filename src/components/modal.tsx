import React, { FC } from "react";
import clsx from "clsx";
import { useAtom } from "jotai";
import { modalState } from "../states/modalState";

export const Modal: FC = () => {
	const [{ handleButtonClick, isBallMovingRight, isGameEnded, isOpen }] = useAtom(modalState);

	return (
		<div
			className={clsx(
				"absolute inset-0 flex items-center justify-center bg-neutral-700 bg-opacity-70 p-8",
				isOpen ? "block" : "hidden",
			)}
		>
			<div className="flex flex-col items-center space-y-12 rounded-3xl bg-white p-16 text-indigo-900 shadow-2xl">
				<h1 className="text-center font-mono text-4xl font-bold uppercase">
					{isGameEnded ? `${isBallMovingRight ? "Left" : "Right"} side player win!` : "Welcome to Pong"}
				</h1>
				{!isGameEnded && (
					<p className="flex flex-col space-y-4 text-lg">
						<span>This is a simple game of Pong. The goal is to get the ball past your opponent.</span>
						<span>
							Press <b>W</b> or <b>S</b> to move left side paddle.
						</span>
						<span>Press ⬆️ or ⬇️ to move right side paddle.</span>
						<span>Use mouse to zoom or move camera.</span>
					</p>
				)}
				<button
					type="button"
					className="rounded-xl bg-indigo-600 px-8 py-4 font-mono text-xl uppercase text-white shadow-sm hover:bg-indigo-700"
					onClick={handleButtonClick}
				>
					{isGameEnded ? "Play Again" : "Start Game"}
				</button>
			</div>
		</div>
	);
};
