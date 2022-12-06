import React, { createElement, FC } from "react";
import { Scene } from "../components/scene";

export const withScene = (Component: FC<any>) => {
	return function withSceneComponent(props: any) {
		return <Scene>{createElement(Component, props)}</Scene>;
	};
};
