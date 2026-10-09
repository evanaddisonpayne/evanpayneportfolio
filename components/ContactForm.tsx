"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { Eyebrow } from "./ui";

const topics = ["Brand and positioning", "Growth and demand", "Hiring me", "Something else"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.contactEndpoint) {
      setState("error");
      return;
    }
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="sent" role="status">
        <Eyebrow>Sent</Eyebrow>
        <p className="h2">Got it. Pour something, I’ll be in&nbsp;touch.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="two">
        <div className="field">
          <label htmlFor="name">Your name <span className="req">Required</span></label>
          <input id="name" name="name" autoComplete="name" placeholder="First and last" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email <span className="req">Required</span></label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="So I can write back" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="company">Company or role</label>
        <input id="company" name="company" autoComplete="organization" placeholder="Where you work, or what you do" />
      </div>
      <fieldset className="field">
        <legend>What’s this about?</legend>
        <div className="choice">
          {topics.map((t, i) => (
            <label key={t}>
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="message">The short version <span className="req">Required</span></label>
        <textarea id="message" name="message" placeholder="What’s going on, what you’ve tried, and what good would look like." required />
      </div>
      <div className="submit-row">
        <button type="submit" className="btn btn-signal" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
        <p className="italic">No newsletter sign-up, no follow-up sequence. Just a reply.</p>
      </div>
      {state === "error" && (
        <p className="form-note" role="alert">
          {site.contactEndpoint
            ? "That didn’t go through. Try again in a minute."
            : "This form isn’t switched on yet. Check back soon."}
        </p>
      )}
    </form>
  );
}
