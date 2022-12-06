import React, { forwardRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { BallState } from "../states/ballState";

interface Props {
	ball: BallState;
	onMove: () => void;
}

export const Ball = forwardRef<Mesh, Props>(({ ball, onMove }, ref) => {
	const { color, radius } = ball;

	useFrame(onMove);

	return (
		<mesh ref={ref}>
			<sphereBufferGeometry args={[radius, 10, 10]} />
			<meshToonMaterial color={color} />
		</mesh>
	);
});

Ball.displayName = "Ball";
