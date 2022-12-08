import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";

const Homepage: FC = () => (
	<div className="flex justify-start bg-neutral-900">
		<div className="container flex h-screen flex-col justify-center space-y-8 px-6 text-white">
			<h1 className="text-4xl">Vítejte ve hře!</h1>
			<p>
				<span>Je to tenisová počítačová hra s 3D grafikou pro dva hráče.</span>
				<br />
				<span>Zvítězí nejsilnější!</span>
			</p>
			<div className="flex h-8 items-start space-x-8">
				<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/settings">
					Nastavení
				</Link>
				<Link className="border-b-2 px-1 pb-1 hover:border-b-8" href="/game">
					Hrát
				</Link>
			</div>
		</div>
	</div>
);

const Page: NextPage = () => (
	<>
		<Head>
			<title>Vítejte ve hře!</title>
		</Head>
		<Homepage />
	</>
);

export default Page;
