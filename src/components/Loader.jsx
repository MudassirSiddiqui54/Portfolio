import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
	const loaderRef = useRef(null);
	const textRef = useRef(null);
	const barRef = useRef(null);

	useEffect(() => {
		const startAnimation = () => {
			const tl = gsap.timeline();
			tl.fromTo(
				barRef.current,
				{ width: "0%" },
				{ width: "100%", duration: 1.8, ease: "power2.inOut" },
			).to(loaderRef.current, {
				opacity: 0,
				duration: 0.5,
				ease: "power2.in",
				onComplete: () => onComplete?.(),
			});
		};

		if (document.readyState === "complete") {
			startAnimation();
		} else {
			window.addEventListener("load", startAnimation, { once: true });
		}

		return () => window.removeEventListener("load", startAnimation);
	}, []);

	return (
		<div
			ref={loaderRef}
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060010]"
		>
			<p
				ref={textRef}
				className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-6"
			>
				Initializing...
			</p>

			{/* Progress bar */}
			<div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
				<div
					ref={barRef}
					className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
					style={{ width: "0%" }}
				/>
			</div>

			<p className="text-gray-600 font-mono text-xs mt-4 tracking-widest">
				MUDASSIR.DEV
			</p>
		</div>
	);
}
