import { useFrame } from "@react-three/fiber";
import { BallState, DEFAULT_BALL_VALUES } from "@zones/shared/states/ballState";
import React, { forwardRef, useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";

interface Props {
	ball: BallState;
	onMove?: () => void;
}

export const Ball = forwardRef<Mesh, Props>(({ ball, onMove }, ref) => {
	const { color, radius, texture } = ball;
	const materialRef = useRef<MeshStandardMaterial>(null);

	useFrame(() => {
		if (onMove) {
			onMove();
		}
	});

	useEffect(() => {
		if (materialRef && materialRef.current) {
			materialRef.current.map = texture ?? null;
			materialRef.current.needsUpdate = true;
		}
	}, [texture]);

	return (
		<mesh ref={ref}>
			<sphereBufferGeometry args={[radius, 50, 50]} />
			<meshStandardMaterial color={!texture ? color : DEFAULT_BALL_VALUES.color} ref={materialRef} />
		</mesh>
	);
});

Ball.displayName = "Ball";
