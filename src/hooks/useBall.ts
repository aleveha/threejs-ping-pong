import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { Mesh } from "three";
import { ballState } from "../states/ballState";

export const useBall = () => {
	const ballRef = useRef<Mesh>(null);
	const [paddle, setPaddle] = useAtom(ballState);

	const setBallColor = useCallback(
		(color: string) => {
			setPaddle({ ...paddle, color });
		},
		[paddle, setPaddle],
	);

	const resetBall = useCallback(() => {
		if (!ballRef.current) {
			return;
		}

		ballRef.current.position.x = 0;
		ballRef.current.position.z = 0;
	}, []);

	return [ballRef, paddle, setBallColor, resetBall] as const;
};
