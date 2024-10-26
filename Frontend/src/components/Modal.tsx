import React, { createRef } from "react";
import { IoMdClose } from "react-icons/io";
import useClickOutside from "../hooks/useClickOutside.tsx";

type ModalProps = {
	children: React.ReactNode;
	className?: string;
	title?: string;
	show: boolean;
	setShow: (show: boolean) => void;
};

const Modal = ({ children, className, title, show, setShow }: ModalProps) => {
	const ref = createRef<HTMLDivElement>();
	useClickOutside(ref, () => setShow(false));

	// useEffect(() => {
	//     if (show) {
	//         document.body.style.overflow = 'hidden';
	//     } else {
	//         document.body.style.overflow = '';
	//     }
	//
	//     return () => {
	//         document.body.style.overflow = '';
	//     };
	// }, [show]);

	if (!show) return <></>;

	return (
		<div className="fixed right-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.7)] p-4 md:inset-0">
			<div className="relative max-h-full w-full max-w-2xl">
				{
					<div
						className={`relative overflow-hidden rounded-3xl bg-background shadow ${className}`}
						ref={ref}
					>
						<IoMdClose
							className={
								"text-text-0 hover:text-text-0 absolute right-4 top-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-transparent p-1.5 hover:bg-[rgba(0,0,0,0.3)]"
							}
							onClick={() => setShow(false)}
						/>

						{title !== undefined && (
							<div
								className={
									"text-text-0 border-b-background-100 w-full border-b-2 p-8 text-3xl font-bold"
								}
							>
								{title}
							</div>
						)}

						<div className={"p-8"}>{children}</div>
					</div>
				}
			</div>
		</div>
	);
};

export default Modal;
