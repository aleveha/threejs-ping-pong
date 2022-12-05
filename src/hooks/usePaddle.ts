import { useAtom } from "jotai";
import { leftPaddleState, rightPaddleState } from "../states/paddleState";
import { useCallback, useEffect, useRef } from "react";
import { Mesh } from "three";

export const usePaddle = (side: "left" | "right") => {
	const isLeftSide = side === "left";
	const paddleRef = useRef<Mesh>(null);
	const [paddle, setPaddle] = useAtom(isLeftSide ? leftPaddleState : rightPaddleState);

	const setPaddleColor = useCallback(
		(color: string) => {
			setPaddle({ ...paddle, color });
		},
		[paddle, setPaddle],
	);

	const movePaddle = useCallback(
		(direction: "up" | "down") => {
			if (!paddleRef.current) {
				return;
			}

			if (direction === "up" && paddleRef.current.position.y < 5) {
				return (paddleRef.current.position.z += paddle.width * 0.1);
			}

			if (direction === "down" && paddleRef.current.position.y > -5) {
				return (paddleRef.current.position.z -= paddle.width * 0.1);
			}
		},
		[paddle.width],
	);

	const resetPaddle = useCallback(() => {
		if (!paddleRef.current) {
			return;
		}

		paddleRef.current.position.z = 0;
	}, []);

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

		if (isLeftSide) {
			window.addEventListener("keydown", leftPaddleHandler);
		} else {
			window.addEventListener("keydown", rightPaddleHandler);
		}

		return () => {
			window.removeEventListener("keydown", leftPaddleHandler);
			window.removeEventListener("keydown", rightPaddleHandler);
		};
	}, [isLeftSide, movePaddle]);

	return [paddleRef, paddle, setPaddleColor, resetPaddle] as const;
};
