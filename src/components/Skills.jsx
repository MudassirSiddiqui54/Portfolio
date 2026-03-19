import { useRef } from "react";
import { ParticleCard, GlobalSpotlight } from "@/components/ui/MagicBento";
import {
	FaReact,
	FaHtml5,
	FaCss3Alt,
	FaNodeJs,
	FaGitAlt,
	FaGithub,
	FaJava,
} from "react-icons/fa";
import {
	SiTailwindcss,
	SiExpress,
	SiDjango,
	SiNumpy,
	SiPandas,
	SiJavascript,
	SiPython,
	SiMysql,
	SiMongodb,
	SiSqlite,
	SiC,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const SKILLS = [
	{
		label: "Frontend",
		items: ["React", "HTML5", "CSS3", "Tailwind"],
	},
	{
		label: "Backend",
		items: ["Node.js", "Express", "Django"],
	},
	{
		label: "AI / ML",
		items: ["NumPy", "Pandas"],
	},
	{
		label: "Languages",
		items: ["JavaScript", "Python", "Java", "C"],
	},
	{
		label: "Database",
		items: ["MySQL", "MongoDB", "SQLite"],
	},
	{
		label: "Tools",
		items: ["Git", "GitHub", "VS Code"],
	},
];

const ALL_ICONS = [
	<FaReact />,
	<FaHtml5 />,
	<FaCss3Alt />,
	<SiTailwindcss />,
	<FaNodeJs />,
	<SiExpress />,
	<SiDjango />,
	<SiNumpy />,
	<SiPandas />,
	<SiJavascript />,
	<SiPython />,
	<FaJava />,
	<SiC />,
	<SiMysql />,
	<SiMongodb />,
	<SiSqlite />,
	<FaGitAlt />,
	<FaGithub />,
	<VscVscode />,
];

const Divider = () => (
	<span className="text-cyan-400 mx-3 text-lg select-none">⚛</span>
);

const MarqueeRow = ({ reverse = false }) => (
	<div className="flex overflow-hidden whitespace-nowrap w-full">
		<div
			style={{
				display: "flex",
				alignItems: "center",
				animation: `${reverse ? "marqueeReverse" : "marquee"} 30s linear infinite`,
				willChange: "transform",
			}}
		>
			{[...ALL_ICONS, ...ALL_ICONS, ...ALL_ICONS].map((item, i) => (
				<span
					key={i}
					className="inline-flex items-center text-4xl text-white/30 grayscale mx-2"
				>
					{item}
					<Divider />
				</span>
			))}
		</div>
	</div>
);

export default function Skills() {
	const gridRef = useRef(null);

	return (
		<section id="skills" className="relative w-full py-20 overflow-hidden">
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

			{/* Global spotlight */}
			<GlobalSpotlight
				gridRef={gridRef}
				glowColor="0, 245, 255"
				spotlightRadius={300}
			/>

			<div className="relative z-20 flex flex-col gap-10">
				{/* Header */}
				<div className="text-center px-6">
					<p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono mb-3">
						What I work with
					</p>
					<h2 className="text-white text-4xl md:text-5xl font-bold">
						My{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141e3a] via-[#6b5cff] to-[#141e3a]">
							Skills
						</span>
					</h2>
				</div>
				{/* Top marquee */}
				<div
					className="relative z-10"
					style={{
						transform: "rotate(20deg)",
						transformOrigin: "left",
					}}
				>
					<MarqueeRow />
				</div>
				{/* Cards grid */}
				<div
					ref={gridRef}
					className="bento-section grid gap-4 px-6 max-w-5xl mx-auto w-full relative z-20"
					style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
				>
					{SKILLS.map((skill, i) => {
						const spans = [
							"col-span-6 sm:col-span-3 lg:col-span-2",
							"col-span-6 sm:col-span-3 lg:col-span-2",
							"col-span-6 sm:col-span-6 lg:col-span-2",
							"col-span-6 sm:col-span-3 lg:col-span-3",
							"col-span-6 sm:col-span-3 lg:col-span-2",
							"col-span-6 sm:col-span-6 lg:col-span-1",
						];

						return (
							<ParticleCard
								key={i}
								className={`card card--border-glow p-6 rounded-2xl border border-white/10 bg-[#060010]/80 backdrop-blur-sm ${spans[i]}`}
								style={{
									"--glow-x": "50%",
									"--glow-y": "50%",
									"--glow-intensity": "0",
									"--glow-radius": "200px",
									minHeight: "160px",
								}}
								glowColor="0, 245, 255"
								enableTilt={true}
								enableMagnetism={true}
								clickEffect={true}
								particleCount={8}
							>
								{/* Category label */}
								<p className="text-cyan-400 text-xs tracking-[0.2em] uppercase font-mono mb-4">
									{skill.label}
								</p>

								{/* Skill tags */}
								<div className="flex flex-wrap gap-2">
									{skill.items.map((item, j) => (
										<span
											key={j}
											className="px-3 py-1 rounded-full text-sm text-white/70 border border-white/10 font-mono hover:border-cyan-400/40 hover:text-cyan-400 transition-colors duration-200"
										>
											{item}
										</span>
									))}
								</div>
							</ParticleCard>
						);
					})}
				</div>
				{/* Bottom marquee */}
				<div
					className="relative z-10"
					style={{
						transform: "rotate(-20deg)",
						transformOrigin: "left",
					}}
				>
					<MarqueeRow reverse />
				</div>{" "}
			</div>
		</section>
	);
}
