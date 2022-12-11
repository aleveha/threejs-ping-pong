import { BallState, ballState } from "@zones/shared/states/ballState";
import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { Mesh } from "three";

export const useBall = () => {
	const ballRef = useRef<Mesh>(null);
	const [ball, setBall] = useAtom(ballState);

	const updateBall = useCallback(
		(key: keyof BallState, value: BallState[keyof BallState]) => {
			setBall({ ...ball, [key]: value });
		},
		[ball, setBall],
	);

	const resetBall = useCallback(() => {
		if (!ballRef.current) {
			return;
		}

		ballRef.current.position.x = 0;
		ballRef.current.position.z = 0;
		updateBall("angle", 0);
	}, [updateBall]);

	return [ballRef, ball, updateBall, resetBall] as const;
};
