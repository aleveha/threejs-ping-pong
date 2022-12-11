import { PlayerPaddleSettings } from "@zones/settings-zone/components/player-paddle-settings";
import { usePaddle } from "@zones/shared/hooks/usePaddle";
import { DEFAULT_PADDLE_VALUES, PaddleState } from "@zones/shared/states/paddleState";
import React, { ChangeEventHandler, FC, useCallback, useState } from "react";
import { TextureLoader } from "three";

type HandleSliderChange = (
	side: "left" | "right",
) => (key: keyof PaddleState, isNumber?: boolean) => ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;

export const PaddleSettings: FC = () => {
	const [, leftPaddle, updateLeftPaddle] = usePaddle("left");
	const [, rightPaddle, updateRightPaddle] = usePaddle("right");
	const [accentColorLeft, setAccentColorLeft] = useState<string>(leftPaddle.color);
	const [accentColorRight, setAccentColorRight] = useState<string>(rightPaddle.color);

	const handleSliderChange = useCallback<HandleSliderChange>(
		side => key => e => {
			if (key === "color") {
				if (side === "left") {
					setAccentColorLeft(e.target.value);
				} else {
					setAccentColorRight(e.target.value);
				}
			}

			const value =
				typeof DEFAULT_PADDLE_VALUES[key] === "number"
					? parseInt(e.target.value, 10)
					: key === "texture"
					? e.target.value.length > 0
						? new TextureLoader().load("/static/textures/" + e.target.value)
						: undefined
					: e.target.value;

			if (side === "left") {
				updateLeftPaddle(key, value);
			} else {
				updateRightPaddle(key, value);
			}
		},
		[updateLeftPaddle, updateRightPaddle],
	);

	return (
		<div className="grid w-full grid-cols-2 divide-x-2 divide-white self-center">
			<PlayerPaddleSettings
				accentColor={accentColorLeft}
				handleSliderChange={handleSliderChange("left")}
				name="Hráč 1"
				paddle={leftPaddle}
			/>
			<PlayerPaddleSettings
				accentColor={accentColorRight}
				handleSliderChange={handleSliderChange("right")}
				name="Hráč 2"
				paddle={rightPaddle}
			/>
		</div>
	);
};
