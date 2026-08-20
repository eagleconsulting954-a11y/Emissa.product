export type SeoSection = { title: string; body: string; bullets?: string[] };
export type SeoSource = { label: string; url: string };
export type SeoEntry = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  sections: SeoSection[];
  faq: [string, string][];
  sources?: SeoSource[];
  note?: string;
};

const integration = (name: string, system: string, data: string[], outcomes: string[]): SeoEntry => ({
  title: `${name} Supplier Compliance Integration`,
  description: `Learn how ${name} data can support supplier compliance, evidence, buyer requests and regulatory workflows in Emissa.`,
  h1: `${name} + Emissa Supplier Compliance Integration`,
  intro: `Connect ${system} data to a controlled supplier compliance operating layer so teams can reuse approved business records across evidence, due diligence, buyer and regulatory workflows.`,
  keywords: [`${name} supplier compliance integration`, `${name} compliance software`, `${name} supplier data integration`, 'supplier compliance integrations'],
  sections: [
    { title: 'What the integration is designed to connect', body: `Emissa is designed to map relevant ${name} records into supplier, facility, product, purchasing and evidence workflows rather than creating another disconnected data copy.`, bullets: data },
    { title: 'How the data becomes useful', body: 'The goal is not simply synchronization. The value comes from attaching source data to the compliance requirements, owners, approvals and evidence packages that consume it.', bullets: outcomes },
    { title: 'Controls for production use', body: 'A production integration should preserve source-system identity, timestamps, ownership, validation status and an audit trail. Teams should be able to distinguish imported source data from reviewed compliance outputs.' },
    { title: 'Deployment and availability', body: `Connector availability can vary by Emissa deployment, account permissions and the APIs enabled in ${name}. Emissa should confirm the exact objects, fields, authentication method and write-back behavior before implementation.` },
  ],
  faq: [
    [`Does Emissa replace ${name}?`, `No. ${name} remains the operational system of record for the data it owns. Emissa uses relevant records as inputs to supplier compliance workflows.`],
    ['Can imported data be reused across multiple compliance workflows?', 'Yes. The architecture is designed so validated supplier, purchasing, product and facility data can support multiple requirements without repeated re-keying.'],
    ['Is the connector available in every deployment?', 'Availability depends on the APIs, permissions and connector configuration enabled for the customer environment.'],
  ],
  note: 'Integration availability depends on deployment configuration and source-system API access.',
});

export const integrations: Record<string, SeoEntry> = {
  quickbooks: integration('QuickBooks', 'accounting and purchasing', ['Vendor and supplier records', 'Purchasing and spend records', 'Business entities and locations', 'Transaction-level source references'], ['Supplier spend classification', 'Scope 3 purchasing workflows', 'Buyer evidence support', 'Supplier master enrichment']),
  netsuite: integration('NetSuite', 'ERP', ['Vendor master data', 'Purchase orders and transactions', 'Items and product records', 'Subsidiaries and locations'], ['Supplier onboarding context', 'Product and material compliance', 'CBAM and product evidence mapping', 'Multi-entity compliance rollups']),
  coupa: integration('Coupa', 'procurement', ['Suppliers and vendor profiles', 'Purchase orders', 'Invoices and spend categories', 'Procurement ownership data'], ['Supplier due diligence', 'Evidence requests', 'Supplier risk prioritization', 'Procurement-to-compliance handoffs']),
  'sap-ariba': integration('SAP Ariba', 'supplier and procurement', ['Supplier profiles', 'Sourcing and purchasing records', 'Questionnaire context', 'Category and buyer ownership'], ['Supplier onboarding', 'Questionnaire reuse', 'Compliance evidence collection', 'Buyer requirement workflows']),
  salesforce: integration('Salesforce', 'customer and account', ['Customer accounts', 'Contacts and ownership', 'Buyer request context', 'Opportunity and relationship metadata'], ['Customer compliance requests', 'Evidence package delivery', 'Account-specific obligations', 'Commercial response readiness']),
  slack: integration('Slack', 'team communication', ['Workflow notifications', 'Owner alerts', 'Approval requests', 'Escalation messages'], ['Deadline reminders', 'Exception escalation', 'Review coordination', 'Compliance operations visibility']),
  utilityapi: integration('UtilityAPI', 'utility consumption', ['Electricity usage', 'Meter and account identifiers', 'Billing periods', 'Source utility records'], ['Scope 2 evidence', 'Facility emissions inputs', 'Product footprint allocation', 'Auditable energy data']),
  arcadia: integration('Arcadia', 'energy and utility data', ['Utility account data', 'Electricity consumption', 'Location-level usage', 'Source-period records'], ['Facility carbon evidence', 'Scope 2 calculations', 'Supplier facility profiles', 'Product footprint inputs']),
  walmart: integration('Walmart Marketplace', 'commerce and product', ['Product identifiers', 'Order and sales context', 'Supplier or seller records', 'Operational transaction references'], ['Product compliance mapping', 'Packaging and EPR data workflows', 'Buyer evidence requests', 'SKU-level compliance records']),
  wex: integration('WEX', 'fleet and fuel', ['Fuel transactions', 'Vehicle or card identifiers', 'Transaction dates and locations', 'Fuel quantities and spend'], ['Fleet emissions evidence', 'Scope 1 calculations', 'Logistics data enrichment', 'Audit-ready source records']),
  fuelman: integration('Fuelman', 'fleet fuel', ['Fuel purchases', 'Card and vehicle references', 'Transaction records', 'Fuel volume and location'], ['Mobile combustion evidence', 'Fleet carbon workflows', 'Operational audit trails', 'Emissions calculation inputs']),
  'api-csv': integration('API & CSV', 'structured file and API', ['Supplier master records', 'Facility and product data', 'Evidence metadata', 'Requirement and transaction inputs'], ['Fast implementation', 'Legacy-system ingestion', 'Bulk supplier onboarding', 'Custom compliance data flows']),
};

