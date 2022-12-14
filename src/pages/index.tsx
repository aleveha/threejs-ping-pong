import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";

const Homepage: FC = () => (
	<div className="flex justify-start">
		<div className="container flex h-screen flex-col justify-center space-y-8 px-6 text-white">
			<h1 className="text-4xl">Welcome to the game!</h1>
			<p>
				<span>It is a pong game with 3D graphics for two players or one player with AI.</span>
				<br />
				<span>The strongest wins!</span>
			</p>
			<div className="flex h-8 items-start space-x-8">
				<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/settings">
					Settings
				</Link>
				<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/game">
					Play
				</Link>
			</div>
		</div>
	</div>
);

const Page: NextPage = () => (
	<>
		<Head>
			<title>Welcome to the game!</title>
		</Head>
		<Homepage />
	</>
);

export default Page;
