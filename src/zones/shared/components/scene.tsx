import { Canvas } from "@react-three/fiber";
import React, { FC, ReactNode, useRef } from "react";
import { CameraControls } from "./camera";

interface Props {
	cameraPosition?: [number, number, number];
	children?: ReactNode;
}

export const Scene: FC<Props> = ({ cameraPosition, children }) => {
	const cameraRef = useRef<CameraControls>(null);

	return (
		<Canvas camera={{ position: cameraPosition }}>
			<CameraControls ref={cameraRef} />
			<ambientLight />
			<pointLight position={[10, 50, 50]} />
			{children}
		</Canvas>
	);
};
