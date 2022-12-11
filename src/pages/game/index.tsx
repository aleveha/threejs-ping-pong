import { Game } from "@zones/game-zone/components/game";
import { GameStateModal } from "@zones/game-zone/components/game-state-modal";
import type { NextPage } from "next";
import Head from "next/head";
import React, { FC } from "react";

const GamePage: FC = () => (
	<div className="h-screen">
		<Game />
		<GameStateModal />
	</div>
);

const Page: NextPage = () => (
	<>
		<Head>
			<title>Pojďte si zahrát</title>
		</Head>
		<GamePage />
	</>
);

export default Page;
