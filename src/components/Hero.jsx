import { useEffect, useRef } from "react";
import gsap from "gsap";
import LightRays from "@/components/ui/LightRays";
import GradientText from "@/components/ui/GradientText";
import TextType from "@/components/ui/TextType";

export default function Hero({ startAnimation = false }) {
	const welcomeRef = useRef(null);
	const heyRef = useRef(null);
	const nameRef = useRef(null);
	const rolesRef = useRef(null);
	const taglineRef = useRef(null);

	useEffect(() => {
		if (!startAnimation) return;
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		tl.fromTo(
			welcomeRef.current,
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 0.6 },
		)
			.fromTo(
				heyRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5 },
				"-=0.3",
			)
			.fromTo(
				nameRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.7 },
				"-=0.2",
			)
			.fromTo(
				rolesRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5 },
				"-=0.2",
			)
			.fromTo(
				taglineRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5 },
				"-=0.2",
			);
	}, [startAnimation]);

	return (
		<section
			id="hero"
			className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
		>
			{/* Background — absolute so it fills behind content */}
			<div className="absolute inset-0 z-0">
				<LightRays
					raysColor="#00f5ff"
					lightSpread={5}
					rayLength={1.5}
					followMouse={true}
					mouseInfluence={0.15}
				/>
			</div>

			{/* Content — centered on top */}
			<div className="relative z-10 flex flex-col items-center text-center gap-3 px-4">
				{/* Welcome line */}
				<p
					ref={welcomeRef}
					className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase font-mono"
				>
					Welcome to my portfolio
				</p>

				{/* Hey I'm */}
				<p
					ref={heyRef}
					className="text-white text-xl md:text-2xl font-light"
				>
					Hey, I'm
				</p>

				{/* Name */}
				<div ref={nameRef} style={{ opacity: 0 }}>
					<GradientText
						colors={["#162d4a", "#3a86a8", "#162d4a"]}
						animationSpeed={6}
						className="text-5xl md:text-7xl font-bold tracking-tight"
					>
						Mudassir Siddiqui
					</GradientText>
				</div>

				{/* TextType roles */}
				<TextType
					ref={rolesRef}
					text={[
						"Full Stack Developer",
						"Python Developer",
						"ML Enthusiast",
					]}
					typingSpeed={75}
					pauseDuration={2000}
					className="text-xl md:text-2xl text-cyan-400 font-mono mt-1"
				/>

				{/* Tagline */}
				<p
					ref={taglineRef}
					className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed mt-2"
				>
					I craft beautiful functional digital experiences that bring
					ideas to life, specializing in modern web development and
					user-centric design.
				</p>
			</div>
			{/* Bottom blend into About */}
			<div
				className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, transparent, #060010)",
				}}
			/>
		</section>
	);
}
