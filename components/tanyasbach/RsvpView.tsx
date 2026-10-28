"use client";

import { useState, type FormEvent } from "react";
import { BASE, BUDGET_CHOICES, NO_REFUND, PASSPORT_CHOICES, ROOMING, SPLURGE } from "@/lib/tanyasbach";
import { Hibiscus } from "./Art";
import { Chips, Question, SubmitBlock, Success, YourName, useSubmitAll, type Part, type Problem } from "./Forms";
import { useTb } from "./TbProvider";
import { firstName } from "./util";

export default function RsvpView() {
  return (
    <>
      <section className="section light tb-pagehead tb-bg-blush">
        <div className="pattern pattern-passport" aria-hidden />
        <Hibiscus className="tb-head-flower" />
        <div className="wrap">
          <p className="eyebrow">Step 1 of 2 · RSVP</p>
          <h1 className="h1">
            ¿Estás dentro? <span className="italic">Are you in?</span>
          </h1>
          <p className="lede">A few details so we can plan rooms, flights and dinners. One page, one button. About 2 minutes.</p>
        </div>
      </section>
      <RsvpForm />
    </>
  );
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RsvpForm() {
  const { name } = useTb();
  const { run, state, problems, edit } = useSubmitAll();
  const [passport, setPassport] = useState<string[]>([]);
  const [room, setRoom] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [splurge, setSplurge] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const issues: Problem[] = [];
    if (!EMAIL.test(String(fd.email || "").trim())) issues.push({ msg: "Your email", focus: "r-email" });
    if (!passport.length) issues.push({ msg: "Your passport", focus: "q-passport" });
    if (!budget.length) issues.push({ msg: "Your budget (“Rather not say” is fine)", focus: "q-budget" });
    if (!agreed) issues.push({ msg: "Tick the box to agree to the money rule", focus: "r-agree" });

    const notes = String(fd.notes || "").trim();
    const parts: Part[] = [
      {
        kind: "rsvp",
        fields: { ...fd, passport: passport[0] || "", room: room[0] || "", notes: `[Agreed: no refunds after paying or committing]${notes ? " " + notes : ""}` },
      },
    ];
    const b = BUDGET_CHOICES.find((c) => c.label === budget[0]);
    if (b && b.value > 0) parts.push({ kind: "budget", fields: { budget: b.value, splurge } });
    run(parts, issues);
  };

  if (state === "done")
    return (
      <section className="section light tb-form-sec">
        <div className="wrap">
          <Success
            title={`You're in, ${firstName(name)}.`}
            body="One more step: vote on where we go, which dates, and what we do. It takes about 3 minutes."
            next={{ href: `${BASE}/vote`, label: "Next: vote" }}
            onEdit={edit}
          />
        </div>
      </section>
    );

  return (
    <section className="section light tb-form-sec">
      <div className="wrap">
        <form className="tb-form tb-form-long card" onSubmit={onSubmit} noValidate>
          <YourName />
          <div className="tb-grid2">
            <Field id="r-email" label="Email" name="email" type="email" autoComplete="email" inputMode="email" />
            <Field id="r-phone" label="Phone, for the group chat" name="phone" type="tel" autoComplete="tel" optional />
          </div>
          <Field id="r-air" label="Closest airport (the city is fine)" name="airport" placeholder="e.g. Chicago, or ORD" optional />

          <Question n={1} id="q-passport" title="Your passport" hint="Most of our options need one that's valid through December 2027.">
            <Chips label="Your passport" options={PASSPORT_CHOICES} value={passport} onChange={setPassport} multi={false} />
          </Question>

          <Question n={2} title="Rooming" hint="Optional. We'll do our best.">
            <Chips label="Rooming" options={ROOMING} value={room} onChange={setRoom} multi={false} />
            <div className="tb-grid2">
              <Field id="r-mate" label="Who you'd like to room with" name="roommate" optional />
              <Field id="r-diet" label="Food allergies or diet" name="dietary" optional />
            </div>
          </Question>

          <Question
            n={3}
            id="q-budget"
            title="What's a comfortable budget?"
            hint="For the house, food and activities, not flights. Only Evan and Tanya see your answer. Everyone else sees totals."
          >
            <Chips label="Comfortable budget" options={BUDGET_CHOICES.map((c) => c.label)} value={budget} onChange={setBudget} multi={false} />
            <p className="tb-sublabel">
              Worth spending more on <span className="tb-optional">(optional)</span>
            </p>
            <Chips label="Worth spending more on" options={SPLURGE} value={splurge} onChange={setSplurge} />
          </Question>

          <div className="tb-field">
            <label className="tb-label" htmlFor="r-notes">
              Anything else we should know? <span className="tb-optional">(optional)</span>
            </label>
            <textarea className="tb-input" id="r-notes" name="notes" rows={3} />
          </div>

          <label className="tb-agree" htmlFor="r-agree">
            <input id="r-agree" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              <strong>I understand the money rule.</strong> {NO_REFUND}
            </span>
          </label>

          <SubmitBlock label="Send my RSVP" state={state} problems={problems} />
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  placeholder,
  optional,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  return (
    <div className="tb-field">
      <label className="tb-label" htmlFor={id}>
        {label} {optional && <span className="tb-optional">(optional)</span>}
      </label>
      <input className="tb-input" id={id} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} />
    </div>
  );
}
