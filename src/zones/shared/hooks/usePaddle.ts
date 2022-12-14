import {
	DEFAULT_PADDLE_VALUES,
	leftPaddleState,
	PaddleState,
	rightPaddleState,
} from "@zones/shared/states/paddleState";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";

export const usePaddle = (side: "left" | "right") => {
	const isLeftSide = side === "left";
	const paddleRef = useRef<Mesh>(null);
	const [paddle, setPaddle] = useAtom(isLeftSide ? leftPaddleState : rightPaddleState);

	const updatePaddle = useCallback(
		(key: keyof PaddleState, value: PaddleState[keyof PaddleState]) => {
			setPaddle({ ...paddle, [key]: value });
		},
		[paddle, setPaddle],
	);

	const movePaddle = useCallback((direction: "up" | "down") => {
		if (!paddleRef.current) {
			return;
		}

		if (direction === "up" && paddleRef.current.position.z < 80) {
			return (paddleRef.current.position.z += 10);
		}

		if (direction === "down" && paddleRef.current.position.z > -80) {
			return (paddleRef.current.position.z -= 10);
		}
	}, []);

	const resetPaddle = useCallback(
		(all = false) => {
			if (!paddleRef.current) {
				return;
			}

			paddleRef.current.position.z = 0;
			if (all) {
				setPaddle(DEFAULT_PADDLE_VALUES);
			}
		},
		[setPaddle],
	);

	const aiMovePaddle = useCallback(
		(ballPosition: Vector3) => {
			if (!paddleRef.current) {
				return;
			}

			if (ballPosition.z > paddleRef.current.position.z + paddle.width / 5) {
				return (paddleRef.current.position.z += 10);
			}

			if (ballPosition.z < paddleRef.current.position.z - paddle.width / 5) {
				return (paddleRef.current.position.z -= 10);
			}
		},
		[paddle.width],
	);

	useEffect(() => {
		const leftPaddleHandler = (event: KeyboardEvent) => {
			switch (event.key) {
				case "w":
					event.preventDefault();
					movePaddle("down");
					break;
				case "s":
					event.preventDefault();
					movePaddle("up");
					break;
			}
		};

		const rightPaddleHandler = (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					event.preventDefault();
					movePaddle("down");
					break;
				case "ArrowDown":
					event.preventDefault();
					movePaddle("up");
					break;
			}
		};

		if (isLeftSide && !paddle.isAi) {
			window.addEventListener("keydown", leftPaddleHandler);
		}

		if (!isLeftSide && !paddle.isAi) {
			window.addEventListener("keydown", rightPaddleHandler);
		}

		return () => {
			window.removeEventListener("keydown", leftPaddleHandler);
			window.removeEventListener("keydown", rightPaddleHandler);
		};
	}, [isLeftSide, movePaddle, paddle.isAi]);

	return [paddleRef, paddle, updatePaddle, resetPaddle, aiMovePaddle] as const;
};
