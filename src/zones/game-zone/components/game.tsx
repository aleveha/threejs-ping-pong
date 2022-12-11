import { Ball } from "@zones/shared/components/ball";
import { Paddle } from "@zones/shared/components/paddle";
import { useBall } from "@zones/shared/hooks/useBall";
import { usePaddle } from "@zones/shared/hooks/usePaddle";
import { gameState } from "@zones/shared/states/gameState";
import confetti from "canvas-confetti";
import { useAtom } from "jotai";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { withScene } from "../hooks/withScene";
import { modalState } from "../states/modal-state";
import { Line } from "./line";

const GameComponent: FC = () => {
	const [leftPaddleRef, leftPaddle, , resetLeftPaddle] = usePaddle("left");
	const [rightPaddleRef, rightPaddle, , resetRightPaddle] = usePaddle("right");
	const [ballRef, ball, updateBall, resetBall] = useBall();
	const [isBallMovingRight, setIsBallMovingRight] = useState(true);
	const upLineRef = useRef<Mesh>(null);
	const downLineRef = useRef<Mesh>(null);
	const [, setModalState] = useAtom(modalState);
	const [game, setGame] = useAtom(gameState);

	const handleStartGame = useCallback(() => {
		setGame(prev => ({ ...prev, state: "started" }));
		resetLeftPaddle();
		resetRightPaddle();
		resetBall();

		const timer = setTimeout(() => setGame(prev => ({ ...prev, state: "playing" })), 1000);
		return () => clearTimeout(timer);
	}, [resetBall, resetLeftPaddle, resetRightPaddle, setGame]);

	const getHitAngle = useCallback((paddlePosition: Vector3, ballPosition: Vector3) => {
		let angle = ballPosition.angleTo(paddlePosition) / 0.15;

		if (paddlePosition.z > ballPosition.z) {
			angle = -Math.abs(angle);
		}

		if (angle === 0) {
			angle = 1;
		}

		return angle;
	}, []);

	const invertCurrentAngle = useCallback(() => {
		if (ball.angle > 0) {
			updateBall("angle", -Math.abs(ball.angle));
		} else {
			updateBall("angle", Math.abs(ball.angle));
		}
	}, [ball.angle, updateBall]);

	const handleBallHitWall = useCallback(() => {
		if (!ballRef.current || !upLineRef.current || !downLineRef.current) {
			return;
		}

		if (ballRef.current.position.z - ball.radius <= upLineRef.current.position.z) {
			invertCurrentAngle();
			ball.sound?.play();
		} else if (ballRef.current.position.z + ball.radius >= downLineRef.current.position.z) {
			invertCurrentAngle();
			ball.sound?.play();
		}
	}, [ball.radius, ball.sound, ballRef, invertCurrentAngle]);

	const moveBall = useCallback(() => {
		if (!ballRef.current || !leftPaddleRef.current || !rightPaddleRef.current || game.state !== "playing") {
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
			ball.sound?.play();
			updateBall("angle", getHitAngle(rightPaddleRef.current.position, ballRef.current.position));
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
			ball.sound?.play();
			updateBall("angle", getHitAngle(leftPaddleRef.current.position, ballRef.current.position));
			setIsBallMovingRight(true);
			return;
		}

		if (ballX <= leftPaddleX - leftPaddle.depth || ballX >= rightPaddleX + rightPaddle.depth) {
			setGame(prev => ({ ...prev, state: "ended" }));
			confetti({
				particleCount: 200,
				spread: 200,
			});
			game.winSound?.play();
			return;
		}
	}, [
		ball,
		ballRef,
		game,
		getHitAngle,
		handleBallHitWall,
		invertCurrentAngle,
		isBallMovingRight,
		leftPaddle,
		leftPaddleRef,
		rightPaddle,
		rightPaddleRef,
		setGame,
		updateBall,
	]);

	useEffect(() => {
		setModalState({
			handleButtonClick: handleStartGame,
			isBallMovingRight,
			isOpen: game.state === "not-started" || game.state === "ended",
			isGameEnded: game.state === "ended",
		});
	}, [game.state, handleStartGame, isBallMovingRight, leftPaddle.color, rightPaddle.color, setModalState]);

	return (
		<>
			<Paddle
				paddle={leftPaddle}
				position={leftPaddleRef.current?.position ?? new Vector3(-100, 0, 0)}
				ref={leftPaddleRef}
			/>
			<Paddle
				paddle={rightPaddle}
				position={rightPaddleRef.current?.position ?? new Vector3(100, 0, 0)}
				ref={rightPaddleRef}
			/>
			<Ball ball={ball} onMove={moveBall} ref={ballRef} />
			<Line length={190} position={new Vector3(0, 0, -100)} ref={upLineRef} />
			<Line length={190} position={new Vector3(0, 0, 100)} ref={downLineRef} />
		</>
	);
};
export const Game = withScene(GameComponent);
