import type { NextPage } from "next";
import { ThreeScene } from "../shared/components/three-scene";
import { Box } from "../shared/components/box";

const Page: NextPage = () => {
	return (
		<div className="h-screen bg-neutral-800">
			<ThreeScene>
				<Box />
			</ThreeScene>
		</div>
	);
};

export default Page;
