"use client";
import { useState } from "react";

export default function AIDemoLandingPage() {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    projectType: "",
    websiteUrl: "",
    websiteProblem: "",
    companyName: "",
    location: "",
    phone: "",
    industry: "",
    services: "",
    coreMessage: "",
    contactAction: "",
    trustElements: [],
    googleRating: "",
    yearsExperience: "",
    brandColor: "",
    hasImages: "",
    style: [],
    additionalNotes: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArrayField(field, value) {
    setForm((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }

  function selectPath(value) {
    setPath(value);
    updateField("projectType", value);
  }

  function handleStepOne(e) {
    e.preventDefault();
    if (!path) return;
    if (path === "bestehende_website" && !form.websiteUrl) return;
    setStep(2);
  }

  function handleStepTwo(e) {
    e.preventDefault();
    setStep(3);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Etwas ist schiefgelaufen. Bitte versuchen Sie es nochmals.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const trustOptions = [
    "Google-Bewertungen",
    "Kundenreferenzen",
    "Vorher/Nachher-Bilder",
    "Zertifikate / Markenpartner",
    "Jahre Erfahrung",
    "Bekannte Kunden / Projekte",
    "Familiengeführter Betrieb",
    "Keine vorhanden",
  ];

  const styleOptions = [
    "Modern", "Traditionell",
    "Premium", "Bodenständig",
    "Persönlich", "Professionell",
    "Direkt", "Emotional",
  ];

  const websiteProblems = [
    "Wirkt veraltet",
    "Zu wenig Anfragen",
    "Unklarer Aufbau",
    "Nicht gut auf Handy",
    "Zu wenig Vertrauen",
  ];

  const demoItems = [
    { title: "Handwerk Demo", tag: "Mehr Anfragen", bg: "from-[#1f4e3d] to-[#dfe9df]", headline: "Saubere Arbeit. Klare Termine." },
    { title: "Restaurant Demo", tag: "Mehr Buchungen", bg: "from-[#111111] to-[#f0d7b8]", headline: "Reservieren. Geniessen. Wiederkommen." },
    { title: "Reinigung Demo", tag: "Mehr Offerten", bg: "from-[#2f5f73] to-[#dceff3]", headline: "Professionelle Reinigung auf einen Blick." },
    { title: "Garage Demo", tag: "Mehr Anrufe", bg: "from-[#252525] to-[#e6e1d8]", headline: "Service, MFK und Reparaturen." },
    { title: "Beauty Demo", tag: "Mehr Termine", bg: "from-[#6e3d52] to-[#f3dce6]", headline: "Behandlungen sichtbar schön präsentiert." },
    { title: "Beratung Demo", tag: "Mehr Vertrauen", bg: "from-[#243b53] to-[#d8e2ec]", headline: "Kompetenz klar erklärt." },
  ];

  const inputClass = "w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d] bg-white text-[#171717]";
  const labelClass = "block text-sm font-bold mb-2";
  const steps = ["Situation", "Details", "Kontakt"];

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] text-[#171717] flex items-center justify-center px-4">
        <div className="max-w-xl bg-white rounded-[28px] shadow-xl border border-[#e6e1d8] p-8 md:p-12 text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-[#1f4e3d] text-white flex items-center justify-center text-2xl font-bold">✓</div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-[-0.06em] leading-none mb-5">
            Ihre Anfrage ist angekommen.
          </h1>
          <p className="text-[#666666] text-lg mb-8">
            Vielen Dank. Wir erstellen Ihre persönliche Website-Demo und senden sie direkt per E-Mail zu.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setPath(""); }}
            className="rounded-full bg-[#1f4e3d] text-white px-6 py-3 font-bold hover:bg-[#16382c] transition"
          >
            Neue Demo starten
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">

      <header className="py-6">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] flex justify-between items-center gap-6">
          <a href="#" className="text-2xl font-extrabold tracking-[-0.05em]">DemoSite.ch</a>
          <nav className="hidden md:flex items-center gap-7 text-[#666666] text-sm">
            <a href="#ablauf">Ablauf</a>
            <a href="#vorteile">Vorteile</a>
            <a href="#demo">Demo starten</a>
          </nav>
          <a href="#demo" className="rounded-full bg-[#1f4e3d] text-white px-5 py-3 font-bold hover:bg-[#16382c] transition">
            Kostenlose Demo
          </a>
        </div>
      </header>

      <section className="pt-12 pb-24 md:pt-20 md:pb-28">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] grid md:grid-cols-[1.02fr_0.98fr] gap-12 items-center">
          <div>
            <h1 className="text-[42px] md:text-[72px] leading-[0.95] tracking-[-0.075em] font-extrabold mb-6">
              Wir erstellen Ihre neue Website.
            </h1>
            <p className="text-2xl md:text-3xl text-[#171717] font-semibold tracking-[-0.04em] leading-tight max-w-2xl mb-8">
              Ihre neue Website zuerst sehen. Dann selbst entscheiden.
            </p>
            <div className="grid gap-3 text-base md:text-lg text-[#666666]">
              <span>✓ Kostenlos & unverbindlich</span>
              <span>✓ Persönlicher Entwurf</span>
              <span>✓ Je mehr Angaben, desto genauer</span>
            </div>
          </div>

          <div id="demo" className="bg-white border border-[#e6e1d8] rounded-[28px] shadow-xl p-6 md:p-8">

            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-6">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 transition ${
                    step > i + 1 ? "bg-[#1f4e3d] text-white" :
                    step === i + 1 ? "bg-[#1f4e3d] text-white" :
                    "bg-[#e6e1d8] text-[#999]"
                  }`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-bold hidden sm:block ${step === i + 1 ? "text-[#171717]" : "text-[#999]"}`}>{s}</span>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-[2px] rounded-full ${step > i + 1 ? "bg-[#1f4e3d]" : "bg-[#e6e1d8]"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <p className="text-sm font-bold text-[#1f4e3d] mb-2">Kostenlose Demo starten</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.05em] leading-none mb-3">
                {step === 1 && "Was brauchen Sie?"}
                {step === 2 && "Demo personalisieren"}
                {step === 3 && "Wohin senden wir die Demo?"}
              </h2>
              <p className="text-[#666666] text-sm">
                {step === 1 && "Bestehende Website verbessern oder neu starten?"}
                {step === 2 && "Je mehr Sie angeben, desto persönlicher wird Ihre Demo. Alles optional."}
                {step === 3 && "Wir senden die Demo direkt per E-Mail zu."}
              </p>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleStepOne} className="space-y-5">
                <div className="grid gap-3">
                  <button type="button" onClick={() => selectPath("bestehende_website")}
                    className={`text-left rounded-2xl border p-5 transition ${path === "bestehende_website" ? "border-[#1f4e3d] bg-[#f1f5f2]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                    <strong className="block text-lg mb-1">Ich habe bereits eine Website</strong>
                    <span className="text-[#666666] text-sm">Meine bestehende Website soll moderner und besser auf Anfragen ausgerichtet werden.</span>
                  </button>
                  <button type="button" onClick={() => selectPath("neue_website")}
                    className={`text-left rounded-2xl border p-5 transition ${path === "neue_website" ? "border-[#1f4e3d] bg-[#f1f5f2]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                    <strong className="block text-lg mb-1">Ich brauche eine neue Website</strong>
                    <span className="text-[#666666] text-sm">Ich habe noch keine Website oder möchte komplett neu starten.</span>
                  </button>
                </div>

                {path === "bestehende_website" && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Ihre aktuelle Website</label>
                      <input type="url" required placeholder="https://www.ihrefirma.ch"
                        value={form.websiteUrl} onChange={(e) => updateField("websiteUrl", e.target.value)}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Was stört Sie aktuell am meisten?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {websiteProblems.map((p) => (
                          <button key={p} type="button"
                            onClick={() => updateField("websiteProblem", form.websiteProblem === p ? "" : p)}
                            className={`text-left rounded-xl border px-3 py-2 text-sm font-semibold transition ${form.websiteProblem === p ? "border-[#1f4e3d] bg-[#f1f5f2] text-[#1f4e3d]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button disabled={!path}
                  className="w-full rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition disabled:opacity-50">
                  Weiter zur Personalisierung →
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleStepTwo} className="space-y-5">

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Firmenname</label>
                    <input placeholder="Muster GmbH" value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Ort / Region</label>
                    <input placeholder="Zürich" value={form.location}
                      onChange={(e) => updateField("location", e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Telefonnummer <span className="text-[#1f4e3d] font-normal">— für den Anruf-Button in der Demo</span>
                  </label>
                  <input type="tel" placeholder="+41 44 123 45 67" value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Branche</label>
                  <select value={form.industry} onChange={(e) => updateField("industry", e.target.value)} className={inputClass}>
                    <option value="">Bitte wählen</option>
                    <option>Handwerk / Bau</option>
                    <option>Reinigung</option>
                    <option>Restaurant / Café</option>
                    <option>Garage / Auto</option>
                    <option>Beauty / Coiffeur</option>
                    <option>Beratung / Dienstleistung</option>
                    <option>Fitness / Gesundheit</option>
                    <option>Immobilien / Verwaltung</option>
                    <option>Online Shop / Retail</option>
                    <option>Andere Branche</option>
                  </select>
                </div>

                {/* SIMPLIFIED: one field for services */}
                <div>
                  <label className={labelClass}>Ihre wichtigsten Leistungen</label>
                  <input placeholder="z.B. Haarschnitte, Bartrasur, Pflegeprodukte"
                    value={form.services} onChange={(e) => updateField("services", e.target.value)} className={inputClass} />
                </div>

                {/* SIMPLIFIED: single field replaces USP + coreMessage */}
                <div>
                  <label className={labelClass}>
                    Was macht Sie besonders? <span className="text-[#1f4e3d]">★ Wichtigste Frage</span>
                  </label>
                  <textarea rows="2"
                    placeholder='z.B. "Kein Termin nötig — einfach vorbeikommen am Goldbrunnenplatz."'
                    value={form.coreMessage} onChange={(e) => updateField("coreMessage", e.target.value)}
                    className={inputClass} />
                </div>

                {/* SIMPLIFIED: action replaces goal + contactMethod */}
                <div>
                  <label className={labelClass}>Was soll ein Besucher als Erstes tun?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Anrufen", "WhatsApp schreiben", "Offerte anfragen", "Termin buchen", "Vorbeikommen", "Bewerben"].map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => updateField("contactAction", opt)}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${form.contactAction === opt ? "border-[#1f4e3d] bg-[#f1f5f2] text-[#1f4e3d]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STRUCTURED trust elements */}
                <div>
                  <label className={labelClass}>Welche Vertrauenselemente dürfen wir zeigen?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {trustOptions.map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => toggleArrayField("trustElements", opt)}
                        className={`text-left rounded-xl border px-3 py-2 text-sm font-semibold transition ${form.trustElements.includes(opt) ? "border-[#1f4e3d] bg-[#f1f5f2] text-[#1f4e3d]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Google rating only — no review count */}
                  {form.trustElements.includes("Google-Bewertungen") && (
                    <div className="mt-3">
                      <label className="block text-xs font-bold mb-1 text-[#555]">Ihre Durchschnittsnote</label>
                      <input placeholder="z.B. 4.9" value={form.googleRating}
                        onChange={(e) => updateField("googleRating", e.target.value)}
                        className={inputClass + " text-sm"} />
                    </div>
                  )}

                  {/* Years experience */}
                  {form.trustElements.includes("Jahre Erfahrung") && (
                    <div className="mt-3">
                      <label className="block text-xs font-bold mb-1 text-[#555]">Seit wie vielen Jahren tätig?</label>
                      <input placeholder="z.B. 8" value={form.yearsExperience}
                        onChange={(e) => updateField("yearsExperience", e.target.value)}
                        className={inputClass + " text-sm"} />
                    </div>
                  )}
                </div>

                {/* Style */}
                <div>
                  <label className={labelClass}>
                    Wie soll Ihre Website wirken? <span className="font-normal text-[#666]">(mehrere möglich)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {styleOptions.map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => toggleArrayField("style", opt)}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${form.style.includes(opt) ? "border-[#1f4e3d] bg-[#f1f5f2] text-[#1f4e3d]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand color */}
                <div>
                  <label className={labelClass}>
                    Firmenfarbe <span className="font-normal text-[#666]">(optional)</span>
                  </label>
                  <input placeholder='z.B. "Dunkelgrün", "Blau", "#003399"'
                    value={form.brandColor} onChange={(e) => updateField("brandColor", e.target.value)} className={inputClass} />
                </div>

                {/* Images */}
                <div>
                  <label className={labelClass}>Haben Sie eigene Fotos?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Ja, eigene Bilder vorhanden", "Nein, bitte Beispielbilder verwenden"].map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => updateField("hasImages", opt)}
                        className={`text-left rounded-xl border px-3 py-2 text-sm font-semibold transition ${form.hasImages === opt ? "border-[#1f4e3d] bg-[#f1f5f2] text-[#1f4e3d]" : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {form.hasImages === "Ja, eigene Bilder vorhanden" && (
                    <p className="mt-2 text-sm text-[#1f4e3d] font-semibold">
                      ✓ Wir melden uns per E-Mail um die Bilder abzuholen.
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Zusätzliche Hinweise <span className="font-normal text-[#666]">(optional)</span>
                  </label>
                  <textarea rows="2" placeholder="Gibt es etwas, das wir besonders beachten sollen?"
                    value={form.additionalNotes} onChange={(e) => updateField("additionalNotes", e.target.value)} className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="rounded-full border border-[#e6e1d8] px-6 py-4 font-bold hover:bg-[#ebe7de] transition">
                    Zurück
                  </button>
                  <button className="rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition">
                    Demo anfragen →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-2xl bg-[#f7f5f0] border border-[#e6e1d8] p-4 text-sm text-[#666666]">
                  Fast geschafft. Wir senden Ihnen die Demo direkt per E-Mail zu.
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Vorname</label>
                    <input required placeholder="Max" value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Nachname</label>
                    <input required placeholder="Muster" value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>E-Mail</label>
                  <input type="email" required placeholder="name@firma.ch" value={form.email}
                    onChange={(e) => updateField("email", e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button type="button" onClick={() => setStep(2)}
                    className="rounded-full border border-[#e6e1d8] px-6 py-4 font-bold hover:bg-[#ebe7de] transition">
                    Zurück
                  </button>
                  <button disabled={isSubmitting}
                    className="rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition disabled:opacity-60">
                    {isSubmitting ? "Wird gesendet..." : "Demo erhalten →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Demo previews */}
      <section className="py-20 bg-white border-y border-[#e6e1d8] overflow-hidden">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))]">
          <div className="max-w-3xl mb-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-4">
              Websites, die auf den ersten Blick überzeugen.
            </h2>
            <p className="text-lg text-[#666666]">Jede Demo wird individuell auf Branche, Ziel und Inhalte abgestimmt.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {demoItems.map((item) => (
              <div key={item.title} className="group rounded-[28px] bg-[#f7f5f0] border border-[#e6e1d8] overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className={`h-56 bg-gradient-to-br ${item.bg} p-5 flex items-center justify-center`}>
                  <div className="w-full rounded-2xl bg-white/85 backdrop-blur border border-white/60 shadow-lg p-5">
                    <div className="h-3 w-24 rounded-full bg-black/10 mb-5" />
                    <h3 className="text-3xl font-extrabold tracking-[-0.06em] leading-none mb-4">{item.headline}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-xl bg-black/10" />
                      <div className="h-12 rounded-xl bg-black/10" />
                      <div className="h-12 rounded-xl bg-black/10" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-xl tracking-[-0.04em]">{item.title}</h3>
                    <p className="text-[#666666] text-sm">Muster Vorschau</p>
                  </div>
                  <span className="rounded-full bg-[#1f4e3d] text-white text-xs font-bold px-3 py-2">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full overflow-hidden border-y border-[#e6e1d8] bg-[#f7f5f0] py-5">
          <div className="flex w-max gap-4 animate-[scrollDemo_38s_linear_infinite]">
            {[...demoItems, ...demoItems].map((item, index) => (
              <div key={`${item.title}-${index}`} className="w-[280px] rounded-2xl bg-white border border-[#e6e1d8] p-4 shadow-sm">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${item.bg} mb-4`} />
                <div className="flex items-center justify-between gap-3">
                  <strong className="tracking-[-0.03em]">{item.title}</strong>
                  <span className="text-xs text-[#666666]">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scrollDemo {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* How it works */}
      <section id="ablauf" className="py-20 bg-white border-y border-[#e6e1d8]">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))]">
          <div className="max-w-2xl mb-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-4">So funktioniert es</h2>
            <p className="text-lg text-[#666666]">Von der Anfrage bis zur fertigen Demo — in wenigen Minuten.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["1", "Situation wählen", "Bestehende Website verbessern oder neu starten — Sie entscheiden."],
              ["2", "Angaben ergänzen", "Je mehr Details, desto persönlicher und genauer wird Ihre Demo."],
              ["3", "Demo erhalten", "Sie bekommen den Entwurf per E-Mail und entscheiden unverbindlich."],
            ].map((item) => (
              <div key={item[0]} className="rounded-[24px] bg-[#f7f5f0] border border-[#e6e1d8] p-7">
                <div className="h-11 w-11 rounded-full bg-[#1f4e3d] text-white flex items-center justify-center font-extrabold mb-5">{item[0]}</div>
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] mb-3">{item[1]}</h3>
                <p className="text-[#666666]">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="vorteile" className="py-24 bg-[#f7f5f0] overflow-hidden">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] grid lg:grid-cols-[0.92fr_1.08fr] gap-12 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-[310px] sm:w-[360px] md:w-[410px] rounded-[48px] bg-[#111111] p-3 shadow-2xl rotate-[-2deg]">
              <div className="relative min-h-[650px] rounded-[38px] bg-gradient-to-br from-[#0f3b2a] via-[#15533b] to-[#0c2f22] overflow-hidden px-8 py-8 text-white">
                <div className="flex items-center justify-between text-sm font-bold text-white/90 mb-16">
                  <span>9:41</span>
                  <span className="tracking-[-0.03em]">DemoSite.ch</span>
                  <span>▰▰▰</span>
                </div>
                <div className="mx-auto mb-14 h-44 w-44 rounded-full border border-white/10 bg-white/8 flex items-center justify-center shadow-inner">
                  <svg width="110" height="110" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                    <rect x="18" y="76" width="15" height="25" rx="4" fill="#9AF5B3" />
                    <rect x="45" y="62" width="15" height="39" rx="4" fill="#9AF5B3" />
                    <rect x="72" y="43" width="15" height="58" rx="4" fill="#9AF5B3" />
                    <path d="M22 61L48 38L66 52L96 23" stroke="#B8FFC7" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M78 23H96V41" stroke="#B8FFC7" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-[42px] leading-[0.98] tracking-[-0.07em] font-extrabold mb-8">
                  Mehr Anfragen.<br />
                  <span className="text-[#9AF5B3]">Weniger Aufwand.</span>
                </h2>
                <p className="text-white/82 text-xl leading-relaxed">
                  Die meisten KMU-Websites verlieren täglich Kunden — nicht weil das Angebot schlecht ist, sondern weil die Website es nicht klar zeigt.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {[
              ["user", "Mehr Anfragen statt nur Besucher", "Ihre Website erklärt sofort, was Sie anbieten und warum Kunden genau Sie kontaktieren sollten."],
              ["eye", "Ein klarer erster Eindruck", "Innerhalb weniger Sekunden entscheidet sich, ob jemand bleibt oder geht. Ihre Seite wirkt sofort professionell."],
              ["target", "Kunden verstehen Ihr Angebot sofort", "Besucher sehen auf einen Blick, was Sie machen, für wen es ist und wie sie Sie erreichen."],
              ["rocket", "Sie sehen den Unterschied sofort", "Statt langen Erklärungen erhalten Sie eine konkrete Demo — die zeigt was möglich ist."],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-[28px] bg-white border border-[#e6e1d8] p-6 md:p-7 shadow-sm flex gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-[#edf5ed] text-[#1f4e3d] flex items-center justify-center shrink-0">
                  {icon === "user" && <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>}
                  {icon === "eye" && <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>}
                  {icon === "target" && <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>}
                  {icon === "rocket" && <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5" /><path d="M9 15 4 20" /><path d="M14.5 4.5c3.2-.9 5.1.2 5.1.2s1.1 1.9.2 5.1c-.9 3.2-4 6.4-7.1 8.1L6 11.2c1.7-3.1 5.3-5.8 8.5-6.7Z" /><circle cx="15" cy="9" r="2" /></svg>}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.055em] leading-tight mb-3">{title}</h3>
                  <p className="text-[#666666] text-lg leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] rounded-[34px] bg-[#111111] text-white p-8 md:p-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-5">Testen Sie es selbst.</h2>
            <p className="text-white/70 text-lg max-w-2xl">Kostenlos, unverbindlich — in wenigen Minuten ausgefüllt.</p>
          </div>
          <a href="#demo" className="rounded-full bg-white text-[#111111] px-7 py-4 font-extrabold text-center hover:bg-[#ebe7de] transition">
            Demo starten
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e6e1d8] py-10 text-[#666666]">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] flex flex-wrap justify-between gap-5">
          <div>
            <strong className="text-[#171717]">DemoSite.ch</strong><br />
            Website-Demos für Schweizer KMU
          </div>
          <div className="flex gap-5">
            <a href="#">Kontakt</a>
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
          </div>
        </div>
      </footer>
    </main>
  );
}