import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";
import { Eyebrow, Pattern } from "@/components/ui";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <>
      <section className="section dark" aria-labelledby="work-title">
        <Pattern kind="passport" />
        <div className="wrap">
          <Eyebrow>Work</Eyebrow>
          <h1 className="h1" id="work-title" style={{ marginTop: 20, maxWidth: 980 }}>
            Ten years of work, sorted by the problem it solved instead of the logo on the&nbsp;door.
          </h1>
          <p className="lede" style={{ marginTop: 28 }}>
            Some of these are names you know and some sit under an NDA, but every one is real and every number is one I can stand behind. Where I
            led, I say so. Where I didn’t, I say that&nbsp;too.
          </p>
          <WorkGrid />
        </div>
      </section>
      <Footer />
    </>
  );
}
