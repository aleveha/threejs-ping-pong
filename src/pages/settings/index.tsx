import { GameSettings } from "@zones/settings-zone/components/game-settings";
import { PaddleSettings } from "@zones/settings-zone/components/paddle-settings";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const SettingsPage: NextPage = () => (
	<div className="container flex flex-col justify-between space-y-16 px-6 py-20 text-white">
		<h1 className="text-3xl">On this page you can configure the game to your liking.</h1>
		<PaddleSettings />
		<hr className="border-t-2" />
		<GameSettings />
		<div className="flex h-16 items-start space-x-8">
			<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/">
				Back
			</Link>
			<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/game">
				Play
			</Link>
		</div>
	</div>
);

const Page: NextPage = () => (
	<>
		<Head>
			<title>Game settings</title>
		</Head>
		<SettingsPage />
	</>
);

export default Page;
