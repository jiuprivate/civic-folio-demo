import React, { useState } from "react";
import { Download, Printer, PencilLine } from "lucide-react";
import { countWords, rawTextLimit } from "../../lib/english-words.ts";
import { services, topics, resources } from "../../lib/catalog.js";

const fields = [
  ["title", "Matter title", 110],
  ["city", "California city", 90],
  ["person", "Your sample name", 95],
  ["other", "Other party", 130],
  ["facts", "What happened", 2600],
  ["request", "What you want to say or ask for", 1200],
  ["evidence", "Records you want to keep with the matter", 1300],
];

export function SourceLinks({ ids }) {
  return (
    <ul className="source-links">
      {ids.map((id) => (
        <li key={id}>
          <a href={resources[id][1]} target="_blank" rel="noopener noreferrer">
            {resources[id][0]} <span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function documentLines(service, draft) {
  const field = (key) => draft[key]?.trim() || "[To be completed]";
  if (service.id === "write-a-letter")
    return [
      field("city") + ", California",
      "To: " + field("other"),
      "Re: " + field("title"),
      field("facts"),
      field("request"),
      "Supporting records: " + field("evidence"),
      "Sincerely,\n" + field("person"),
    ];
  return [
    field("title"),
    field("city") + ", California",
    "Prepared by: " + field("person") + "\nOther party: " + field("other"),
    "Account of events\n" + field("facts"),
    "Request or next question\n" + field("request"),
    ...service.worksheet.map(
      ([label, example], index) =>
        label + "\n" + (draft["note" + index] ?? example),
    ),
    "Supporting records\n" + field("evidence"),
  ];
}

export function WorkspaceIndex({ drafts }) {
  return (
    <>
      <PageTitle
        eyebrow="Sample workspace"
        title="Your folios"
        body="Open a fictional matter to organize notes, preview a letter or print a worksheet. Edits last for this tab session."
      />
      <div className="list-grid">
        {services.map((s) => (
          <a className="list-card" href={"#/workspace/" + s.id} key={s.id}>
            <span className="tag">
              {drafts[s.id] ? "Edited in this session" : s.short}
            </span>
            <h2>{(drafts[s.id] || s.example).title || s.short}</h2>
            <p>{s.document}</p>
            <span className="text-link">
              Open folio <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

function GuidedIntake({ service, draft, save, openFields }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      key: "facts",
      prompt: "What happened, in your own words?",
      example: service.example.facts,
    },
    ...service.worksheet.map(([prompt, example], index) => ({
      key: "note" + index,
      prompt,
      example,
    })),
    {
      key: "request",
      prompt: "What would you like to ask for or do next?",
      example: service.example.request,
    },
    {
      key: "evidence",
      prompt: "Which records would help explain it?",
      example: service.example.evidence,
    },
  ];
  const current = steps[step];
  const answer = (item) => draft[item.key] ?? item.example;
  return (
    <div className="guided-intake">
      {step > 0 && (
        <ol className="intake-history">
          {steps.slice(0, step).map((item, index) => (
            <li key={item.key}>
              <strong>{item.prompt}</strong>
              <p>{answer(item)}</p>
              <button
                type="button"
                className="edit-answer"
                onClick={() => setStep(index)}
              >
                Edit reply
              </button>
            </li>
          ))}
        </ol>
      )}
      {current ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (answer(current).trim()) setStep(step + 1);
          }}
        >
          <p className="intake-step">
            Question {step + 1} of {steps.length}
          </p>
          <label className="field">
            {current.prompt}
            <textarea
              rows={4}
              value={answer(current)}
              maxLength={2400}
              onChange={(event) => save(current.key, event.target.value)}
            />
          </label>
          <button
            className="button primary"
            type="submit"
            disabled={!answer(current).trim()}
          >
            {step === steps.length - 1 ? "Finish intake" : "Continue"}
          </button>
        </form>
      ) : (
        <div className="completed-intake">
          <h3>Your notes are ready</h3>
          <p>You can review your document, download it or edit the details.</p>
          <button
            className="button secondary"
            type="button"
            onClick={openFields}
          >
            Edit working notes
          </button>
        </div>
      )}
    </div>
  );
}

export function Workspace({ service, drafts, changeDraft }) {
  const [showPreview, setShowPreview] = useState(false);
  const [editor, setEditor] = useState("guided");
  const draft = drafts[service.id] || service.example;
  const lines = documentLines(service, draft);
  const save = (key, value) =>
    changeDraft(service.id, { ...draft, [key]: value });
  const exportTxt = () => {
    const text = [
      service.document,
      "Civic Folio · Fictional demonstration",
      ...lines,
    ].join("\n\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-" + service.id + ".txt";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <div className="breadcrumb">
        <a href="#/workspace">Your folios</a>
        <span>/</span>
        {service.short}
      </div>
      <PageTitle
        eyebrow="Fictional workspace"
        title={service.document}
        body="Use the sample details below. Changes stay in this tab and can be downloaded or printed."
      />
      <div className="workspace-grid">
        <section
          className="editor panel no-print"
          aria-label="Edit sample details"
        >
          <div className="section-head">
            <h2>Matter intake</h2>
            <PencilLine size={20} />
          </div>
          <div
            className="editor-switch"
            role="group"
            aria-label="Choose an intake view"
          >
            <button
              type="button"
              aria-pressed={editor === "guided"}
              onClick={() => setEditor("guided")}
            >
              Guided intake
            </button>
            <button
              type="button"
              aria-pressed={editor === "fields"}
              onClick={() => setEditor("fields")}
            >
              All fields
            </button>
          </div>
          {editor === "guided" ? (
            <GuidedIntake
              service={service}
              draft={draft}
              save={save}
              openFields={() => setEditor("fields")}
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPreview(true);
                document.getElementById("document-preview")?.focus();
              }}
            >
              {fields.map(([id, label, max], index) => (
                <label className="field" key={id}>
                  {label}
                  {index < 4 ? (
                    <input
                      value={draft[id] || ""}
                      maxLength={max}
                      onChange={(e) => save(id, e.target.value)}
                    />
                  ) : (
                    <textarea
                      rows={3}
                      value={draft[id] || ""}
                      maxLength={max}
                      onChange={(e) => save(id, e.target.value)}
                    />
                  )}
                </label>
              ))}
              {service.worksheet.map(([label, example], index) => (
                <label key={label} className="field">
                  {label}
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={draft["note" + index] ?? example}
                    onChange={(e) => save("note" + index, e.target.value)}
                  />
                </label>
              ))}
              <button className="button primary" type="submit">
                Preview document
              </button>
            </form>
          )}
        </section>
        <div>
          <article
            id="document-preview"
            tabIndex={-1}
            className="document panel"
          >
            <div className="doc-top">
              <span>Fictional sample</span>
              <span>California</span>
            </div>
            <h2>{service.document}</h2>
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </article>
          <div className="tools no-print">
            <button
              type="button"
              className="button secondary"
              onClick={exportTxt}
            >
              <Download size={16} />
              Download text
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              Print / save PDF
            </button>
          </div>
          {showPreview && (
            <p className="inline-note no-print" role="status">
              The preview reflects your latest notes.
            </p>
          )}
          <aside className="source-box no-print">
            <h3>Official resources</h3>
            <SourceLinks ids={service.source} />
          </aside>
        </div>
      </div>
    </>
  );
}

export function PageTitle({ eyebrow, title, body }) {
  return (
    <header className="page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {body && <p className="lead">{body}</p>}
    </header>
  );
}

export function Questions() {
  const [question, setQuestion] = useState(""),
    [selected, select] = useState(null),
    [unmatched, setUnmatched] = useState(false);
  const limit = 80;
  const words = countWords(question);
  const ask = (e) => {
    e.preventDefault();
    const input = question.trim().toLowerCase();
    if (!input || words > limit) return;
    const choices = topics
      .map((t) => ({
        topic: t,
        score: t.terms.reduce(
          (total, word) => total + (input.includes(word) ? word.length : 0),
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
    select(choices[0].score ? choices[0].topic : null);
    setUnmatched(!choices[0].score);
  };
  return (
    <>
      <PageTitle
        eyebrow="Free legal information"
        title="Find a starting point"
        body="Search common California civil court questions. Answers come from the published topics below."
      />
      <div className="reading-grid">
        <section className="panel">
          <form className="question-form" onSubmit={ask}>
            <label className="field">
              What would you like to look up?
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={rawTextLimit(limit)}
                aria-describedby="question-length"
                aria-invalid={words > limit}
                placeholder="For example, what should I bring to a hearing?"
              />
            </label>
            <span id="question-length" className="word-count">
              {words} of {limit} words
              {words > limit ? " · Shorten your question to search." : ""}
            </span>
            <button
              className="button primary"
              type="submit"
              disabled={!question.trim() || words > limit}
            >
              Find information
            </button>
          </form>
          <div aria-live="polite">
            {selected && (
              <article className="answer">
                <h2>{selected.title}</h2>
                <p>{selected.text}</p>
                <SourceLinks
                  ids={[
                    selected.source,
                    ...(selected.more ? [selected.more] : []),
                  ]}
                />
              </article>
            )}
            {unmatched && (
              <p className="answer">
                Choose a topic from the list, or visit the{" "}
                <a
                  href={resources.help[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  California Courts Self-Help Guide
                </a>{" "}
                for other questions.
              </p>
            )}
          </div>
        </section>
        <aside className="topic-list">
          <h2>Browse topics</h2>
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={selected?.id === t.id}
              onClick={() => {
                setQuestion(t.title);
                select(t);
                setUnmatched(false);
              }}
            >
              {t.title}
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </aside>
      </div>
    </>
  );
}
