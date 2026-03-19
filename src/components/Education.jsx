import { useRef, useEffect } from "react";
import gsap from "gsap";
import { GraduationCap } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Particles from "@/components/ui/Particles";

const timeline = [
	{
		year: "2022–2023",
		title: "Secondary Education (SSC)",
		institution: "Nutan English School",
		description: "Built a strong foundation in science and mathematics.",
		completed: true,
		current: false,
	},
	{
		year: "2043–2025",
		title: "Higher Secondary Education (HSC)",
		institution: "Central Public Jr. College",
		description: "Developed early interest in programming and technology.",
		completed: true,
		current: false,
	},
	{
		year: "2025–2028",
		title: "B.Tech in AI & Data Science",
		institution: "KJ Somaiya Institute of Technology",
		description:
			"Specializing in artificial intelligence, machine learning, and data-driven engineering.",
		completed: false,
		current: true,
	},
];

export default function Education() {
	const sectionRef = useRef(null);
	const lineRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target, {
							opacity: 1,
							x: 0,
							filter: "blur(0px)",
							duration: 0.8,
							ease: "power3.out",
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);

		const items = sectionRef.current?.querySelectorAll(".timeline-item");
		items?.forEach((item, i) => {
			gsap.set(item, {
				opacity: 0,
				x: i % 2 === 0 ? -60 : 60,
				filter: "blur(6px)",
			});
			observer.observe(item);
		});

		// Line draw
		const lineObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.fromTo(
							lineRef.current,
							{ scaleY: 0 },
							{
								scaleY: 1,
								duration: 1.5,
								ease: "power2.inOut",
								transformOrigin: "top",
							},
						);
						lineObserver.disconnect();
					}
				});
			},
			{ threshold: 0.1 },
		);
		if (lineRef.current) lineObserver.observe(lineRef.current);

		return () => {
			observer.disconnect();
			lineObserver.disconnect();
		};
	}, []);

	return (
		<section
			id="education"
			ref={sectionRef}
			className="relative w-full py-32 overflow-hidden"
		>
			<div className="absolute inset-0 z-0">
				<Particles
					particleColors={["#ffffff"]}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover
					alphaParticles={false}
					disableRotation={false}
					pixelRatio={1}
				/>
			</div>
			{/* Top blend */}
			<div
				className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, #060010, transparent)",
				}}
			/>

			{/* Bottom blend */}
			<div
				className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background: "linear-gradient(to top, #060010, transparent)",
				}}
			/>

			<div className="relative z-20 max-w-4xl mx-auto px-6">
				{/* Header */}
				<div className="mb-16 text-center">
					<p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono mb-3">
						My Journey
					</p>
					<h2 className="text-white text-4xl md:text-5xl font-bold">
						Education{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141e3a] via-[#6b5cff] to-[#141e3a]">
							Timeline
						</span>
					</h2>
				</div>

				{/* Timeline */}
				<div className="relative">
					{/* Vertical line */}
					<div
						ref={lineRef}
						className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent md:-translate-x-px origin-top"
					/>

					{timeline.map((item, i) => (
						<div
							key={i}
							className={`timeline-item relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
								i % 2 === 0
									? "md:flex-row"
									: "md:flex-row-reverse"
							}`}
						>
							{/* Node */}
							<div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
										item.current
											? "bg-cyan-400/20 border-cyan-400 shadow-[0_0_12px_#00f5ff]"
											: "bg-violet-500/20 border-violet-500"
									}`}
								>
									<GraduationCap
										size={14}
										className={
											item.current
												? "text-cyan-400"
												: "text-violet-400"
										}
									/>
								</div>
							</div>

							{/* Card */}
							<div
								className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
									i % 2 === 0 ? "md:pr-8" : "md:pl-8"
								}`}
							>
								<SpotlightCard
									className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300"
									spotlightColor="rgba(0, 245, 255, 0.12)"
								>
									<div className="flex items-center gap-2 mb-2">
										<span className="font-mono text-xs text-cyan-400">
											{item.year}
										</span>
										{item.current && (
											<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono border border-cyan-400/20">
												<span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
												Current
											</span>
										)}
									</div>
									<h3 className="text-white text-lg font-semibold mt-1">
										{item.title}
									</h3>
									<p className="text-cyan-400/70 font-mono text-sm mt-1">
										{item.institution}
									</p>
									<p className="text-gray-400 text-sm mt-2 leading-relaxed">
										{item.description}
									</p>
								</SpotlightCard>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
