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
					{isGameEnded ? `Hráč ${isBallMovingRight ? 1 : 2} vyhrál!` : "Návod ke hře"}
				</h1>
				<p className="flex flex-col space-y-4 text-lg">
					<span>Cílem je dostat míček za soupeře.</span>
					<span>
						Stisknutím <b>W</b> nebo <b>S</b> pohnete levým paddlem.
					</span>
					<span>Stisknutím ⬆️ nebo ⬇️ pohnete pravým paddlem.</span>
					<span>Pomocí myši přibližujte nebo přesouvejte kameru.</span>
				</p>
				<div className="flex h-8 items-start space-x-8">
					<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/">
						Zpět
					</Link>
					<button type="button" className="border-b-2 px-1 pb-1 hover:border-b-8" onClick={handleButtonClick}>
						{isGameEnded ? "Začít znovu" : "Zahrát"}
					</button>
				</div>
			</div>
		</div>
	);
};
