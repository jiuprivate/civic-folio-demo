import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FolderOpen,
  ChevronRight,
  FileText,
  BookOpen,
  MessagesSquare,
  Compass,
  ListChecks,
} from "lucide-react";
import { services, priceLabel, guide } from "../lib/catalog.js";
import { ServiceIcon } from "./components/brand.jsx";
import { PageTitle, SourceLinks } from "./components/workspace.jsx";
import entry from "./styles/service-entry.module.css";

export function ServiceCard({ item }) {
  return (
    <a className="service-card" href={"#/services/" + item.id}>
      <div className="service-top">
        <span className="icon-box">
          <ServiceIcon id={item.icon} />
        </span>
        <span className="price">{priceLabel(item.price)}</span>
      </div>
      <div className="service-body">
        <h3>{item.short}</h3>
        <p>{item.description}</p>
      </div>
      <div className="service-bottom">
        <span>View service</span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </div>
    </a>
  );
}

function OpenFolio() {
  return (
    <a
      className="folio-scene"
      href="#/examples/start-a-claim"
      aria-label="Open the fictional Oakland repair deposit sample"
    >
      <div className="folder-tab">Oakland, CA</div>
      <div className="folio-back" />
      <div className="folio-sheet">
        <span className="paper-caption">
          <i />
          Sample matter
        </span>
        <h2>
          The repair
          <br />
          deposit
        </h2>
        <div className="paper-rule" />
        <ul>
          <li>
            <FileText />
            Deposit receipt
          </li>
          <li>
            <MessagesSquare />
            Refund request
          </li>
          <li>
            <ListChecks />
            Timeline of events
          </li>
        </ul>
      </div>
      <div className="folio-front">
        <span>Open sample folio</span>
        <ArrowUpRight size={18} />
      </div>
    </a>
  );
}

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">
            <span className="tick" />
            California civil self-help
          </p>
          <h1>
            Everyday legal help,
            <br />
            <em>within reach.</em>
          </h1>
          <p className="hero-deck">
            Read an agreement, organize a small claim or get ready for a
            hearing. Start with a plain-English guide and a low-cost worksheet.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#/services">
              Explore services <ArrowRight size={16} />
            </a>
            <a className="underlink" href="#/guide">
              California court guide
            </a>
          </div>
        </div>
        <OpenFolio />
      </section>
      <section className="home-services" id="services">
        <div className="section-head">
          <div>
            <p className="eyebrow">Civil matters</p>
            <h2>What do you need help with?</h2>
          </div>
          <a className="text-link" href="#/services">
            All services <ArrowRight size={16} />
          </a>
        </div>
        <div className="cards">
          {services.slice(0, 4).map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <div className="home-lower">
        <a className="question-banner" href="#/questions">
          <span className="banner-icon">
            <MessagesSquare />
          </span>
          <div>
            <h2>Have a general question?</h2>
            <p>Look up a free answer and follow the official court source.</p>
          </div>
          <ArrowRight size={18} />
        </a>
        <a
          className="question-banner guide-banner"
          href="#/services/prepare-for-hearing"
        >
          <span className="banner-icon">
            <FolderOpen />
          </span>
          <div>
            <h2>Already have a case?</h2>
            <p>Organize your notes before a small claims hearing.</p>
          </div>
          <ArrowRight size={18} />
        </a>
      </div>
    </>
  );
}

