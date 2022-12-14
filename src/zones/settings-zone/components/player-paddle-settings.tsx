import { Paddle } from "@zones/shared/components/paddle";
import { Scene } from "@zones/shared/components/scene";
import { PaddleState } from "@zones/shared/states/paddleState";
import React, { ChangeEvent, FC } from "react";
import { Vector3 } from "three";

interface Props {
	accentColor: string;
	handlePaddleChange: (key: keyof PaddleState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	name: string;
	paddle: PaddleState;
}

export const PlayerPaddleSettings: FC<Props> = ({ accentColor, handlePaddleChange, name, paddle }) => (
	<div className="flex w-full flex-col items-center justify-between space-y-8">
		<p className="text-center">{name}</p>
		<div className="flex items-center space-x-4">
			<label htmlFor="isAI">AI</label>
			<input
				className="h-4 w-4"
				name="isAI"
				onChange={handlePaddleChange("isAi")}
				style={{ accentColor }}
				type="checkbox"
			/>
		</div>
		<div className="flex w-2/3 space-x-2">
			<div className="flex w-1/2 flex-col space-y-2">
				<label className="text-center text-sm" htmlFor="color">
					Color
				</label>
				<input
					className="h-8 w-full"
					defaultValue={paddle.color}
					disabled={!!paddle.texture}
					name="color"
					onChange={handlePaddleChange("color")}
					type="color"
				/>
			</div>
			<div className="flex w-1/2 flex-col space-y-2">
				<label className="text-center text-sm" htmlFor="texture">
					Texture
				</label>
				<select
					className="py-1.5 pl-1 text-neutral-900"
					defaultValue={paddle.texture?.image?.currentSrc.split("/").pop()}
					name="texture"
					onChange={handlePaddleChange("texture")}
				>
					<option value="" />
					<option value="bricks.jpg">Bricks</option>
					<option value="jeans.jpg">Jeans</option>
					<option value="space.jpg">Space</option>
					<option value="stones.jpg">Stones</option>
				</select>
			</div>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="height">
				Height
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.height}
				max={20}
				min={5}
				name="height"
				onChange={handlePaddleChange("height")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="width">
				Width
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.width}
				max={40}
				min={10}
				name="width"
				onChange={handlePaddleChange("width")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="flex w-2/3 flex-col space-y-2">
			<label className="text-center text-sm" htmlFor="width">
				Depth
			</label>
			<input
				className="cursor-grab"
				defaultValue={paddle.depth}
				max={20}
				min={5}
				name="width"
				onChange={handlePaddleChange("depth")}
				step={1}
				style={{ accentColor }}
				type="range"
			/>
		</div>
		<div className="h-60 w-full cursor-grab">
			<Scene cameraPosition={[15, 15, 25]}>
				<Paddle paddle={paddle} position={new Vector3(0, 0, 0)} />
			</Scene>
		</div>
	</div>
);
