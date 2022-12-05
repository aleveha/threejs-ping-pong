import React, { FC, ReactNode, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./camera";

interface Props {
	children?: ReactNode;
}

export const Scene: FC<Props> = ({ children }) => {
	const cameraRef = useRef<CameraControls>(null);

	return (
		<Canvas
			camera={{
				position: [0, 10, 10],
			}}
		>
			<CameraControls ref={cameraRef} />
			<ambientLight />
			<pointLight position={[1, 5, 5]} />
			{children}
		</Canvas>
	);
};
