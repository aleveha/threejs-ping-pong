import { DEFAULT_PADDLE_VALUES, PaddleState } from "@zones/shared/states/paddleState";
import React, { forwardRef, useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial, Vector3 } from "three";

interface Props {
	paddle: PaddleState;
	position: Vector3;
}

export const Paddle = forwardRef<Mesh, Props>(({ paddle, position }, ref) => {
	const { color, depth, height, texture, width } = paddle;
	const materialRef = useRef<MeshStandardMaterial>(null);

	useEffect(() => {
		if (materialRef && materialRef.current) {
			materialRef.current.map = texture ?? null;
			materialRef.current.needsUpdate = true;
		}
	}, [texture]);

	return (
		<mesh position={position} ref={ref}>
			<boxGeometry args={[depth, height, width]} />
			<meshStandardMaterial color={!texture ? color : DEFAULT_PADDLE_VALUES.color} ref={materialRef} />
		</mesh>
	);
});

Paddle.displayName = "Paddle";
