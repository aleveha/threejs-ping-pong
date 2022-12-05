import React, { FC, useCallback, useState } from "react";
import { Paddle } from "./paddle";
import { Scene } from "./scene";
import { Ball } from "./ball";
import { usePaddle } from "../hooks/usePaddle";
import { useBall } from "../hooks/useBall";
import { Vector3 } from "three";
import { Modal } from "./modal";
import confetti from "canvas-confetti";

type GameStatus = "not-started" | "started" | "playing" | "ended";

export const Game: FC = () => {
	const [leftPaddleRef, leftPaddle, , resetLeftPaddle] = usePaddle("left");
	const [rightPaddleRef, rightPaddle, , resetRightPaddle] = usePaddle("right");
	const [ballRef, ball, , resetBall] = useBall();
	const [isBallMovingRight, setIsBallMovingRight] = useState(true);
	const [gameState, setGameState] = useState<GameStatus>("not-started");

	const handleStartGame = useCallback(() => {
		setGameState("started");
		resetLeftPaddle();
		resetRightPaddle();
		resetBall();
		const timer = setTimeout(() => setGameState("playing"), 1000);
		return () => clearTimeout(timer);
	}, [resetBall, resetLeftPaddle, resetRightPaddle]);

	const moveBall = useCallback(() => {
		if (!ballRef.current || !leftPaddleRef.current || !rightPaddleRef.current || gameState !== "playing") {
			return;
		}

		const { x: ballX, z: ballZ } = ballRef.current.position;
		const { x: leftPaddleX, z: leftPaddleZ } = leftPaddleRef.current.position;
		const { x: rightPaddleX, z: rightPaddleZ } = rightPaddleRef.current.position;

		if (isBallMovingRight) {
			ballRef.current.position.x += ball.speed;
		} else {
			ballRef.current.position.x -= ball.speed;
		}

		if (
			isBallMovingRight &&
			ballX > rightPaddleX - rightPaddle.depth &&
			ballZ >= rightPaddleZ - rightPaddle.width / 2 - ball.radius &&
			ballZ <= rightPaddleZ + rightPaddle.width / 2 + ball.radius
		) {
			setIsBallMovingRight(false);
			return;
		}

		if (
			!isBallMovingRight &&
			ballX < leftPaddleX + leftPaddle.depth &&
			ballZ >= leftPaddleZ - leftPaddle.width / 2 - ball.radius &&
			ballZ <= leftPaddleZ + leftPaddle.width / 2 + ball.radius
		) {
			setIsBallMovingRight(true);
			return;
		}

		if (ballX <= leftPaddleX - leftPaddle.depth || ballX >= rightPaddleX + rightPaddle.depth) {
			setGameState("ended");
			confetti({
				particleCount: 200,
				spread: 200,
			});
			return;
		}
	}, [ball, ballRef, gameState, isBallMovingRight, leftPaddle, leftPaddleRef, rightPaddle, rightPaddleRef]);

	return (
		<>
			<Scene>
				<Paddle
					paddle={leftPaddle}
					position={leftPaddleRef.current?.position ?? new Vector3(-10, 0, 0)}
					ref={leftPaddleRef}
				/>
				<Paddle
					paddle={rightPaddle}
					position={rightPaddleRef.current?.position ?? new Vector3(10, 0, 0)}
					ref={rightPaddleRef}
				/>
				<Ball ball={ball} onMove={moveBall} ref={ballRef} />
			</Scene>
			<Modal
				isOpen={["not-started", "ended"].includes(gameState)}
				isEnded={gameState === "ended"}
				onClick={handleStartGame}
				isBallMovingRight={isBallMovingRight}
			/>
		</>
	);
};
