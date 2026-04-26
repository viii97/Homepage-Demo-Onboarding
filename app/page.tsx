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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    industry: "",
    location: "",
    services: "",
    goal: "",
    highlights: "",
    targetCustomers: "",
    usp: "",
    contactMethod: "",
    additionalNotes: "",
    style: "Modern & klar",
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
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

  const demoItems = [
    {
      title: "Handwerk Demo",
      tag: "Mehr Anfragen",
      bg: "from-[#1f4e3d] to-[#dfe9df]",
      headline: "Saubere Arbeit. Klare Termine.",
    },
    {
      title: "Restaurant Demo",
      tag: "Mehr Buchungen",
      bg: "from-[#111111] to-[#f0d7b8]",
      headline: "Reservieren. Geniessen. Wiederkommen.",
    },
    {
      title: "Reinigung Demo",
      tag: "Mehr Offerten",
      bg: "from-[#2f5f73] to-[#dceff3]",
      headline: "Professionelle Reinigung auf einen Blick.",
    },
    {
      title: "Garage Demo",
      tag: "Mehr Anrufe",
      bg: "from-[#252525] to-[#e6e1d8]",
      headline: "Service, MFK und Reparaturen.",
    },
    {
      title: "Beauty Demo",
      tag: "Mehr Termine",
      bg: "from-[#6e3d52] to-[#f3dce6]",
      headline: "Behandlungen sichtbar schön präsentiert.",
    },
    {
      title: "Beratung Demo",
      tag: "Mehr Vertrauen",
      bg: "from-[#243b53] to-[#d8e2ec]",
      headline: "Kompetenz klar erklärt.",
    },
  ];

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] text-[#171717] flex items-center justify-center px-4">
        <div className="max-w-xl bg-white rounded-[28px] shadow-xl border border-[#e6e1d8] p-8 md:p-12 text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-[#1f4e3d] text-white flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-[-0.06em] leading-none mb-5">
            Ihre Anfrage ist angekommen.
          </h1>
          <p className="text-[#666666] text-lg mb-8">
            Vielen Dank. Wir erstellen nun Ihre persönliche Website-Demo und senden Ihnen die kostenlose Probeversion direkt per E-Mail zu.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setPath("");
            }}
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
          <a href="#" className="text-2xl font-extrabold tracking-[-0.05em]">
            DemoSite.ch
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[#666666] text-sm">
            <a href="#ablauf">Ablauf</a>
            <a href="#vorteile">Vorteile</a>
            <a href="#demo">Demo starten</a>
          </nav>

          <a
            href="#demo"
            className="rounded-full bg-[#1f4e3d] text-white px-5 py-3 font-bold hover:bg-[#16382c] transition"
          >
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
            <div className="mb-6">
              <p className="text-sm font-bold text-[#1f4e3d] mb-2">Kostenlose Demo starten</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.05em] leading-none mb-3">
                {step === 1 && "Was brauchen Sie?"}
                {step === 2 && "Demo genauer personalisieren"}
                {step === 3 && "Wohin dürfen wir die Demo senden?"}
              </h2>
              <p className="text-[#666666]">
                {step === 1 && "Wählen Sie zuerst, ob Sie eine bestehende Website verbessern oder eine neue Website erstellen möchten."}
                {step === 2 && "Diese Angaben sind freiwillig, machen Ihre Demo aber deutlich persönlicher und genauer."}
                {step === 3 && "Wir senden Ihnen die kostenlose Probeversion direkt per E-Mail zu. Bei Rückfragen können wir Sie zusätzlich telefonisch erreichen."}
              </p>
            </div>

            {step === 1 && (
              <form onSubmit={handleStepOne} className="space-y-5">
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => selectPath("bestehende_website")}
                    className={`text-left rounded-2xl border p-5 transition ${
                      path === "bestehende_website"
                        ? "border-[#1f4e3d] bg-[#f1f5f2]"
                        : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"
                    }`}
                  >
                    <strong className="block text-lg mb-1">Ich habe bereits eine Website</strong>
                    <span className="text-[#666666] text-sm">
                      Meine bestehende Website soll moderner, klarer und besser auf Anfragen ausgerichtet werden.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectPath("neue_website")}
                    className={`text-left rounded-2xl border p-5 transition ${
                      path === "neue_website"
                        ? "border-[#1f4e3d] bg-[#f1f5f2]"
                        : "border-[#e6e1d8] bg-white hover:bg-[#f7f5f0]"
                    }`}
                  >
                    <strong className="block text-lg mb-1">Ich brauche eine neue Website</strong>
                    <span className="text-[#666666] text-sm">
                      Ich habe noch keine Website oder möchte komplett neu starten.
                    </span>
                  </button>
                </div>

                {path === "bestehende_website" && (
                  <div>
                    <label className="block text-sm font-bold mb-2">Ihre aktuelle Website</label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.ihrefirma.ch"
                      value={form.websiteUrl}
                      onChange={(e) => updateField("websiteUrl", e.target.value)}
                      className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-4 outline-none focus:border-[#1f4e3d]"
                    />
                  </div>
                )}

                <button
                  disabled={!path}
                  className="w-full rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition disabled:opacity-50"
                >
                  Weiter zur Personalisierung →
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStepTwo} className="space-y-4">
                <div className="rounded-2xl bg-[#f7f5f0] border border-[#e6e1d8] p-4 text-sm text-[#666666]">
                  Je mehr Informationen Sie angeben, desto besser passt der Entwurf zu Ihrem Unternehmen. Diese Angaben sind optional.
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Firmenname</label>
                    <input
                      placeholder="Muster GmbH"
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Ort / Region</label>
                    <input
                      placeholder="Zürich"
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Branche</label>
                  <select
                    value={form.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d] bg-white"
                  >
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

                <div>
                  <label className="block text-sm font-bold mb-2">Wichtigste Dienstleistungen</label>
                  <textarea
                    rows="3"
                    placeholder="z.B. Renovationen, Reparaturen, Unterhalt, Beratung..."
                    value={form.services}
                    onChange={(e) => updateField("services", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Wer sind Ihre Kunden?</label>
                  <textarea
                    rows="2"
                    placeholder="z.B. Privatkunden, KMU, Immobilienverwaltungen, Familien, Unternehmen..."
                    value={form.targetCustomers}
                    onChange={(e) => updateField("targetCustomers", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Was unterscheidet Ihr Unternehmen?</label>
                  <textarea
                    rows="2"
                    placeholder="z.B. schnelle Termine, persönliche Beratung, langjährige Erfahrung, Spezialisierung..."
                    value={form.usp}
                    onChange={(e) => updateField("usp", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Hauptziel der Website</label>
                  <select
                    value={form.goal}
                    onChange={(e) => updateField("goal", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d] bg-white"
                  >
                    <option value="">Bitte wählen</option>
                    <option>Mehr Anrufe</option>
                    <option>Mehr Offertenanfragen</option>
                    <option>Mehr Buchungen</option>
                    <option>Mehr Vertrauen</option>
                    <option>Moderneres Erscheinungsbild</option>
                    <option>Mehr Bewerbungen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Wie sollen Kunden Sie am liebsten kontaktieren?</label>
                  <select
                    value={form.contactMethod}
                    onChange={(e) => updateField("contactMethod", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d] bg-white"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="phone">Telefon</option>
                    <option value="email">E-Mail</option>
                    <option value="quote">Offertenformular</option>
                    <option value="booking">Online-Terminbuchung</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Was soll besonders hervorgehoben werden?</label>
                  <textarea
                    rows="2"
                    placeholder="z.B. Google-Bewertungen, Referenzen, Bilder, Team, schnelle Termine..."
                    value={form.highlights}
                    onChange={(e) => updateField("highlights", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Gewünschter Stil</label>
                  <select
                    value={form.style}
                    onChange={(e) => updateField("style", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d] bg-white"
                  >
                    <option>Modern & klar</option>
                    <option>Premium & elegant</option>
                    <option>Persönlich & freundlich</option>
                    <option>Traditionell & seriös</option>
                    <option>Mutig & auffällig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Zusätzliche Hinweise</label>
                  <textarea
                    rows="2"
                    placeholder="Optional: Gibt es etwas, das wir bei der Demo beachten sollen?"
                    value={form.additionalNotes}
                    onChange={(e) => updateField("additionalNotes", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-[#e6e1d8] px-6 py-4 font-bold hover:bg-[#ebe7de] transition"
                  >
                    Zurück
                  </button>
                  <button className="rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition">
                    Demo anfragen →
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-2xl bg-[#f7f5f0] border border-[#e6e1d8] p-4 text-sm text-[#666666]">
                  Fast geschafft. Wir senden Ihnen die kostenlose Probeversion direkt an Ihre E-Mail-Adresse. Ihre Telefonnummer hilft uns nur, falls wir Rückfragen zur Demo haben.
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Vorname</label>
                    <input
                      required
                      placeholder="Max"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Nachname</label>
                    <input
                      required
                      placeholder="Muster"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">E-Mail</label>
                  <input
                    type="email"
                    required
                    placeholder="name@firma.ch"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Telefonnummer</label>
                  <input
                    type="tel"
                    placeholder="+41 44 123 45 67"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-[#e6e1d8] px-4 py-3 outline-none focus:border-[#1f4e3d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-full border border-[#e6e1d8] px-6 py-4 font-bold hover:bg-[#ebe7de] transition"
                  >
                    Zurück
                  </button>
                  <button
                    disabled={isSubmitting}
                    className="rounded-full bg-[#1f4e3d] text-white px-6 py-4 font-bold hover:bg-[#16382c] transition disabled:opacity-60"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Kostenlose Probeversion erhalten"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-[#e6e1d8] overflow-hidden">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))]">
          <div className="max-w-3xl mb-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-4">
              Websites, die auf den ersten Blick überzeugen.
            </h2>
            <p className="text-lg text-[#666666]">
              Jede Demo wird individuell auf Branche, Ziel und bestehende Inhalte abgestimmt. So sieht der Kunde sofort, was möglich wäre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {demoItems.slice(0, 6).map((item) => (
              <div key={item.title} className="group rounded-[28px] bg-[#f7f5f0] border border-[#e6e1d8] overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className={`h-56 bg-gradient-to-br ${item.bg} p-5 flex items-center justify-center`}>
                  <div className="w-full rounded-2xl bg-white/85 backdrop-blur border border-white/60 shadow-lg p-5">
                    <div className="h-3 w-24 rounded-full bg-black/10 mb-5" />
                    <h3 className="text-3xl font-extrabold tracking-[-0.06em] leading-none mb-4">
                      {item.headline}
                    </h3>
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
                  <span className="rounded-full bg-[#1f4e3d] text-white text-xs font-bold px-3 py-2">
                    {item.tag}
                  </span>
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

      <section id="ablauf" className="py-20 bg-white border-y border-[#e6e1d8]">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))]">
          <div className="max-w-2xl mb-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-4">
              So funktioniert es
            </h2>
            <p className="text-lg text-[#666666]">
              Ein einfacher Prozess, damit Sie schnell sehen, wie Ihre neue Website wirken könnte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["1", "Situation wählen", "Sie geben an, ob Sie eine bestehende Website verbessern oder eine neue Website erstellen möchten."],
              ["2", "Angaben ergänzen", "Optionale Informationen helfen uns, die Demo genauer auf Ihr Unternehmen abzustimmen."],
              ["3", "Probeversion erhalten", "Sie erhalten den Website-Entwurf per E-Mail und können unverbindlich entscheiden."],
            ].map((item) => (
              <div key={item[0]} className="rounded-[24px] bg-[#f7f5f0] border border-[#e6e1d8] p-7">
                <div className="h-11 w-11 rounded-full bg-[#1f4e3d] text-white flex items-center justify-center font-extrabold mb-5">
                  {item[0]}
                </div>
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] mb-3">{item[1]}</h3>
                <p className="text-[#666666]">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

                <h2 className="text-[42px] md:text-[52px] leading-[0.98] tracking-[-0.07em] font-extrabold mb-8">
                  Mehr Anfragen.<br />
                  <span className="text-[#9AF5B3]">Weniger Aufwand.</span>
                </h2>

                <p className="text-white/82 text-xl leading-relaxed">
                  Die meisten KMU-Websites verlieren täglich potenzielle Kunden, nicht weil das Angebot schlecht ist, sondern weil die Website es nicht klar zeigt.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {[
              [
                "user",
                "Mehr Anfragen statt nur Besucher",
                "Ihre Website erklärt sofort, was Sie anbieten und warum Kunden genau Sie kontaktieren sollten, statt weiterzusuchen.",
              ],
              [
                "eye",
                "Ein klarer erster Eindruck",
                "Innerhalb weniger Sekunden entscheidet sich, ob jemand bleibt oder geht. Ihre Seite wirkt sofort professionell und vertrauenswürdig.",
              ],
              [
                "target",
                "Kunden verstehen Ihr Angebot sofort",
                "Keine Verwirrung mehr. Besucher sehen auf einen Blick, was Sie machen, für wen es ist und wie sie Sie erreichen.",
              ],
              [
                "rocket",
                "Sie sehen den Unterschied sofort",
                "Statt langen Erklärungen erhalten Sie eine konkrete Demo, die zeigt, wie Ihre Website wirken muss, um besser zu funktionieren.",
              ],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-[28px] bg-white border border-[#e6e1d8] p-6 md:p-7 shadow-sm flex gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-[#edf5ed] text-[#1f4e3d] flex items-center justify-center shrink-0">
                  {icon === "user" && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  {icon === "eye" && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {icon === "target" && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <path d="M15.5 8.5 21 3" />
                    </svg>
                  )}
                  {icon === "rocket" && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4.5 16.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5" />
                      <path d="M9 15 4 20" />
                      <path d="M14.5 4.5c3.2-.9 5.1.2 5.1.2s1.1 1.9.2 5.1c-.9 3.2-4 6.4-7.1 8.1L6 11.2c1.7-3.1 5.3-5.8 8.5-6.7Z" />
                      <circle cx="15" cy="9" r="2" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.055em] leading-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-[#666666] text-lg leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] rounded-[34px] bg-[#111111] text-white p-8 md:p-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.06em] leading-none mb-5">
              Testen Sie es selbst.
            </h2>
            <p className="text-white/70 text-lg max-w-2xl">
              Wählen Sie, ob Sie eine bestehende Website verbessern oder eine neue Website erstellen möchten   und erhalten Sie eine persönliche Demo.
            </p>
          </div>
          <a
            href="#demo"
            className="rounded-full bg-white text-[#111111] px-7 py-4 font-extrabold text-center hover:bg-[#ebe7de] transition"
          >
            Demo starten
          </a>
        </div>
      </section>

      <footer className="border-t border-[#e6e1d8] py-10 text-[#666666]">
        <div className="mx-auto w-[min(1120px,calc(100%-32px))] flex flex-wrap justify-between gap-5">
          <div>
            <strong className="text-[#171717]">DemoSite.ch</strong>
            <br />
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
