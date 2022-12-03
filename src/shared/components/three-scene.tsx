import React, { FC, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface Props {
	children?: ReactNode;
}

export const ThreeScene: FC<Props> = ({ children }) => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[5, 5, 5]} />
			{children}
		</Canvas>
	);
};
