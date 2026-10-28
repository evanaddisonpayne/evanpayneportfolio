"use client";

import { useState, type FormEvent } from "react";
import { BUDGET, ROOMING, SPLURGE } from "@/lib/tanyasbach";
import { Hibiscus } from "./Art";
import { Marquee, Neon } from "./Breaks";
import { Chips, NameField, SubmitRow, useSend } from "./Forms";

export default function RsvpView() {
  return (
    <>
      <section className="section light tb-pagehead tb-bg-blush">
        <div className="pattern pattern-passport" aria-hidden />
        <Hibiscus className="tb-head-flower" />
        <div className="wrap">
          <p className="eyebrow">Paso uno</p>
          <h1 className="h1">
            ¿Estás dentro? <span className="italic">Are you in?</span>
          </h1>
          <p className="lede">The basics we need to price flights, split rooms, and book dinners for the whole group. Two minutes, tops.</p>
          <div className="tb-jump">
            <a href="#rsvp">RSVP</a>
            <a href="#budget">Budget, privately</a>
          </div>
          <NameField compact />
        </div>
      </section>
      <Marquee a={["¿Estás dentro?", "RSVP", "Pasaporte", "Maleta", "Bikini", "Vamos"]} b={["Tanya ’27", "Mayo", "Sol y salsa", "La novia"]} />
      <RsvpForm />
      <Neon kicker="Presupuesto" line="Sin juicio. No judgment, just vibes." />
      <BudgetForm />
    </>
  );
}

function RsvpForm() {
  const { send, sending, status } = useSend("rsvp");
  const [room, setRoom] = useState<string[]>([]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    send({ ...fd, room: room[0] || "" });
  };
  return (
    <section className="section light tb-form-sec" id="rsvp">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">RSVP · travel details</p>
          <h2 className="h2">The boring bits that make the fun bits happen.</h2>
        </div>
        <form className="tb-form card" onSubmit={onSubmit}>
          <div className="tb-grid2">
            <Field id="r-email" label="Email" name="email" type="email" required />
            <Field id="r-phone" label="Phone, for the group chat" name="phone" type="tel" />
            <Field id="r-air" label="Home airport" name="airport" placeholder="e.g. ORD, JFK, ATL" />
            <Field id="r-pass" label="Passport expires" name="passport" type="month" />
          </div>
          <p className="tb-note">
            Three of the four options need a passport, and the cruise strongly recommends one. We&apos;re planning on six months of validity past the trip. So if yours runs out
            before <strong>December 2027</strong>, renew it this winter.
          </p>
          <div className="tb-field">
            <p className="tb-label">Rooming</p>
            <Chips label="Rooming" options={ROOMING} value={room} onChange={setRoom} multi={false} />
          </div>
          <div className="tb-grid2">
            <Field id="r-mate" label="Roommate wish" name="roommate" />
            <Field id="r-diet" label="Dietary needs or allergies" name="dietary" />
          </div>
          <div className="tb-field">
            <label className="tb-label" htmlFor="r-notes">
              Anything else?
            </label>
            <textarea className="tb-input" id="r-notes" name="notes" rows={3} />
          </div>
          <SubmitRow label="¡Estoy dentro! I'm in" sending={sending} status={status} />
        </form>
      </div>
    </section>
  );
}

function BudgetForm() {
  const { send, sending, status } = useSend("budget");
  const [amt, setAmt] = useState(BUDGET.start);
  const [splurge, setSplurge] = useState<string[]>([]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ budget: amt, splurge });
  };
  const label = `$${amt.toLocaleString()}${amt >= BUDGET.max ? "+" : ""}`;
  return (
    <section className="section light tb-form-sec tb-bg-sea" id="budget">
      <div className="wrap tb-budget-wrap">
        <div className="section-head">
          <p className="eyebrow">Presupuesto · just between us</p>
          <h2 className="h2">
            What feels comfortable? <span className="italic">No judgment.</span>
          </h2>
          <p className="lede">
            For the house, food, and activities, <strong>not flights</strong>. Only the planners see individual answers. Everyone else just
            sees how many people fall in each range.
          </p>
        </div>
        <form className="tb-form tb-budget" onSubmit={onSubmit}>
          <p className="tb-budget-num" aria-live="polite">
            {label}
          </p>
          <input
            type="range"
            className="tb-range"
            min={BUDGET.min}
            max={BUDGET.max}
            step={BUDGET.step}
            value={amt}
            onChange={(e) => setAmt(Number(e.target.value))}
            aria-label="Budget comfort in US dollars, excluding flights"
          />
          <div className="tb-range-ends">
            <span>${BUDGET.min.toLocaleString()}</span>
            <span>${BUDGET.max.toLocaleString()}+</span>
          </div>
          <div className="tb-field">
            <p className="tb-label">Worth splurging on</p>
            <Chips label="Worth splurging on" options={SPLURGE} value={splurge} onChange={setSplurge} />
          </div>
          <SubmitRow label="Save privately" sending={sending} status={status} />
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
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="tb-field">
      <label className="tb-label" htmlFor={id}>
        {label}
      </label>
      <input className="tb-input" id={id} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}
