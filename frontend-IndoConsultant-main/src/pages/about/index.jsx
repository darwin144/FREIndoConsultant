import AboutCompany from "./about-company";
import Quotes from "./ceo-quotes";
import Content from "./content";
import Values from "./our-values";

export default function About() {
  return (
    <>
      <main className="relative isolate">
        <AboutCompany />
        <Content />
        <Quotes />
        <Values />
      </main>
    </>
  );
}
