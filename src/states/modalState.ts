import { atom } from "jotai";

export interface ModalState {
	handleButtonClick?: () => void;
	isBallMovingRight: boolean;
	isGameEnded: boolean;
	isOpen: boolean;
}

export const modalState = atom<ModalState>({
	isBallMovingRight: true,
	isGameEnded: false,
	isOpen: true,
});
