import { useFrame } from "@react-three/fiber";
import { BallState } from "@zones/shared/states/ballState";
import React, { forwardRef } from "react";
import { Mesh } from "three";

interface Props {
	ball: BallState;
	onMove: () => void;
}

export const Ball = forwardRef<Mesh, Props>(({ ball, onMove }, ref) => {
	const { color, radius } = ball;

	useFrame(onMove);

	return (
		<mesh ref={ref}>
			<sphereBufferGeometry args={[radius, 20, 20]} />
			<meshToonMaterial color={color} />
		</mesh>
	);
});

Ball.displayName = "Ball";
