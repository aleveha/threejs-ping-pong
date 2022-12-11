import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraControls: FC = () => {
	const { camera, gl } = useThree();

	useEffect(() => {
		const cameraControls = new OrbitControls(camera, gl.domElement);
		cameraControls.enableZoom = false;
	}, [camera, gl.domElement]);

	return null;
};
