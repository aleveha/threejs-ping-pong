import { Scene } from "@zones/shared/components/scene";
import React, { createElement, FC } from "react";

export const withScene = (Component: FC<any>) => {
	return function withSceneComponent(props: any) {
		return <Scene cameraPosition={[0, 150, 150]}>{createElement(Component, props)}</Scene>;
	};
};
