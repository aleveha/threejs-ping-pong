import { Ball } from "@zones/shared/components/ball";
import { Scene } from "@zones/shared/components/scene";
import { useBall } from "@zones/shared/hooks/useBall";
import React, { ChangeEventHandler, FC, useCallback } from "react";
import { TextureLoader } from "three";

export const GameSettings: FC = () => {
	const [, ball, updateBall] = useBall();

	const handleBallColorChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		e => updateBall("color", e.target.value),
		[updateBall],
	);

	const handleBallTextureChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		e =>
			updateBall(
				"texture",
				e.target.value.length > 0 ? new TextureLoader().load("/static/textures/" + e.target.value) : undefined,
			),
		[updateBall],
	);

	return (
		<div className="grid w-full grid-cols-2 divide-x-2 divide-white self-center">
			<div className="flex w-full flex-col items-center justify-between space-y-8">
				<p className="text-center">Míč</p>
				<div className="flex w-2/3 space-x-2">
					<div className="flex w-1/2 flex-col space-y-2">
						<label className="text-center text-sm" htmlFor="color">
							Barva
						</label>
						<input
							className="h-8 w-full"
							defaultValue={ball.color}
							disabled={!!ball.texture}
							name="color"
							onChange={handleBallColorChange}
							type="color"
						/>
					</div>
					<div className="flex w-1/2 flex-col space-y-2">
						<label className="text-center text-sm" htmlFor="texture">
							Textura
						</label>
						<select
							className="py-1.5 pl-1 text-neutral-900"
							defaultValue={ball.texture?.image?.currentSrc.split("/").pop()}
							name="texture"
							onChange={handleBallTextureChange}
						>
							<option value="" />
							<option value="bricks.jpg">Cihly</option>
							<option value="jeans.jpg">Džíny</option>
							<option value="space.jpg">Vesmír</option>
							<option value="stones.jpg">Kameny</option>
						</select>
					</div>
				</div>
				<div className="h-60 w-full cursor-grab">
					<Scene cameraPosition={[10, 10, 0]}>
						<Ball ball={ball} />
					</Scene>
				</div>
			</div>
			<div className="flex w-full flex-col items-center justify-between space-y-8" />
		</div>
	);
};
