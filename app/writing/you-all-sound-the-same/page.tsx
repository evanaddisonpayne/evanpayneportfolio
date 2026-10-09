import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Share from "@/components/Share";
import { Eyebrow, Pattern, Tarot } from "@/components/ui";

const title = "You all sound the same. It’s costing millions.";
const deck = "The Work Tech industry has a sameness problem. And no, another messaging workshop isn’t going to fix it.";

export const metadata: Metadata = { title, description: deck };

export default function Article() {
  return (
    <>
      <section className="section dark">
        <Pattern kind="rays" />
        <div className="wrap article-head">
          <div>
            <Eyebrow>Writing   ·   Positioning</Eyebrow>
            <h1 className="h1">{title}</h1>
            <p className="lede">{deck}</p>
            <div className="byline">
              <img src="/art/seal.webp" alt="" width={44} height={44} />
              <div>
                <p className="name">Evan Addison Payne</p>
                <p className="meta">April 2026&nbsp;&nbsp;·&nbsp;&nbsp;6 min read</p>
              </div>
            </div>
          </div>
          <Tarot src="/art/tarot_1.webp" alt="Tarot card (I), The Crowd" />
        </div>
      </section>

      <article className="section light">
        <div className="wrap">
          <div className="prose">
            <p className="lead">I have 14 browser tabs open right now. Each one is a different Work Tech company’s homepage. And I need you to understand something: competitive audits are what I do. This is a core part of my job at The Starr Conspiracy. And I just clicked on the wrong tab three times in a row. Not because I’m careless. Because these companies are wearing each other’s clothes. Same hero headline about “empowering people.” Same stock photo of a team laughing at a laptop like someone just told the funniest joke in corporate history. Same blue-teal-purple palette. Same promises. I’m toggling between companies with genuinely different products, different capabilities, completely different reasons to exist, and from the outside, they might as well be the same company in 14 different fonts.</p>
            <p>It’s almost funny. Almost. Until you realize how much money is being lit on fire because of it.</p>

            <h2>The Sameness Tax</h2>
            <p>Here’s what nobody frames correctly: when every company in your category sounds the same, you don’t have a branding problem. You have a revenue problem wearing a branding costume. Think about what actually happens when a buyer can’t tell you apart from the competition. They don’t study harder. They don’t dig deeper into your product pages. They default to two tiebreakers: price, and whoever they’ve heard of. That’s it. That’s the whole decision framework.</p>
            <p>Your entire go-to-market engine, the positioning work, the content program, the ABM campaigns, the $200K event sponsorship where you gave away branded socks, all of it collapses into “who’s cheaper” and “who do I already know.”</p>
            <p>I call this the sameness tax. You’re paying full price for marketing that performs at a fraction of its capacity because your brand doesn’t give buyers a reason to prefer you.</p>
            <p className="big">Not choose you. Prefer you.</p>
            <p>Those are very different verbs and the gap between them is where your pipeline goes to die.</p>

            <div className="exhibit">
              <p className="caps">Exhibit A</p>
              <p style={{ marginTop: 8, fontSize: 15 }}>Real taglines from real Work Tech companies. Go ahead, try to match them.</p>
              <ul>
                <li>“Empowering people to do their best work”</li>
                <li>“Unlock the full potential of your workforce”</li>
                <li>“The platform that puts people first”</li>
                <li>“Helping organizations build a better workplace”</li>
                <li>“Where people thrive and business grows”</li>
              </ul>
              <p className="after">You can’t match them. Neither can your buyers. And if one of those is yours? Sit with that for a second.</p>
            </div>

            <h2>How We Got Here</h2>
            <p>I’ve spent enough time inside the brand strategy process to know exactly how this happens, and I want to be clear: it’s not because marketers are lazy or dumb. It’s because the system is beautifully, almost elegantly designed to produce this exact outcome.</p>
            <p>The story goes like this.</p>
            <p>A company raises a round, hires a new CMO, or finally admits their website looks like it was built when people still said “digital transformation” with a straight face. They decide it’s time for a rebrand. They hire an agency or assemble an internal team and kick off a process that involves stakeholder interviews, competitive audits, and messaging workshops. There are sticky notes. There is a Miro board the size of a football field. Somewhere around week six, everyone agrees on language that is technically accurate, strategically defensible, and completely indistinguishable from every other company in the category.</p>
            <p>Why? Because the process optimizes for internal consensus, not external differentiation. Every stakeholder gets their fingerprints on the messaging. Legal scrubs the edges off. The CEO adds “and AI” to the value prop because they just got back from a conference. By the time it ships, it’s been sanded down to something no one objects to. Not coincidentally, it’s also something no one remembers.</p>
            <blockquote>The most dangerous phrase in brand strategy isn’t “we need to be more innovative.” It’s “I think everyone can live with this.”</blockquote>
            <p>The moment you hear that sentence in a room, you’ve already lost. “Everyone can live with this” is the sound of differentiation dying. It means you’ve built messaging by committee, which is like assembling a playlist by committee: technically inoffensive, but nobody’s turning it up.</p>

            <h2>The AI Accelerant</h2>
            <p>Now here’s the part that should genuinely worry you. AI is making the sameness problem exponentially worse, and the people most excited about AI in marketing are often the ones least aware of it.</p>
            <p>When every company uses the same LLMs to generate their website copy, blog posts, social content, and sales decks, the output converges toward the median. Toward the average. Toward exactly what a language model thinks B2B copy should sound like based on all the B2B copy it was trained on, which, as we’ve established, already sounds the same. It’s a feedback loop of mediocrity: AI-generated copy trained on undifferentiated copy producing more undifferentiated copy. A photocopier pointed at a mirror.</p>
            <p>I should be transparent here. I work at an agency that literally rebuilt itself as AI-native. We use AI every single day. I am not the “AI is coming for your job” guy yelling from a soapbox. I’m the guy who watched what happens when companies use AI as a replacement for brand thinking instead of an accelerant for it. The companies that figured out something sharp and genuinely differentiated to say and then pointed AI at it? They’re winning. The companies that skipped the hard part and went straight to “generate 40 blog posts a month”? They’re just producing noise at a higher volume. Congrats, your content engine is working perfectly, it’s just that nobody cares what it’s saying.</p>

            <h2>The Test</h2>
            <p>If you’ve read this far, you’re doing one of two things: nodding along, or mentally composing a defense of your own brand. If it’s the second one, and I say this with love, try this before you close the tab.</p>
            <p>Go to your homepage. Right now. Read the hero headline and the three or four sentences underneath it. Then ask yourself one question:</p>
            <div className="question">
              <p className="caps">The question</p>
              <p className="q">Could a competitor paste this exact copy on their site and have it be equally true?</p>
            </div>
            <p>If the answer is yes, and for most Work Tech companies it absolutely is, then you don’t have a brand. You have a category description with your logo on it. Which is fine. It’s not a death sentence. But let’s call it what it is so we can actually do something about it.</p>
            <p>Because here’s what I see too often: companies treating a positioning problem like a demand gen problem. Pipeline’s soft? Must need more content. More campaigns. More spend. When the real issue is that nobody can tell you apart from the other four vendors on the shortlist. You’re not under-marketing. You’re under-differentiating. No amount of budget is going to fix that.</p>

            <h2>So What Do You Do About It</h2>
            <p>I’m going to keep this simple because I think the solution is simpler than people make it. Not easy. I didn’t say easy. Simple.</p>
            <ol className="steps">
              <li><span className="num">(I)</span><p>Say something only you can say. Not something that’s true of you. Something that’s true of only you. If your competitor can claim the same thing with a straight face, it’s not differentiation, it’s a category table stake. Find the thing about your product, your approach, your worldview, or your customer outcomes that is genuinely yours and build your entire narrative around it. One sharp idea beats five safe messages every single time. Every. Single. Time.</p></li>
              <li><span className="num">(II)</span><p>Kill the consensus process. I don’t mean ignore stakeholder input. I mean stop letting brand strategy become a democracy. The best positioning I’ve ever worked on had a single decision-maker with a clear vision and the spine to make a call. The worst had twelve people with equal votes and a shared Google Doc that read like it was written by a polite robot having an identity crisis.</p></li>
              <li><span className="num">(III)</span><p>Let your brand have an actual opinion. The fastest path to differentiation is to believe something about your market and say it out loud. Not buried in a thought leadership white paper that takes nine months to produce and gets 200 downloads. On your homepage. In your pitch deck. In the first 30 seconds of a sales call. Work Tech companies are sitting on strong, specific, sometimes genuinely provocative points of view about the future of work, and then they hide all of it behind corporate pablum because they’re afraid of alienating a buyer who, I promise you, was never going to buy from them anyway.</p></li>
            </ol>
            <p>Look. Differentiation is scary. I get it. It means making a choice, which means closing a door, which means someone on the leadership team is going to raise their hand and say “but what about the enterprise buyer who needs to hear us say synergy?” And you’re going to have to smile and be okay with that. Because the alternative, sounding exactly like everyone else, isn’t safe. It’s invisible.</p>
            <p className="closer">And invisible is the most expensive thing a brand can be.</p>
          </div>

          <div className="signoff">
            <div>
              <p className="who"><img src="/art/seal.webp" alt="" width={36} height={36} />Evan Addison Payne</p>
              <p className="filed">Filed under&nbsp;&nbsp;Positioning&nbsp;&nbsp;·&nbsp;&nbsp;Brand&nbsp;&nbsp;·&nbsp;&nbsp;AI</p>
            </div>
            <Share />
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
