import type { SeoEntry } from './seoExpansionContent';

export type RelatedLink={href:string;label:string;reason:string};

type Rule={signals:string[];links:RelatedLink[]};

const rules:Rule[]=[
  {signals:['cbam','embedded emissions','steel','aluminium','aluminum'],links:[
    {href:'/tools/cbam-readiness',label:'CBAM readiness assessment',reason:'Test the data controls behind the requirement'},
    {href:'/templates/cbam-data',label:'CBAM supplier data template',reason:'Structure installation and evidence inputs'},
    {href:'/platform/evidence-vault',label:'Evidence Vault',reason:'Control source records and approval history'},
    {href:'/software/supplier-document-management-software',label:'Supplier document management software',reason:'Manage reusable source evidence'},
    {href:'/industries/metals-cbam-compliance',label:'Metals & CBAM compliance',reason:'See the industry operating model'},
  ]},
  {signals:['eudr','deforestation','coffee','cocoa','rubber','timber','soy','cattle'],links:[
    {href:'/tools/eudr-readiness',label:'EUDR readiness assessment',reason:'Score traceability and due-diligence controls'},
    {href:'/templates/due-diligence',label:'Supplier due-diligence template',reason:'Structure supplier review and evidence'},
    {href:'/software/supplier-due-diligence-software',label:'Supplier due diligence software',reason:'Turn findings into controlled work'},
    {href:'/platform/supplier-360',label:'Supplier 360',reason:'Connect origin evidence to supplier records'},
    {href:'/platform/workflow-studio',label:'Workflow Studio',reason:'Assign missing evidence and remediation'},
  ]},
  {signals:['epr','packaging','producer responsibility'],links:[
    {href:'/templates/epr-packaging',label:'EPR packaging data template',reason:'Structure packaging and supplier inputs'},
    {href:'/solutions/epr-compliance',label:'EPR compliance solution',reason:'Connect jurisdiction requirements to reusable records'},
    {href:'/industries/packaging-epr-compliance',label:'Packaging EPR compliance',reason:'See the packaging-focused workflow'},
    {href:'/platform/regulatory-intelligence',label:'Regulatory Intelligence',reason:'Track requirements and effective dates'},
    {href:'/platform/evidence-vault',label:'Evidence Vault',reason:'Preserve packaging source evidence'},
  ]},
  {signals:['reach','rohs','pfas','scip','material declaration','product compliance','battery passport','digital product passport'],links:[
    {href:'/product-compliance',label:'Product compliance hub',reason:'Explore the broader product evidence architecture'},
    {href:'/platform/evidence-vault',label:'Evidence Vault',reason:'Connect declarations to products and requirements'},
    {href:'/software/supplier-document-management-software',label:'Supplier document management',reason:'Control declarations and source documents'},
    {href:'/templates/evidence-matrix',label:'Supplier evidence matrix',reason:'Map evidence to requirements and owners'},
    {href:'/platform/supplier-360',label:'Supplier 360',reason:'Trace product evidence back to suppliers'},
  ]},
  {signals:['certificate','expiration'],links:[
    {href:'/tools/supplier-certificate-risk-calculator',label:'Certificate risk calculator',reason:'Score expiration and review exposure'},
    {href:'/templates/certificate-tracker',label:'Supplier certificate tracker',reason:'Use a structured certificate control model'},
    {href:'/software/supplier-certificate-management-software',label:'Certificate management software',reason:'Automate ownership and expiration workflows'},
    {href:'/platform/evidence-vault',label:'Evidence Vault',reason:'Keep certificate evidence and history controlled'},
  ]},
  {signals:['questionnaire','buyer request','customer compliance'],links:[
    {href:'/software/supplier-questionnaire-software',label:'Supplier questionnaire software',reason:'Reuse approved answers and evidence'},
    {href:'/platform/buyer-requests',label:'Buyer Compliance Requests',reason:'Manage request intake through delivery'},
    {href:'/templates/supplier-questionnaire',label:'Supplier questionnaire template',reason:'Start with a controlled question structure'},
    {href:'/tools/buyer-compliance-readiness',label:'Buyer request readiness assessment',reason:'Score response readiness'},
  ]},
  {signals:['capa','corrective action','audit'],links:[
    {href:'/software/supplier-capa-software',label:'Supplier CAPA software',reason:'Manage remediation and verified closure'},
    {href:'/templates/capa',label:'Supplier CAPA template',reason:'Structure findings and corrective actions'},
    {href:'/platform/capa',label:'Corrective Action Management',reason:'Connect findings to ownership and evidence'},
    {href:'/software/supplier-audit-management-software',label:'Supplier audit management software',reason:'Carry findings into accountable remediation'},
  ]},
  {signals:['supplier compliance software','supplier compliance platform','supplier compliance management'],links:[
    {href:'/platform',label:'Emissa platform',reason:'See the full supplier compliance operating layer'},
    {href:'/compare/supplier-compliance-platform-buyers-guide',label:'Supplier compliance buyer guide',reason:'Evaluate platform architecture and controls'},
    {href:'/tools/supplier-compliance-maturity-assessment',label:'Supplier compliance maturity assessment',reason:'Benchmark the current operating model'},
    {href:'/research/maturity-model',label:'Supplier Compliance Maturity Model',reason:'Understand the path from reactive to infrastructure'},
    {href:'/demo',label:'Private product demo',reason:'See the workflow end to end'},
  ]},
];

const fallback:RelatedLink[]=[
  {href:'/software/supplier-compliance-software',label:'Supplier Compliance Software',reason:'Connect this topic to the commercial category'},
  {href:'/platform/supplier-360',label:'Supplier 360',reason:'See how supplier records support the workflow'},
  {href:'/platform/evidence-vault',label:'Evidence Vault',reason:'Connect requirements to controlled evidence'},
  {href:'/tools',label:'Free compliance tools',reason:'Assess readiness and evidence gaps'},
  {href:'/templates',label:'Supplier compliance templates',reason:'Use structured operating templates'},
];

export function getRelatedLinks(entry:SeoEntry,currentPath:string,max=6):RelatedLink[]{
  const haystack=[entry.title,entry.description,entry.h1,entry.intro,...entry.keywords,...entry.sections.flatMap(section=>[section.title,section.body,...(section.bullets||[])])].join(' ').toLowerCase();
  const ranked=rules
    .map(rule=>({score:rule.signals.reduce((sum,signal)=>sum+(haystack.includes(signal.toLowerCase())?1:0),0),links:rule.links}))
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score)
    .flatMap(item=>item.links);
  const merged=[...ranked,...fallback];
  const seen=new Set<string>();
  return merged.filter(link=>{
    if(link.href===currentPath||seen.has(link.href))return false;
    seen.add(link.href);
    return true;
  }).slice(0,max);
}