export const regulations: Record<string, SeoEntry> = {
  cbam: {
    title: 'EU CBAM Supplier Compliance Guide',
    description: 'Operational supplier compliance guidance for EU CBAM embedded-emissions evidence, product, facility and importer workflows.',
    h1: 'CBAM Supplier Compliance and Evidence Management',
    intro: 'CBAM requires importers and their supply chains to organize product, installation and embedded-emissions information in a repeatable, reviewable workflow. Emissa is designed to connect those records to supporting evidence and external requests.',
    keywords: ['CBAM supplier compliance', 'CBAM software', 'CBAM embedded emissions data', 'CBAM supplier evidence'],
    sections: [
      { title: 'Definitive regime', body: 'The European Commission states that the CBAM definitive regime applies from 1 January 2026. Covered imports include selected goods in cement, iron and steel, aluminium, fertilisers, electricity and hydrogen.' },
      { title: 'Supplier-side data problem', body: 'Importers need consistent information tied to the goods, production installation and embedded emissions behind the import. Suppliers often need to preserve methodology, source activity data and approval history so responses can be reproduced.' },
      { title: 'How Emissa structures the workflow', body: 'Emissa can organize product, facility, shipment, emissions and evidence records so the same approved installation data can support repeated importer requests rather than being rebuilt for every shipment.' },
      { title: 'Evidence controls', body: 'A defensible workflow should preserve calculation versions, source records, responsible owners, review status and the package actually released to the importer.' },
    ],
    faq: [['When did the definitive CBAM regime begin?', 'The European Commission states that it applies from 1 January 2026.'], ['Which sectors are covered?', 'The Commission identifies cement, iron and steel, aluminium, fertilisers, electricity and hydrogen among the covered sectors.'], ['Does Emissa determine legal applicability?', 'No. Emissa organizes data and workflows; legal applicability should be confirmed against current official guidance and professional advice.']],
    sources: [{ label: 'European Commission — CBAM definitive regime', url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en' }, { label: 'European Commission — CBAM legislation and guidance', url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en' }],
  },
  'reach-svhc': {
    title: 'REACH SVHC Supplier Compliance Software Guide',
    description: 'Manage REACH Candidate List and SVHC supplier evidence, article information and communication workflows.',
    h1: 'REACH and SVHC Supplier Compliance Infrastructure',
    intro: 'REACH can create information and communication obligations across complex product supply chains. Emissa is designed to connect article, supplier, substance and evidence records so teams can identify gaps and preserve approved responses.',
    keywords: ['REACH supplier compliance software', 'SVHC supplier data', 'REACH evidence management', 'Candidate List compliance'],
    sections: [
      { title: 'Why supplier data matters', body: 'ECHA explains that Candidate List substances in articles can trigger legal obligations for importers, producers and suppliers. Product teams therefore need reliable information from upstream suppliers.' },
      { title: 'Article-level evidence', body: 'For complex products, the useful operating model connects component or article records to supplier declarations, substance information, review dates and the products that depend on them.' },
      { title: 'Communication workflow', body: 'ECHA states that suppliers of articles containing a Candidate List substance above the applicable 0.1% w/w threshold have communication obligations under REACH Article 33. A system should preserve what was communicated, to whom and based on which evidence.' },
      { title: 'Emissa operating model', body: 'Emissa can centralize supplier declarations, article data, evidence ownership and buyer requests so the same reviewed information is reusable across product compliance workflows.' },
    ],
    faq: [['What is the Candidate List?', 'It is ECHA’s list of substances identified as substances of very high concern; inclusion can trigger obligations for certain articles.'], ['Can supplier declarations be reused?', 'Yes, when current and appropriately scoped, a controlled evidence record can support multiple products or customer requests.'], ['Does Emissa replace chemical or legal expertise?', 'No. It provides workflow and evidence infrastructure around the organization’s compliance process.']],
    sources: [{ label: 'ECHA — Candidate List substances in articles', url: 'https://echa.europa.eu/regulations/reach/candidate-list-substances-in-articles' }, { label: 'ECHA — REACH communication in the supply chain', url: 'https://echa.europa.eu/en-GB/regulations/reach/candidate-list-substances-in-articles/communication-in-the-supply-chain' }],
  },
  rohs: {
    title: 'RoHS Supplier Compliance and Evidence Guide',
    description: 'Centralize RoHS supplier declarations, product evidence, substance restrictions and review workflows.',
    h1: 'RoHS Supplier Compliance for Electrical and Electronic Products',
    intro: 'RoHS product compliance depends on reliable material, component and supplier evidence. Emissa can organize declarations, affected products, owners, review status and supporting documentation in one controlled layer.',
    keywords: ['RoHS supplier compliance software', 'RoHS declarations', 'RoHS evidence management', 'electrical product compliance'],
    sections: [
      { title: 'What RoHS addresses', body: 'The European Commission describes RoHS as EU rules restricting hazardous substances in electrical and electronic equipment to protect health and the environment.' },
      { title: 'Supplier evidence challenge', body: 'Manufacturers frequently depend on upstream declarations and material information. The operational challenge is keeping evidence current and tied to the exact products and components it supports.' },
      { title: 'Controlled product records', body: 'A practical system links products, suppliers, declarations, exemptions where relevant, source files, review dates and release decisions.' },
      { title: 'Buyer and audit readiness', body: 'When a customer or auditor requests proof, approved source evidence should be retrievable without rebuilding the product compliance file from email and shared drives.' },
    ],
    faq: [['What products can RoHS affect?', 'The European Commission describes the directive as applying broadly to electrical and electronic equipment, subject to scope and exclusions.'], ['What should a supplier record include?', 'At minimum: supplier identity, covered component or product, declaration or test evidence, date, owner and review status.'], ['Does Emissa certify RoHS compliance?', 'No. Emissa manages the data, evidence and workflow used by the organization’s compliance process.']],
    sources: [{ label: 'European Commission — RoHS Directive', url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/rohs-directive_en' }],
  },
  'pfas-tsca': {
    title: 'PFAS and TSCA Supplier Data Management Guide',
    description: 'Organize PFAS supplier evidence and TSCA reporting data with controlled product, supplier and source records.',
    h1: 'PFAS Supplier Data and TSCA Reporting Readiness',
    intro: 'PFAS requirements create a supplier-data problem before they become a reporting problem. Emissa can organize product, supplier, substance and evidence records so teams can document what they know, what is missing and what was reported.',
    keywords: ['PFAS supplier compliance software', 'TSCA PFAS reporting', 'PFAS supplier data', 'PFAS evidence management'],
    sections: [
      { title: 'Current EPA framework', body: 'EPA maintains dedicated guidance for TSCA Section 8(a)(7) PFAS reporting and recordkeeping, including reporting instructions, FAQs and a public list of PFAS for the rule.' },
      { title: 'Supplier information collection', body: 'Teams may need structured requests to suppliers for product composition, manufacturing context or supporting declarations. Each response should be linked to the products and reporting assumptions it supports.' },
      { title: 'Known, unknown and unsupported', body: 'A useful compliance system should distinguish verified evidence from supplier assertions, missing data and assumptions instead of flattening all responses into one status.' },
      { title: 'Audit trail', body: 'Preserve source files, request dates, supplier responses, internal review, calculation or reporting versions and the final information submitted.' },
    ],
    faq: [['Where should teams confirm current TSCA PFAS requirements?', 'EPA’s TSCA Section 8(a)(7) reporting and recordkeeping page and associated Federal Register materials are the authoritative starting point.'], ['Can Emissa collect supplier PFAS declarations?', 'The platform is designed to structure supplier evidence requests and preserve responses against supplier and product records.'], ['Is this legal advice?', 'No. Applicability, scope and reporting decisions should be confirmed against current EPA requirements and professional advice.']],
    sources: [{ label: 'US EPA — TSCA Section 8(a)(7) PFAS reporting', url: 'https://www.epa.gov/assessing-and-managing-chemicals-under-tsca/tsca-section-8a7-reporting-and-recordkeeping' }],
  },
  epr: {
    title: 'Extended Producer Responsibility Compliance Software Guide',
    description: 'Manage EPR producer obligations, supplier evidence, packaging data and jurisdiction workflows in one operating layer.',
    h1: 'Extended Producer Responsibility Compliance Infrastructure',
    intro: 'EPR programs shift responsibility for end-of-life management toward producers. The operational challenge is maintaining reusable product, packaging, supplier and jurisdiction data as requirements evolve.',
    keywords: ['EPR compliance software', 'extended producer responsibility software', 'producer responsibility data', 'packaging EPR compliance'],
    sections: [
      { title: 'What EPR means', body: 'The European Commission describes Extended Producer Responsibility as a concept under which producers bear financial responsibility, or financial and organisational responsibility, for the waste stage of a product’s life cycle.' },
      { title: 'Data model before filings', body: 'A scalable workflow separates stable product and packaging data from the jurisdiction-specific rules, reporting periods and submission requirements that consume it.' },
      { title: 'Supplier evidence', body: 'Packaging specifications and material composition may originate upstream. Emissa can preserve supplier documentation and approval history against product and packaging records.' },
      { title: 'Jurisdiction workflow', body: 'Teams can map products to markets, obligations, evidence and owners while keeping the underlying packaging master reusable across programs.' },
    ],
    faq: [['Why centralize EPR data?', 'The same packaging and product records can be reused across multiple reporting periods and jurisdictions.'], ['Does every EPR program use the same rules?', 'No. Requirements vary by jurisdiction and program, so applicability should be confirmed against current official rules.'], ['Can Emissa store supporting packaging evidence?', 'Yes. Evidence management is part of the supplier compliance operating model.']],
    sources: [{ label: 'European Commission — Waste Framework Directive', url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/waste-framework-directive_en' }],
  },
  'eu-packaging': {
    title: 'EU Packaging Compliance Supplier Data Guide',
    description: 'Structure supplier, product and packaging evidence for EU packaging compliance and EPR workflows.',
    h1: 'EU Packaging Compliance Data for Supplier Operations',
    intro: 'Packaging compliance depends on accurate material, weight, component, product and market data. Emissa is designed to organize those records with source evidence and jurisdiction workflows.',
    keywords: ['EU packaging compliance software', 'packaging supplier data', 'packaging EPR software', 'packaging evidence management'],
    sections: [
      { title: 'Build a packaging master', body: 'Create reusable records for packaging components, materials, weights, suppliers, products and markets instead of rebuilding the same inputs for each reporting cycle.' },
      { title: 'Preserve source evidence', body: 'Supplier specifications, bills of material and packaging declarations should remain connected to the values used for compliance reporting.' },
      { title: 'Separate data from rules', body: 'Stable packaging data should be maintained separately from changing jurisdiction requirements, fee logic, exemptions and filing periods.' },
      { title: 'Use the same evidence elsewhere', body: 'Approved packaging and supplier records may also support buyer questionnaires, sustainability requests and product documentation workflows.' },
    ],
    faq: [['What data should a packaging compliance system preserve?', 'Common operational fields include product, component, material, weight, supplier, market, source evidence and review status.'], ['Is packaging compliance only an EPR problem?', 'No. Packaging information can also support buyer, product and sustainability requests.'], ['Does Emissa determine local filing obligations?', 'No. The platform organizes data and workflows around requirements defined by the customer and authoritative sources.']],
    sources: [{ label: 'European Commission — Waste Framework Directive and EPR', url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/waste-framework-directive_en' }],
  },
  scip: {
    title: 'SCIP Supplier Evidence and Article Data Guide',
    description: 'Manage supplier article data and SVHC evidence for SCIP-related supply chain workflows.',
    h1: 'SCIP Article and Supplier Evidence Management',
    intro: 'SCIP-related workflows depend on knowing which articles and complex objects contain Candidate List SVHCs and preserving the supplier information used to support that determination.',
    keywords: ['SCIP database supplier software', 'SCIP supplier data', 'SVHC article data', 'SCIP evidence management'],
    sections: [
      { title: 'Know the article portfolio', body: 'ECHA guidance emphasizes identifying articles and complex objects containing Candidate List SVHCs above the applicable concentration threshold.' },
      { title: 'Map supplier inputs to products', body: 'Component evidence should be linked to the supplier and the complex products that use it so downstream changes can be traced.' },
      { title: 'Preserve submission-ready data', body: 'Structured article identifiers, supplier declarations, substance information and approval status reduce the work required to assemble external compliance records.' },
      { title: 'Manage change', body: 'Supplier, component or Candidate List changes should trigger targeted review instead of forcing teams to reassess every product manually.' },
    ],
    faq: [['What is the operational challenge behind SCIP?', 'Maintaining accurate article, component and SVHC information across complex supply chains.'], ['Can one supplier declaration support multiple products?', 'Potentially, when the scope is appropriate and the declaration is current; the system should preserve the relationship explicitly.'], ['Where should official requirements be checked?', 'ECHA’s SCIP and REACH guidance.']],
    sources: [{ label: 'ECHA — Suppliers of articles and SCIP', url: 'https://echa.europa.eu/en-GB/scip-suppliers-of-articles' }, { label: 'ECHA — Candidate List substances in articles', url: 'https://echa.europa.eu/regulations/reach/candidate-list-substances-in-articles' }],
  },
  'reach-registration': {
    title: 'REACH Registration Data and Evidence Guide',
    description: 'Structure REACH registration-related supplier, substance and source data with controlled evidence workflows.',
    h1: 'REACH Registration Data as a Controlled Compliance Workflow',
    intro: 'REACH registration requires companies in scope to collect information on substances, uses, hazards and risks. Emissa can support the surrounding evidence, ownership and supplier-data workflow without replacing ECHA systems.',
    keywords: ['REACH registration software', 'REACH supplier data', 'chemical compliance evidence', 'REACH workflow'],
    sections: [
      { title: 'ECHA registration framework', body: 'ECHA states that companies manufacturing or importing substances above the applicable threshold are responsible for collecting information on properties and uses and communicating required information through registration dossiers.' },
      { title: 'Internal evidence layer', body: 'Organizations still need a controlled internal record of source data, supplier inputs, ownership, review status and decisions before information reaches external regulatory systems.' },
      { title: 'Substance and supplier relationships', body: 'Map substances to suppliers, facilities, products and evidence so a change in one upstream record can be traced to affected workflows.' },
      { title: 'Emissa boundary', body: 'Emissa is intended to coordinate enterprise compliance data and workflow. It does not replace REACH-IT, IUCLID or regulatory submissions where those systems are required.' },
    ],
    faq: [['Does Emissa submit REACH registrations?', 'This page describes the internal data and evidence workflow. Official submissions should use the systems and procedures required by ECHA.'], ['Why store evidence outside the regulatory portal?', 'Internal teams need reusable supplier, product and approval records that can support other compliance requirements too.'], ['Where are official REACH registration requirements?', 'ECHA’s registration and REACH guidance pages.']],
    sources: [{ label: 'ECHA — Registration', url: 'https://echa.europa.eu/regulations/reach/registration' }, { label: 'ECHA — Understanding REACH', url: 'https://www.echa.europa.eu/regulations/reach/understanding-reach' }],
  },
};

const persona = (role: string, pains: string[], workflows: string[]): SeoEntry => ({
  title: `Supplier Compliance Software for ${role}`,
  description: `How ${role} can use Emissa to manage supplier evidence, requirements, risk and compliance workflows.`,
  h1: `Supplier Compliance Infrastructure for ${role}`,
  intro: `${role} need a controlled way to turn supplier data, evidence and requirements into accountable work. Emissa connects the records, owners and proof behind recurring compliance activity.`,
  keywords: [`supplier compliance software for ${role.toLowerCase()}`, `${role.toLowerCase()} supplier compliance`, 'supplier compliance platform'],
  sections: [
    { title: 'Where work breaks down', body: 'Supplier compliance becomes expensive when evidence, ownership and status are fragmented across email, spreadsheets, shared drives and disconnected systems.', bullets: pains },
    { title: `Priority workflows for ${role}`, body: 'Emissa gives teams a shared operating layer while keeping role-specific responsibilities visible.', bullets: workflows },
    { title: 'One evidence layer, multiple outcomes', body: 'Approved supplier, facility, product and source records can be reused across buyer requests, due diligence, certificates, carbon, product, trade and packaging workflows.' },
    { title: 'Executive visibility without losing detail', body: 'Leadership can see readiness, risk and overdue work while operators retain the source evidence and audit trail behind every status.' },
  ],
  faq: [['Does Emissa require replacing procurement or ERP systems?', 'No. Emissa is designed as a compliance operating layer that can consume relevant source-system data.'], [`What does ${role} see first?`, 'The product can prioritize obligations, evidence gaps, supplier risk, deadlines and assigned work relevant to the user.'], ['Can different teams use the same supplier record?', 'Yes. Shared supplier records reduce duplicate collection while permissions and workflow ownership preserve accountability.']],
});

export const personas: Record<string, SeoEntry> = {
  procurement: persona('Procurement Teams', ['Supplier onboarding lives outside sourcing tools', 'Risk findings are disconnected from purchasing decisions', 'Compliance teams repeatedly ask procurement for supplier data'], ['Supplier onboarding requirements', 'Supplier risk prioritization', 'Evidence requests', 'Corrective actions and approvals']),
  compliance: persona('Compliance Managers', ['Requirements are spread across regulations and customer requests', 'Evidence expires without clear ownership', 'Audit preparation becomes a manual reconstruction'], ['Requirement management', 'Evidence Vault', 'CAPA and remediation', 'Audit-ready reporting']),
  sustainability: persona('Sustainability Teams', ['Carbon and supplier evidence are stored separately', 'Buyer questionnaires repeat the same requests', 'Product and packaging data are difficult to reuse'], ['Scope 3 supplier data', 'Product carbon footprints', 'Buyer sustainability requests', 'EPR and packaging evidence']),
  'supplier-quality': persona('Supplier Quality Teams', ['Quality and compliance findings are tracked in different systems', 'CAPA evidence is inconsistent', 'Supplier status lacks one source of truth'], ['Supplier 360', 'Corrective actions', 'Document and certificate reviews', 'Risk scoring']),
  operations: persona('Operations Teams', ['Facility evidence is fragmented', 'Deadlines depend on manual reminders', 'Data must be re-keyed into compliance requests'], ['Facility records', 'Workflow automation', 'Evidence ownership', 'Operational compliance dashboards']),
  legal: persona('Legal Teams', ['Legal review arrives late in the workflow', 'Teams cannot easily prove which evidence supported a decision', 'Requirements change without structured impact analysis'], ['Requirement review', 'Approval history', 'Evidence traceability', 'Regulatory intelligence']),
  finance: persona('Finance Teams', ['Compliance cost is hard to trace to suppliers and products', 'Carbon and EPR data are disconnected from financial records', 'Leadership lacks a single readiness view'], ['Cost and exposure context', 'ERP and accounting integrations', 'Supplier risk rollups', 'Executive reporting']),
};

const comparison = (a: string, b: string, distinctions: string[]): SeoEntry => ({
  title: `${a} vs ${b}: Supplier Compliance Buyer Guide`,
  description: `Compare ${a} with ${b} and understand which workflows belong in a supplier compliance operating system.`,
  h1: `${a} vs ${b}: What Supplier Compliance Teams Actually Need`,
  intro: `The categories can overlap, but they solve different operating problems. The useful question is where supplier requirements, evidence, ownership, approvals and reusable data should live.`,
  keywords: [`${a.toLowerCase()} vs ${b.toLowerCase()}`, 'supplier compliance software comparison', 'supplier compliance platform buyers guide'],
  sections: [
    { title: `What ${a} is best at`, body: `${a} can be valuable when it is used for the workflows and records it was designed to own. The issue begins when teams force supplier compliance evidence and approvals into a system that cannot preserve the required relationships.` },
    { title: `What ${b} is best at`, body: `${b} serves a different primary job. Emissa is designed to coexist with adjacent systems and use relevant source data rather than requiring the customer to replace everything.` },
    { title: 'Where the difference matters', body: 'Evaluate systems against the operating model, not the number of dashboards.', bullets: distinctions },
    { title: 'Evaluation checklist', body: 'Ask whether the platform can connect suppliers, products, facilities, requirements, evidence, owners, approvals and historical versions—and whether the same approved data can be reused across workflows.' },
  ],
  faq: [['Should one system replace the other?', 'Usually not. The stronger architecture assigns each system a clear system-of-record role and connects them.'], ['What is the key supplier compliance differentiator?', 'Evidence reuse with explicit requirement, ownership, approval and audit relationships.'], ['What should buyers test in a demo?', 'Import real supplier records, create a requirement, request evidence, route an exception and prove the final approved output.']],
});

export const comparisons: Record<string, SeoEntry> = {
  'supplier-compliance-vs-spreadsheets': comparison('Supplier Compliance Software', 'Spreadsheets', ['Central evidence ownership', 'Automatic deadline and expiration workflows', 'Reusable supplier records', 'Role-based access and audit history']),
  'supplier-compliance-vs-esg': comparison('Supplier Compliance Software', 'ESG Software', ['Operational requirement management versus disclosure-first workflows', 'Supplier evidence and approvals', 'Buyer request operations', 'Product, trade and packaging compliance']),
  'supplier-compliance-vs-procurement': comparison('Supplier Compliance Software', 'Procurement Software', ['Compliance evidence versus sourcing transactions', 'Regulatory and buyer requirements', 'Corrective actions and document controls', 'Reuse of procurement data as compliance inputs']),
  'supplier-compliance-vs-grc': comparison('Supplier Compliance Software', 'GRC Software', ['Supplier and product-level evidence', 'External supplier collaboration', 'Buyer request workflows', 'Operational evidence collection rather than enterprise control registers alone']),
  'supplier-compliance-vs-risk': comparison('Supplier Compliance Software', 'Supplier Risk Management', ['Proving compliance versus identifying risk', 'Evidence collection and document control', 'Requirement-specific approvals', 'Corrective action execution']),
  'supplier-compliance-vs-carbon': comparison('Supplier Compliance Software', 'Carbon Accounting Software', ['Carbon as one reusable supplier data use case', 'Product, packaging and trade requirements', 'Buyer evidence requests', 'Certificates, due diligence and supplier remediation']),
  'supplier-compliance-platform-buyers-guide': comparison('Enterprise Supplier Compliance Platform', 'Point Solutions', ['One supplier and evidence graph', 'Shared integrations', 'Cross-workflow audit trail', 'Lower duplicate data collection']),
};

const template = (name: string, fields: string[]): SeoEntry => ({
  title: `${name} Template`,
  description: `Use this ${name.toLowerCase()} structure to organize supplier compliance data, evidence and ownership before automating the workflow in Emissa.`,
  h1: `${name} Template for Supplier Compliance Teams`,
  intro: 'A useful template should do more than collect answers. It should define the records, evidence, owners and review states that later become an automated workflow.',
  keywords: [`${name.toLowerCase()} template`, 'supplier compliance template', 'supplier compliance checklist'],
  sections: [
    { title: 'Recommended fields', body: 'Start with a controlled set of fields that can be mapped into your supplier compliance system of record.', bullets: fields },
    { title: 'Evidence requirements', body: 'For every material assertion, define the source document or data record required to support it. Capture issue date, expiration date, owner and review status where applicable.' },
    { title: 'Workflow ownership', body: 'Separate the person supplying information from the person approving it. Exceptions should create assigned remediation rather than disappearing into comments.' },
    { title: 'Move from template to system', body: 'Once the structure is validated, import or configure the fields in Emissa so future requests, reminders and reviews use the same controlled record.' },
  ],
  faq: [['Can I use this structure in a spreadsheet first?', 'Yes. The template is intended to help teams establish a clean data model before or during implementation.'], ['Should every supplier receive every field?', 'No. Requirements should vary by supplier type, product, geography, risk and business relationship.'], ['Can Emissa automate the resulting workflow?', 'The platform is designed to convert structured requirements into evidence requests, reviews, deadlines and reusable records.']],
});

export const templates: Record<string, SeoEntry> = {
  'supplier-compliance-checklist': template('Supplier Compliance Checklist', ['Supplier identity and ownership', 'Applicable requirements', 'Required certificates and declarations', 'Evidence status', 'Open exceptions', 'Next review date']),
  'supplier-questionnaire': template('Supplier Compliance Questionnaire', ['Company and facility profile', 'Product or service scope', 'Policy and certification evidence', 'Product/material declarations', 'Sustainability and emissions data', 'Attestation and approver']),
  'evidence-matrix': template('Supplier Evidence Matrix', ['Requirement', 'Evidence type', 'Supplier/product scope', 'Source file', 'Owner', 'Approval status', 'Expiration or review date']),
  'certificate-tracker': template('Supplier Certificate Tracker', ['Certificate type', 'Supplier', 'Issuing body', 'Effective date', 'Expiration date', 'Owner', 'Approval state', 'Requirements supported']),
  capa: template('Supplier CAPA', ['Finding', 'Root cause', 'Containment action', 'Corrective action', 'Preventive action', 'Owner', 'Due date', 'Verification evidence', 'Closure approval']),
  'cbam-data': template('CBAM Supplier Data', ['Product/CN context', 'Production installation', 'Reporting period', 'Production quantity', 'Direct emissions inputs', 'Indirect emissions inputs where applicable', 'Methodology evidence', 'Reviewer']),
  'epr-packaging': template('EPR Packaging Data', ['Product/SKU', 'Packaging component', 'Material', 'Weight', 'Supplier', 'Market/jurisdiction', 'Source specification', 'Review date']),
  'supplier-due-diligence': template('Supplier Due Diligence Checklist', ['Trigger and scope', 'Risk classification', 'Required evidence', 'Screening findings', 'Reviewer', 'Exceptions', 'Remediation', 'Approval decision', 'Next review']),
};

const doc = (name: string, purpose: string, steps: string[]): SeoEntry => ({
  title: `${name} Documentation | Emissa`,
  description: `${name} product documentation for configuring supplier compliance workflows in Emissa.`,
  h1: `${name}`,
  intro: purpose,
  keywords: [`Emissa ${name.toLowerCase()}`, 'Emissa documentation', 'supplier compliance software documentation'],
  sections: [
    { title: 'Core workflow', body: 'Use the feature as part of a controlled supplier compliance record rather than an isolated task.', bullets: steps },
    { title: 'Data and ownership', body: 'Every important record should have a clear organization, owner, status and relationship to the supplier, facility, product, requirement or evidence it supports.' },
    { title: 'Auditability', body: 'Preserve source references, changes, review states and completion history so teams can explain how a compliance decision was reached.' },
    { title: 'Implementation guidance', body: 'Start with one production workflow, validate the fields and ownership model, then expand the configuration across adjacent requirements.' },
  ],
  faq: [['Is this documentation public?', 'This guide covers general product workflow concepts. Customer-specific configuration and sensitive data remain inside the authenticated workspace.'], ['Can configuration vary by organization?', 'Yes. Supplier types, requirements, approval roles and integrations can differ by customer environment.'], ['Where should implementation begin?', 'Begin with the highest-value recurring workflow and the minimum reusable data model needed to support it.']],
});

export const docs: Record<string, SeoEntry> = {
  'supplier-master': doc('Supplier Master', 'Create controlled supplier records that become the shared identity layer for evidence, risk, requirements and product relationships.', ['Create or import supplier', 'Add country, contact and operating context', 'Link facilities and products', 'Assign requirements and owners']),
  'supplier-360': doc('Supplier 360', 'Review supplier identity, risk, evidence, obligations, CBAM records, product footprints and open actions from one profile.', ['Open supplier profile', 'Review readiness and risk', 'Inspect linked evidence and records', 'Assign follow-up work']),
  'evidence-vault': doc('Evidence Vault', 'Store and review compliance source documents with ownership, integrity metadata and links to the records they support.', ['Upload or register evidence', 'Assign supplier or requirement context', 'Review status and metadata', 'Reuse approved evidence']),
  workflows: doc('Workflow Studio', 'Create repeatable requirement workflows with owners, review stages, due dates and completion states.', ['Define requirement', 'Request data or evidence', 'Validate', 'Review', 'Approve or remediate', 'Complete and preserve history']),
  'requirements-engine': doc('Compliance Requirement Engine', 'Translate buyer, regulatory and internal requirements into structured obligations that can be assigned and tracked.', ['Define requirement type', 'Set applicability', 'Assign organization and owner', 'Set due date', 'Attach required evidence']),
  capa: doc('Corrective Actions / CAPA', 'Turn supplier findings into assigned root-cause and remediation workflows with evidence-backed closure.', ['Create finding', 'Document root cause', 'Assign corrective action', 'Track deadline', 'Verify evidence', 'Approve closure']),
  'risk-scoring': doc('Supplier Risk Scoring', 'Use supplier profile completeness, linked compliance records and workflow status to prioritize review and remediation.', ['Review risk band', 'Inspect contributing gaps', 'Validate missing records', 'Assign remediation', 'Recalculate as evidence improves']),
  reporting: doc('Compliance Reporting', 'Turn current supplier, evidence and obligation records into leadership, buyer and audit-ready views.', ['Choose reporting scope', 'Confirm record freshness', 'Resolve unsupported claims', 'Generate controlled output', 'Preserve release history']),
};

export type AssessmentTool = SeoEntry & { questions: string[]; low: string; medium: string; high: string };
const assessment = (name: string, description: string, questions: string[], low: string, medium: string, high: string): AssessmentTool => ({
  title: `${name} | Free Supplier Compliance Tool`, description, h1: name, intro: description,
  keywords: [`${name.toLowerCase()}`, 'supplier compliance assessment', 'supplier compliance calculator'],
  questions, low, medium, high,
  sections: [
    { title: 'How to use the score', body: 'Treat the score as an operating diagnostic, not a legal conclusion. Use the result to identify the records, evidence and ownership gaps that should be corrected first.' },
    { title: 'What good readiness looks like', body: 'Mature programs know which suppliers and products are in scope, what evidence is required, who owns each requirement, when records expire and how approved information can be reused.' },
    { title: 'Turn the result into a workflow', body: 'Emissa can convert the identified gaps into assigned evidence requests, obligations, corrective actions and recurring reviews.' },
  ],
  faq: [['Is this a legal compliance determination?', 'No. It is an operational readiness assessment.'], ['Does the tool store sensitive supplier data?', 'The public assessment is designed around yes/no operating questions rather than confidential supplier records.'], ['What should I do with a low score?', 'Start with supplier identity, requirement ownership and evidence freshness before adding more complex automation.']],
});

export const tools: Record<string, AssessmentTool> = {
  'supplier-compliance-readiness': assessment('Supplier Compliance Readiness Score', 'Score whether your supplier compliance program has the records, evidence, ownership and workflows needed for repeatable execution.', ['Do you maintain one controlled supplier master?', 'Are applicable requirements mapped to suppliers or products?', 'Does every critical requirement have an owner?', 'Can you see evidence expiration dates?', 'Can approved evidence be reused across requests?', 'Are exceptions assigned to corrective actions?', 'Can you reproduce what evidence supported a prior approval?', 'Do leadership dashboards use current production records?'], 'Your foundation needs work. Start with supplier identity, requirement ownership and evidence control.', 'You have a workable foundation, but important evidence reuse or workflow controls are still manual.', 'Your operating model is positioned for automation, scale and cross-workflow evidence reuse.'),
  'certificate-risk': assessment('Supplier Certificate Expiration Risk Score', 'Assess whether certificate tracking exposes the organization to avoidable supplier compliance gaps.', ['Do all required certificates have expiration dates?', 'Is a responsible renewal owner assigned?', 'Do you receive reminders before expiration?', 'Can expired evidence be blocked from reuse?', 'Are certificates linked to the requirements they support?', 'Can supplier and product impact be identified quickly?', 'Is renewal history preserved?', 'Can leadership see expiring critical evidence?'], 'Certificate control is reactive and likely dependent on manual chasing.', 'Basic tracking exists, but renewals or impact analysis remain vulnerable to manual gaps.', 'Certificate controls are structured enough for proactive renewal and evidence governance.'),
  'buyer-request-readiness': assessment('Buyer Compliance Request Readiness Score', 'Measure how quickly your team can answer recurring buyer questionnaires and evidence requests from approved records.', ['Are buyer requests logged with owner and deadline?', 'Do you maintain an approved answer library?', 'Are answers linked to supporting evidence?', 'Can responses be reused across buyers?', 'Can you distinguish current from expired evidence?', 'Are approval steps recorded?', 'Can missing data be routed to suppliers?', 'Can turnaround time be measured?'], 'Buyer requests are being rebuilt manually and create material response risk.', 'Some reusable content exists, but evidence or approval controls need improvement.', 'Your team has the foundation for fast, defensible buyer-request operations.'),
  'evidence-gap': assessment('Supplier Evidence Gap Score', 'Identify whether supplier compliance claims are supported by current, approved and traceable evidence.', ['Are required evidence types defined for each requirement?', 'Is every evidence item linked to a supplier, product or facility?', 'Is source provenance recorded?', 'Is approval status explicit?', 'Are review and expiration dates visible?', 'Can duplicate or superseded files be identified?', 'Are missing records assigned to an owner?', 'Can one evidence item support multiple requirements?'], 'Evidence is fragmented and difficult to defend or reuse.', 'Evidence is partially controlled, but important traceability or reuse gaps remain.', 'Your evidence layer is structured for auditability and cross-workflow reuse.'),
};

export const hubs = {
  integrations: { title: 'Supplier Compliance Integrations', description: 'Connect ERP, procurement, accounting, utility, fleet, commerce and communication data to Emissa supplier compliance workflows.' },
  regulations: { title: 'Regulatory Intelligence Library', description: 'Operational guides for supplier evidence and data workflows around CBAM, REACH, RoHS, PFAS, EPR and related requirements.' },
  for: { title: 'Emissa by Team', description: 'Supplier compliance infrastructure for procurement, compliance, sustainability, supplier quality, operations, legal and finance teams.' },
  compare: { title: 'Supplier Compliance Software Comparisons', description: 'Evaluate supplier compliance software against spreadsheets, ESG, procurement, GRC, risk and carbon tools.' },
  templates: { title: 'Supplier Compliance Templates', description: 'Practical checklists, evidence matrices, questionnaires, CAPA structures and regulatory data templates.' },
  docs: { title: 'Emissa Product Documentation', description: 'Public product workflow documentation for Supplier 360, Evidence Vault, Workflow Studio, CAPA, risk and reporting.' },
  tools: { title: 'Free Supplier Compliance Tools', description: 'Interactive readiness assessments for supplier compliance, certificates, buyer requests and evidence quality.' },
} as const;
