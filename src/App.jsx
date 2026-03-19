import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
	const [loading, setLoading] = useState(true);

	const handleDone = () => setLoading(false);

	return (
		<>
			{loading && <Loader onComplete={handleDone} />}
			<div style={{ display: loading ? "none" : "block" }}>
				<Navbar startAnimation={!loading} />
				<Hero startAnimation={!loading} />
				<About />
				<Education />
				<Skills />
				<Projects />
				<Contact />
			</div>
		</>
	);
}
