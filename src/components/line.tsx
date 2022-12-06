import React, { forwardRef } from "react";
import { Mesh, Vector3 } from "three";

interface Props {
	length: number;
	position: Vector3;
}

export const Line = forwardRef<Mesh, Props>(({ length, position }, ref) => {
	return (
		<mesh position={position} ref={ref}>
			<boxGeometry args={[length, 1, 0.5]} />
			<meshStandardMaterial color="white" />
		</mesh>
	);
});

Line.displayName = "Line";
