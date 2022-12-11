import { Ball } from "@zones/shared/components/ball";
import { Scene } from "@zones/shared/components/scene";
import { useBall } from "@zones/shared/hooks/useBall";
import { gameState } from "@zones/shared/states/gameState";
import { useAtom } from "jotai";
import React, { ChangeEventHandler, FC, useCallback } from "react";
import { Audio, AudioListener, AudioLoader, TextureLoader } from "three";

export const GameSettings: FC = () => {
	const [, ball, updateBall] = useBall();
	const [game, setGame] = useAtom(gameState);

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

	const handleBallSoundChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		e => {
			if (e.target.value.length === 0) {
				updateBall("sound", undefined);
				return;
			}

			const audio = new Audio(new AudioListener());
			new AudioLoader().load("/static/audio/touch/" + e.target.value, buffer => {
				audio.setBuffer(buffer);
				audio.play();
				audio.duration = 0.5;
				if (!audio.name) {
					audio.name = e.target.value;
				}
			});
			updateBall("sound", audio);
		},
		[updateBall],
	);

	const handleWinSoundChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		e => {
			if (e.target.value.length === 0) {
				setGame(prev => ({ ...prev, winSound: undefined }));
				return;
			}

			const audio = new Audio(new AudioListener());
			new AudioLoader().load("/static/audio/win/" + e.target.value, buffer => {
				audio.setBuffer(buffer);
				audio.play();
				if (!audio.name) {
					audio.name = e.target.value;
				}
			});
			setGame(prev => ({ ...prev, winSound: audio }));
		},
		[setGame],
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
			<div className="flex w-full flex-col items-center space-y-8">
				<p className="text-center">Zvuky</p>
				<div className="flex w-2/3 flex-col space-y-2">
					<label className="text-center text-sm" htmlFor="sound/touch">
						Klepání
					</label>
					<select
						className="py-1.5 pl-1 text-neutral-900"
						defaultValue={ball.sound?.name}
						name="sound/touch"
						onChange={handleBallSoundChange}
					>
						<option value="" />
						<option value="alert.wav">Alert</option>
						<option value="fart.wav">Prd</option>
						<option value="notification.wav">Upozornění</option>
					</select>
				</div>
				<div className="flex w-2/3 flex-col space-y-2">
					<label className="text-center text-sm" htmlFor="sound/win">
						Victory
					</label>
					<select
						className="py-1.5 pl-1 text-neutral-900"
						defaultValue={game.winSound?.name}
						name="sound/win"
						onChange={handleWinSoundChange}
					>
						<option value="" />
						<option value="crowd-cheering-victory.wav">Dav jásá nad vítězstvím</option>
						<option value="group-applause.wav">Hromadný potlesk</option>
						<option value="video-game-win.wav">Jako výhra v počítačové hře</option>
					</select>
				</div>
			</div>
		</div>
	);
};
