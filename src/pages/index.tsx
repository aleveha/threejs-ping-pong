import type { NextPage } from "next";
import { Game } from "../components/game";
import { Modal } from "../components/modal";
import React from "react";

const Page: NextPage = () => (
	<div className="h-screen bg-neutral-800">
		<Game />
		<Modal />
	</div>
);

export default Page;