export function Directory({ pricing = false }) {
  return (
    <>
      <PageTitle
        eyebrow={pricing ? "One-time fees in USD" : "Service directory"}
        title={pricing ? "Service prices" : "Choose a service"}
        body={
          pricing
            ? "Illustrative fees for the sample service packages. You can open every sample without paying. Court filing fees are separate."
            : "Choose a worksheet for the stage you are in. Each service includes a fictional example, an editable workspace and sources you can check."
        }
      />
      {pricing ? (
        <div className="rate-list">
          {services.map((s) => (
            <a key={s.id} href={"#/services/" + s.id} className="rate-row">
              <span className="icon-box">
                <ServiceIcon id={s.icon} />
              </span>
              <div>
                <h2>{s.short}</h2>
                <p>{s.document}</p>
              </div>
              <strong>{priceLabel(s.price)}</strong>
              <ChevronRight size={17} />
            </a>
          ))}
          <a href="#/questions" className="rate-row">
            <span className="icon-box">
              <BookOpen size={22} />
            </span>
            <div>
              <h2>General questions</h2>
              <p>Published information and official links</p>
            </div>
            <strong>Free</strong>
            <ChevronRight size={17} />
          </a>
        </div>
      ) : (
        <div className="cards">
          {services.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="after-note">
        <a className="text-link" href="#/policies/fees">
          Fees and refunds <ArrowRight size={16} />
        </a>
      </div>
    </>
  );
}

export function ServiceEntry({ service }) {
  return (
    <>
      <div className="breadcrumb">
        <a href="#/services">Services</a>
        <span>/</span>
        {service.short}
      </div>
      <div className={entry.main}>
        <PageTitle
          eyebrow="California self-help"
          title={service.heading}
          body={service.description}
        />
        <div className={entry.columns}>
          <div className="reading">
            <section>
              <h2>What you can prepare</h2>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>What to have ready</h2>
              <p>{service.prepare}</p>
            </section>
            <a className="text-link" href={"#/examples/" + service.id}>
              Read a sample <ArrowUpRight size={16} />
            </a>
            <section className="source-box">
              <h2>Official resources</h2>
              <SourceLinks ids={service.source} />
            </section>
          </div>
          <aside>
            <p className="eyebrow">Illustrative fee</p>
            <div className={entry.price}>
              <strong>{priceLabel(service.price)}</strong>
              <span>USD per matter</span>
            </div>
            <a className="button primary" href={"#/workspace/" + service.id}>
              Open sample workspace <ArrowRight size={16} />
            </a>
            <p className={entry.hint}>Available to explore without payment.</p>
          </aside>
        </div>
      </div>
    </>
  );
}

export function Examples({ service }) {
  if (!service)
    return (
      <>
        <PageTitle
          eyebrow="Example library"
          title="Inside a sample folio"
          body="Open a fictional California matter to see what each worksheet contains."
        />
        <div className="list-grid">
          {services.map((s) => (
            <a href={"#/examples/" + s.id} key={s.id} className="list-card">
              <span className="tag">
                {s.example.city} · {s.short}
              </span>
              <h2>{s.example.title}</h2>
              <p>{s.example.facts}</p>
              <span className="text-link">
                Read example <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </>
    );
  const e = service.example;
  return (
    <>
      <div className="breadcrumb">
        <a href="#/examples">Examples</a>
        <span>/</span>
        {service.short}
      </div>
      <PageTitle
        eyebrow={"Fictional sample · " + e.city + ", CA"}
        title={e.title}
        body={service.document}
      />
      <div className="reading-grid">
        <article className="document panel">
          <div className="doc-top">
            <span>Sample folio</span>
            <span>{e.city}</span>
          </div>
          <h2>{e.person}</h2>
          <h3>Account of events</h3>
          <p>{e.facts}</p>
          <h3>Request or next question</h3>
          <p>{e.request}</p>
          <h3>Supporting records</h3>
          <p>{e.evidence}</p>
        </article>
        <aside className="panel">
          <h2>Try this worksheet</h2>
          <p>
            Open the sample in a workspace to edit the notes and print your own
            copy.
          </p>
          <a className="button primary" href={"#/workspace/" + service.id}>
            Open sample <ArrowRight size={16} />
          </a>
          <SourceLinks ids={service.source} />
        </aside>
      </div>
    </>
  );
}

export function Guide() {
  return (
    <>
      <PageTitle
        eyebrow="California court guide"
        title="Finding your way through civil court"
        body="Start with the papers in front of you. These public resources explain the process and connect you with your county’s court."
      />
      <div className="reading-grid">
        <div className="guide-rows">
          {guide.map(([h, b, links]) => (
            <section key={h}>
              <h2>{h}</h2>
              <p>{b}</p>
              <SourceLinks ids={links} />
            </section>
          ))}
        </div>
        <aside className="panel">
          <Compass className="large-icon" />
          <h2>Find your local court</h2>
          <p>
            Choose a county or city in the Judicial Branch directory to find
            locations and local instructions.
          </p>
          <SourceLinks ids={["court", "help"]} />
        </aside>
      </div>
    </>
  );
}

const policies = {
  terms: {
    title: "Terms of use",
    items: [
      [
        "About this edition",
        "Civic Folio is a demonstration of English-language self-help tools for California civil matters. The sample workspaces organize information you enter. All sample parties and matters are fictional.",
      ],
      [
        "Using worksheets",
        "You decide what goes into your worksheet. Nothing is filed, delivered or signed through this site. Check current court forms and instructions before using a document in an actual matter.",
      ],
      [
        "Individual legal advice",
        "Civic Folio provides general legal information. Using it does not create an attorney-client relationship. The State Bar of California can help you find a licensed professional.",
      ],
    ],
  },
  privacy: {
    title: "Privacy notice",
    items: [
      [
        "Information in the demo",
        "The showcase has no accounts, uploads or payment collection. Sample notes and topic searches are processed in the current tab. Enter fictional information only.",
      ],
      [
        "Local choices",
        "Your display preference is saved in this browser when storage is available. Notes are kept in memory and disappear when you reload or close the page. A downloaded or printed copy stays wherever you save it.",
      ],
      [
        "External resources",
        "Court and State Bar links open external websites if you choose them. Those websites manage their own privacy practices. The demo loads its interface, icons and styles from the supplied file.",
      ],
    ],
  },
  fees: {
    title: "Fees and refunds",
    items: [
      [
        "Illustrative prices",
        "The service directory lists example one-time prices in US dollars. General information is free. The prices demonstrate how a low-cost service could be offered.",
      ],
      [
        "Using the showcase",
        "All sample workspaces are available without payment. The demo takes no card details, issues no charge and creates no subscription or stored balance.",
      ],
      [
        "Refunds and court fees",
        "No funds change hands in the showcase, so there is no payment to refund. California court filing fees, any fee waiver and payments to independent professionals are separate from the displayed service prices.",
      ],
    ],
  },
};

export function Policy({ kind }) {
  const p = policies[kind];
  return (
    <>
      <PageTitle eyebrow="Service policies" title={p.title} />
      <div className="policy reading">
        {p.items.map(([h, b]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{b}</p>
          </section>
        ))}
        {kind === "terms" && <SourceLinks ids={["lawyer"]} />}
      </div>
    </>
  );
}
export function Help() {
  return (
    <>
      <PageTitle
        eyebrow="Help"
        title="Using Civic Folio"
        body="Explore the sample matters without entering personal or payment information."
      />
      <div className="guide-rows help">
        {[
          [
            "Can I edit the example?",
            "Open a service, choose Open sample workspace, and answer the guided intake questions. Choose All fields to edit any detail. The document preview follows your edits.",
          ],
          [
            "Can I save a worksheet?",
            "Choose Download text, or Print / save PDF in the workspace. To start again, reload the page.",
          ],
          [
            "Where can I get individual legal help?",
            "For advice about your own situation, use the State Bar directory. Your county’s court may also offer procedural self-help.",
          ],
        ].map(([h, b]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{b}</p>
          </section>
        ))}
        <SourceLinks ids={["help", "lawyer"]} />
      </div>
    </>
  );
}
