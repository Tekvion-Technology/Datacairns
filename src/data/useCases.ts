import type { ImageMetadata } from 'astro';
import publicSectorImg from '../assets/usecase-public-sector.png';
import financeImg from '../assets/usecase-finance.png';
import healthcareImg from '../assets/usecase-healthcare.png';

export interface UseCase {
  slug: string;
  /** Short industry name used in chips, filters and breadcrumbs. */
  sector: string;
  /** When true the use case is written but not published anywhere on the site. */
  hidden?: boolean;
  title: string;
  /** One-line summary for cards and the homepage carousel. */
  summary: string;
  /** Uppercase intro line on the deep-dive page. */
  sub: string;
  tags: string[];
  /** Homepage carousel bullets. */
  dataIn: string;
  aiDoes: string;
  teamGets: string;
  /** Local import (built-in data) or an absolute URL (from the CMS). */
  photo?: ImageMetadata | string;
  alt: string;
  /** What render to commission when there is no photo yet. */
  imageBrief: string;
  /** Listing tile colors. */
  tile: { bg: string; line: string; pebble: string };
  challenge: string;
  solution: string;
  points: { t: string; d: string }[];
  caps: { t: string; d: string }[];
  deep: string[];
  outcomes: { n: string; l: string }[];
}

const all: UseCase[] = [
  {
    slug: 'public-sector',
    sector: 'Public sector',
    title: 'Sovereign analytics for public services',
    summary: 'Bring agency data together in-country and give leaders trusted answers in plain language.',
    sub: 'How a government agency could bring its data together in-country and give leaders trusted answers in plain language.',
    tags: ['Public sector', 'Data sovereignty', 'AI assistant'],
    dataIn: 'case, finance, licensing and service records',
    aiDoes: 'answers leadership questions in plain language, with sources',
    teamGets: 'faster, evidence-based service planning',
    photo: publicSectorImg,
    alt: 'A domed government building resting on layered glass and server platforms, linked by a network of glowing nodes',
    imageBrief: 'government building in stacked mint and black layers',
    tile: { bg: '#070908', line: '#3A4542', pebble: '#00D2AA' },
    challenge:
      'Agencies hold data across many systems: case management, finance, licensing, sensors and spreadsheets. Leaders wait weeks for reports, analysts spend most of their time stitching data together, and sensitive citizen data must stay under national jurisdiction. Every new AI idea means another copy of the data and another security review.',
    solution: 'Datacairns gives the agency one sovereign platform for its data and AI, hosted in-country:',
    points: [
      { t: 'Connected sources', d: 'databases, files and line-of-business systems brought into one lakehouse, without replacing them.' },
      { t: 'Governed by default', d: 'access control, lineage and audit applied once and enforced everywhere.' },
      { t: 'Plain-language answers', d: 'leaders ask questions and get answers, charts and the logic behind them.' },
      { t: 'In-country AI', d: 'models and agents run next to the data, inside national borders.' },
    ],
    caps: [
      { t: 'Sovereign deployment', d: 'Runs in a national cloud or the agency’s own data center. Data never leaves the country.' },
      { t: 'Unified lakehouse', d: 'One copy of structured and unstructured data in open formats, shared by every team.' },
      { t: 'Catalog & governance', d: 'Role-based access, lineage and audit trails across every dataset and every AI answer.' },
      { t: 'AI assistant & agents', d: 'Plain-language questions, automated briefings and agents that act within policy.' },
    ],
    deep: [
      'A typical agency runs dozens of systems, each built for a single service. Questions that cut across them, such as how demand is shifting by region or where service times are slipping, need data from several at once. Today that means manual extracts, overnight spreadsheets and reports that are out of date by the time they reach leadership.',
      'With Datacairns, those sources land in a single governed lakehouse inside the country. Data is cleaned and modeled once, then reused by dashboards, analysts and AI alike. Because every answer carries its lineage, leaders can see exactly where a number came from and who is allowed to see it.',
      'The result is a shorter path from question to decision: service planning based on current data, faster responses to ministerial questions, and a foundation that new AI initiatives can build on without creating new copies of sensitive data.',
    ],
    outcomes: [
      { n: '10×', l: 'Faster time from question to answer' },
      { n: '25+', l: 'Source systems connected' },
      { n: '100%', l: 'Citizen data kept in-country' },
      { n: '40', l: 'Recurring reports automated' },
      { n: '300 hrs', l: 'Analyst time saved per month' },
      { n: '60%', l: 'Fewer duplicate data copies' },
    ],
  },
  {
    slug: 'finance',
    sector: 'Finance',
    title: 'Real-time fraud detection',
    summary: 'Catch suspicious activity as it happens and produce audit-ready reports on demand.',
    sub: 'How a bank could catch suspicious activity as it happens and produce audit-ready reports on demand.',
    tags: ['Finance', 'Real-time analytics', 'Governance'],
    dataIn: 'card, transfer, device and customer data, in real time',
    aiDoes: 'scores every transaction and drafts case summaries',
    teamGets: 'lower fraud losses and audit-ready reports',
    photo: financeImg,
    alt: 'A brushed-metal payment card behind a glowing security shield, circled by orbiting network lines',
    imageBrief: 'payment card with a shield',
    tile: { bg: '#E7EBEC', line: '#C1C6C8', pebble: '#00D2AA' },
    challenge:
      'Fraud patterns change weekly, but detection rules are updated slowly and run on data that is hours old. Investigators jump between systems to build a picture of each case, and regulators expect clear evidence of how every decision was made.',
    solution: 'Datacairns gives risk teams live, governed data and AI in one place:',
    points: [
      { t: 'Real-time scoring', d: 'transactions are scored as they arrive, using the latest customer and device data.' },
      { t: 'Models that keep learning', d: 'fraud models are retrained on confirmed cases as patterns change.' },
      { t: 'Investigator assistant', d: 'case summaries pull every relevant record into one view.' },
      { t: 'Audit-ready by design', d: 'every score and decision is traceable to the data and model behind it.' },
    ],
    caps: [
      { t: 'Streaming analytics', d: 'Scores transactions in real time, at the volume of a national payment network.' },
      { t: 'Feature store', d: 'Shared, governed customer and transaction features for every model.' },
      { t: 'Model governance', d: 'Versioning, monitoring and approval workflows for every model in production.' },
      { t: 'Regulatory reporting', d: 'Lineage and audit trails that produce evidence on demand.' },
    ],
    deep: [
      'Fraud teams are caught between speed and control. Rules need to change quickly as fraudsters adapt, but every change has to be explainable to auditors and regulators. Data spread across core banking, cards and digital channels makes both harder.',
      'With Datacairns, transaction, customer and device data arrive in one governed platform as they happen. Models score each payment in real time, and investigators get an AI-prepared case summary instead of a dozen open screens.',
      'Losses come down, good customers are blocked less often, and compliance teams can show exactly how each decision was reached.',
    ],
    outcomes: [
      { n: '35%', l: 'Lower fraud losses' },
      { n: '<50 ms', l: 'Time to score a transaction' },
      { n: '40%', l: 'Fewer false declines' },
      { n: '3×', l: 'Faster case investigation' },
      { n: '20', l: 'Models in governed production' },
      { n: '2 hrs', l: 'To produce an audit report' },
    ],
  },
  {
    slug: 'healthcare',
    sector: 'Healthcare',
    title: 'Governed research data',
    summary: 'Give researchers AI-ready data while patient privacy stays protected.',
    sub: 'How a health system could give researchers AI-ready data while patient privacy stays protected.',
    tags: ['Healthcare', 'Privacy', 'Research'],
    dataIn: 'clinical records, imaging and genomic data',
    aiDoes: 'prepares de-identified, research-ready datasets',
    teamGets: 'research that starts in weeks, not months',
    photo: healthcareImg,
    alt: 'A glossy white and teal DNA double helix on a turquoise background, linked by thin network lines',
    imageBrief: 'DNA strand in stacked layers',
    tile: { bg: '#00735C', line: '#00A887', pebble: '#FFFFFF' },
    challenge:
      'Clinical, imaging and genomic data sit in separate systems with different owners. Every research project starts with months of requests, extracts and privacy reviews, and data that leaves its source is hard to track or recall.',
    solution: 'Datacairns creates one governed research environment, without moving data out of control:',
    points: [
      { t: 'Unified research data', d: 'clinical records, imaging and genomics organized in one lakehouse.' },
      { t: 'Privacy built in', d: 'de-identification, consent rules and fine-grained access applied automatically.' },
      { t: 'Research workspaces', d: 'approved teams analyze data and train models without copying it out.' },
      { t: 'Full traceability', d: 'every query, dataset and model is logged for ethics and compliance review.' },
    ],
    caps: [
      { t: 'Multi-modal lakehouse', d: 'Structured records, images and genomic files in one governed store.' },
      { t: 'Privacy controls', d: 'De-identification, masking and consent-aware access policies.' },
      { t: 'Secure workspaces', d: 'Notebooks and AI tools that run inside the governed environment.' },
      { t: 'Audit & lineage', d: 'A complete record of who used which data, for what purpose.' },
    ],
    deep: [
      'Medical research depends on bringing different kinds of data together, but each source has its own owner, format and privacy rules. The result is long waits for data, duplicated extracts and limited visibility into how data is used once it leaves the source system.',
      'Datacairns keeps research data in one governed platform. Researchers work in secure workspaces where privacy rules travel with the data, and AI models are trained without data being copied to laptops or outside tools.',
      'Projects start sooner, data owners keep control, and ethics committees get a clear record of every use.',
    ],
    outcomes: [
      { n: '8 weeks', l: 'Faster access to research data' },
      { n: '12', l: 'Data sources unified' },
      { n: '30', l: 'Research projects supported' },
      { n: '100%', l: 'Data access fully audited' },
      { n: '15', l: 'Models trained in-environment' },
      { n: '90%', l: 'Fewer data extracts' },
    ],
  },
  {
    slug: 'retail',
    sector: 'Retail',
    hidden: true,
    title: 'Demand forecasting and personalization',
    summary: 'Forecast demand by store and product, and personalize offers from one trusted view of customers, sales and stock.',
    sub: 'How a retailer could forecast demand by store and product, and personalize offers from one trusted view of customers, sales and stock.',
    tags: ['Retail', 'Forecasting', 'Customer data'],
    dataIn: 'store, e-commerce, stock and loyalty data',
    aiDoes: 'forecasts demand by store, product and day',
    teamGets: 'fewer stockouts and more relevant offers',
    alt: '',
    imageBrief: 'shopping bag or storefront in stacked mint and black layers',
    tile: { bg: '#00D2AA', line: '#00A887', pebble: '#070908' },
    challenge:
      'Store sales, e-commerce, stock and loyalty data live in separate systems. Forecasts are built in spreadsheets, shelves end up over- or under-stocked, and marketing teams cannot see what customers actually buy across channels.',
    solution: 'Datacairns brings every channel into one governed platform:',
    points: [
      { t: 'One view of the customer', d: 'store, online and loyalty data joined into one profile, with privacy rules applied.' },
      { t: 'Demand forecasting', d: 'AI models forecast demand by store, product and day, and keep learning as patterns change.' },
      { t: 'Personalized offers', d: 'recommendations built on real purchase history, across every channel.' },
      { t: 'Plain-language answers', d: 'merchandisers ask about sales, margin and stock without waiting for a report.' },
    ],
    caps: [
      { t: 'Omnichannel lakehouse', d: 'Point-of-sale, e-commerce, loyalty and supply chain data in one place.' },
      { t: 'Forecasting models', d: 'Store- and product-level demand forecasts, retrained as buying patterns shift.' },
      { t: 'Customer data governance', d: 'Consent-aware access to customer data, controlled by role.' },
      { t: 'AI assistant', d: 'Answers on sales, margin and stock in plain language, with the data behind them.' },
    ],
    deep: [
      'Retailers sit on some of the richest data of any industry, but it is split by channel and by team. Merchandising, supply chain and marketing each work from their own numbers, so forecasts disagree, promotions miss, and stock ends up in the wrong place.',
      'With Datacairns, sales, stock and customer data land in one governed lakehouse. Forecasting models work from the same numbers every team sees, and personalization draws on real purchase history while respecting each customer’s consent.',
      'The result is fewer empty shelves and less excess stock, offers that customers actually respond to, and teams that spend their time acting on the numbers instead of reconciling them.',
    ],
    outcomes: [
      { n: '20%', l: 'More accurate demand forecasts' },
      { n: '30%', l: 'Fewer stockouts' },
      { n: '15%', l: 'Less excess inventory' },
      { n: '25%', l: 'Higher response to offers' },
      { n: '4', l: 'Sales channels unified' },
      { n: '40 hrs', l: 'Saved on weekly reporting' },
    ],
  },
  {
    slug: 'manufacturing',
    sector: 'Manufacturing',
    hidden: true,
    title: 'Predictive maintenance and quality',
    summary: 'Spot machine issues and quality defects early, before they slow the production line.',
    sub: 'How a manufacturer could spot machine issues and quality defects early, before they slow the production line.',
    tags: ['Manufacturing', 'Streaming', 'Machine learning'],
    dataIn: 'machine sensors, production and quality records',
    aiDoes: 'flags failing machines and defects early',
    teamGets: 'less downtime and less scrap',
    alt: '',
    imageBrief: 'robotic arm or machine part with flowing sensor signals',
    tile: { bg: '#070908', line: '#3A4542', pebble: '#00D2AA' },
    challenge:
      'Machines, sensors and inspection cameras generate constant data, but it sits in separate plant systems. Maintenance runs on fixed schedules or starts after something breaks, defects are often found at the end of the line, and engineers struggle to combine machine data with production and quality records.',
    solution: 'Datacairns connects the factory floor to one platform built for streams:',
    points: [
      { t: 'Streaming machine data', d: 'sensor readings flow in continuously, alongside production and quality records.' },
      { t: 'Early-warning models', d: 'AI trained on machine history flags unusual behavior before it becomes downtime.' },
      { t: 'Visual quality checks', d: 'models spot defects in inspection images as products move down the line.' },
      { t: 'Maintenance agents', d: 'agents draft work orders and suggest the right crew and parts.' },
    ],
    caps: [
      { t: 'Streaming pipelines', d: 'Continuous ingestion from PLCs, historians and IoT gateways on every line.' },
      { t: 'Time-series lakehouse', d: 'Machine sensor data and inspection images stored next to production and quality records.' },
      { t: 'ML & model serving', d: 'Train, monitor and serve failure and defect-detection models close to the data.' },
      { t: 'Plant-level governance', d: 'Access to plant data controlled by site, line and role.' },
    ],
    deep: [
      'Most factories already collect the signals that warn of a breakdown or a quality problem. The difficulty is that vibration, temperature and cycle-time readings live in one system, while maintenance history, production plans and inspection results live in others. Without all of them together, it is hard to tell a harmless spike from the start of a failure.',
      'Datacairns streams machine data into the same lakehouse as production and quality records. Models learn what normal looks like for each machine and raise an alert when behavior drifts, while vision models check inspection images in real time and flag defects at the station where they happen.',
      'Maintenance moves from the calendar to the condition of the equipment, and quality moves from the end of the line to every step: fewer stoppages, less scrap and crews sent where they are actually needed.',
    ],
    outcomes: [
      { n: '30%', l: 'Less unplanned downtime' },
      { n: '1,200', l: 'Machines monitored' },
      { n: '14 days', l: 'Earlier warning before failure' },
      { n: '25%', l: 'Fewer defects reaching customers' },
      { n: '20%', l: 'Lower maintenance cost' },
      { n: '8', l: 'Production lines connected' },
    ],
  },
];

/** Built-in use cases, used when the CMS is not configured or cannot be reached. */
export const fallbackUseCases = all.filter((u) => !u.hidden);

export const useCaseHref = (u: UseCase) => `/use-cases/${u.slug}/`;
