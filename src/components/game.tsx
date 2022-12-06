import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { usePaddle } from "../hooks/usePaddle";
import { useBall } from "../hooks/useBall";
import { Mesh, Vector3 } from "three";
import confetti from "canvas-confetti";
import { withScene } from "../hooks/withScene";
import { Line } from "./line";

type GameStatus = "not-started" | "started" | "playing" | "ended";

const GameComponent: FC = () => {
	const [leftPaddleRef, leftPaddle, , resetLeftPaddle] = usePaddle("left");
	const [rightPaddleRef, rightPaddle, , resetRightPaddle] = usePaddle("right");
	const [ballRef, ball, , setAngle, resetBall] = useBall();
	const [isBallMovingRight, setIsBallMovingRight] = useState(true);
	const [gameState, setGameState] = useState<GameStatus>("not-started");
	const upLineRef = useRef<Mesh>(null);
	const downLineRef = useRef<Mesh>(null);

	const handleStartGame = useCallback(() => {
		setGameState("started");
		resetLeftPaddle();
		resetRightPaddle();
		resetBall();

		const timer = setTimeout(() => setGameState("playing"), 1000);
		return () => clearTimeout(timer);
	}, [resetBall, resetLeftPaddle, resetRightPaddle]);

	const getHitAngle = useCallback((paddlePosition: Vector3, ballPosition: Vector3) => {
		let angle = ballPosition.angleTo(paddlePosition) / 1.5;

		if (paddlePosition.z > ballPosition.z) {
			angle = -Math.abs(angle);
		}

		if (angle === 0) {
			angle = 0.1;
		}

		return angle;
	}, []);

	const invertCurrentAngle = useCallback(() => {
		if (ball.angle > 0) {
			setAngle(-Math.abs(ball.angle));
		} else {
			setAngle(Math.abs(ball.angle));
		}
	}, [ball.angle, setAngle]);

	const handleBallHitWall = useCallback(() => {
		if (!ballRef.current || !upLineRef.current || !downLineRef.current) {
			return;
		}

		if (ballRef.current.position.z - ball.radius <= upLineRef.current.position.z) {
			invertCurrentAngle();
		} else if (ballRef.current.position.z + ball.radius >= downLineRef.current.position.z) {
			invertCurrentAngle();
		}
	}, [ball.radius, ballRef, invertCurrentAngle]);

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
		ballRef.current.position.z += ball.angle;

		handleBallHitWall();

		if (
			isBallMovingRight &&
			ballX > rightPaddleX - rightPaddle.depth &&
			ballZ >= rightPaddleZ - rightPaddle.width / 2 - ball.radius &&
			ballZ <= rightPaddleZ + rightPaddle.width / 2 + ball.radius
		) {
			invertCurrentAngle();
			setAngle(getHitAngle(rightPaddleRef.current.position, ballRef.current.position));
			setIsBallMovingRight(false);
			return;
		}

		if (
			!isBallMovingRight &&
			ballX < leftPaddleX + leftPaddle.depth &&
			ballZ >= leftPaddleZ - leftPaddle.width / 2 - ball.radius &&
			ballZ <= leftPaddleZ + leftPaddle.width / 2 + ball.radius
		) {
			invertCurrentAngle();
			setAngle(getHitAngle(leftPaddleRef.current.position, ballRef.current.position));
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
	}, [
		ball,
		ballRef,
		gameState,
		getHitAngle,
		handleBallHitWall,
		invertCurrentAngle,
		isBallMovingRight,
		leftPaddle,
		leftPaddleRef,
		rightPaddle,
		rightPaddleRef,
		setAngle,
	]);

	useEffect(() => {
		handleStartGame();
	}, []);

	return (
		<>
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
			<Line length={19} position={new Vector3(0, 0, -10)} ref={upLineRef} />
			<Line length={19} position={new Vector3(0, 0, 10)} ref={downLineRef} />
			{/*<Modal*/}
			{/*	isBallMovingRight={isBallMovingRight}*/}
			{/*	isEnded={gameState === "ended"}*/}
			{/*	isOpen={["not-started", "ended"].includes(gameState)}*/}
			{/*	onClick={handleStartGame}*/}
			{/*/>*/}
		</>
	);
};
export const Game = withScene(GameComponent);
