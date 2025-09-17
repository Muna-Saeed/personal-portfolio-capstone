import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import About from "../components/About";
import ContactForm from "../components/ContactForm";
import ProjectsPage from "./projects/page";

export default function Home() {
  return (
    <div id="home" className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ContactForm />
        <ProjectsPage />
      </main>
    </div>
  );
}
