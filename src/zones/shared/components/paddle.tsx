import { PaddleState } from "@zones/shared/states/paddleState";
import React, { forwardRef } from "react";
import { Mesh, Vector3 } from "three";

interface Props {
	paddle: PaddleState;
	position: Vector3;
}

export const Paddle = forwardRef<Mesh, Props>(({ paddle, position }, ref) => {
	const { color, depth, height, width } = paddle;

	return (
		<mesh position={position} ref={ref}>
			<boxGeometry args={[depth, height, width]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
});

Paddle.displayName = "Paddle";
