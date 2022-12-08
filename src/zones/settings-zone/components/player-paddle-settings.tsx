import { Paddle } from "@zones/shared/components/paddle";
import { Scene } from "@zones/shared/components/scene";
import { PaddleState } from "@zones/shared/states/paddleState";
import React, { FC } from "react";
import { Vector3 } from "three";

interface Props {
	accentColor: string;
	handleSliderChange: (key: keyof PaddleState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	paddle: PaddleState;
}

export const PlayerPaddleSettings: FC<Props> = ({ accentColor, handleSliderChange, name, paddle }) => (
	<div className="flex w-full flex-col items-center justify-between">
		<p className="text-center">{name}</p>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="color">
				Barva
			</label>
			<input
				className="w-full"
				defaultValue={paddle.color}
				name="color"
				onChange={handleSliderChange("color")}
				type="color"
			/>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="height">
				Výška
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.height}
				max={20}
				min={5}
				name="height"
				onChange={handleSliderChange("height")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="width">
				Šířka
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.width}
				max={40}
				min={10}
				name="width"
				onChange={handleSliderChange("width")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="width">
				Hloubka
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.depth}
				max={20}
				min={5}
				name="width"
				onChange={handleSliderChange("depth")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="h-2/5 w-full cursor-grab">
			<Scene cameraPosition={[15, 15, 25]}>
				<Paddle paddle={paddle} position={new Vector3(0, 0, 0)} />
			</Scene>
		</div>
	</div>
);
