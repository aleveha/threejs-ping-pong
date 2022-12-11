import { Canvas } from "@react-three/fiber";
import React, { FC, ReactNode } from "react";
import { CameraControls } from "./camera";

interface Props {
	cameraPosition?: [number, number, number];
	children?: ReactNode;
}

export const Scene: FC<Props> = ({ cameraPosition, children }) => (
	<Canvas camera={{ position: cameraPosition }}>
		<CameraControls />
		<ambientLight />
		<pointLight position={[10, 50, 50]} />
		{children}
	</Canvas>
);
