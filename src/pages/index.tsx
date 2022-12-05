import type { NextPage } from "next";
import { Game } from "../components/game";

const Page: NextPage = () => (
	<div className="h-screen bg-neutral-800">
		<Game />
	</div>
);

export default Page;
