import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { Mesh } from "three";
import { ballState } from "../states/ballState";

export const useBall = () => {
	const ballRef = useRef<Mesh>(null);
	const [ball, setBall] = useAtom(ballState);

	const setBallColor = useCallback(
		(color: string) => {
			setBall({ ...ball, color });
		},
		[ball, setBall],
	);

	const setAngle = useCallback(
		(angle: number) => {
			setBall({ ...ball, angle });
		},
		[ball, setBall],
	);

	const resetBall = useCallback(() => {
		if (!ballRef.current) {
			return;
		}

		ballRef.current.position.x = 0;
		ballRef.current.position.z = 0;
		setAngle(0);
	}, [setAngle]);

	return [ballRef, ball, setBallColor, setAngle, resetBall] as const;
};
