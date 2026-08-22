export type RegulatoryStatus={status:'Active'|'Upcoming'|'Implementing'|'Monitor';nextMilestone:string;reviewed:string};

const reviewed='August 22, 2026';
export const regulatoryStatus:Record<string,RegulatoryStatus>={
  cbam:{status:'Active',nextMilestone:'Definitive regime is active; monitor current Commission implementation and sector guidance.',reviewed},
  eudr:{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eu-battery-passport':{status:'Upcoming',nextMilestone:'February 18, 2027 — passport requirement for specified battery categories.',reviewed},
  'espr-digital-product-passport':{status:'Implementing',nextMilestone:'DPP Registry is operational; monitor product-specific delegated acts and effective dates.',reviewed},
  'epr-california':{status:'Active',nextMilestone:'Permanent regulations are effective; monitor PRO plan implementation and reporting guidance.',reviewed},
  'epr-oregon':{status:'Active',nextMilestone:'Program launched in 2025; monitor DEQ rule updates and annual PRO requirements.',reviewed},
  'epr-maine':{status:'Implementing',nextMilestone:'Stewardship Organization selection and revised registration/invoicing schedule.',reviewed},
  'epr-minnesota':{status:'Implementing',nextMilestone:'2027–2028 program structure and stewardship-plan development.',reviewed},
  'epr-maryland':{status:'Active',nextMilestone:'Implement current producer registration, reporting and recordkeeping requirements.',reviewed},
  'epr-colorado':{status:'Implementing',nextMilestone:'Monitor CDPHE and approved program guidance for current producer obligations and reporting.',reviewed},
  'epr-uk':{status:'Active',nextMilestone:'Use current 2026 registration/reporting guidance and regulator technical interpretations.',reviewed},
  'epr-eu-packaging':{status:'Implementing',nextMilestone:'Monitor current EU packaging implementing measures and product-specific obligations.',reviewed},
  'epr-germany':{status:'Active',nextMilestone:'Maintain LUCID/system-participation records and monitor current Packaging Act guidance.',reviewed},
  'epr-france':{status:'Active',nextMilestone:'Monitor ADEME and applicable producer-responsibility organization requirements by product category.',reviewed},
  'cbam-steel':{status:'Active',nextMilestone:'Definitive CBAM regime is active; maintain current Commission methodology and CN-code scope.',reviewed},
  'cbam-aluminium':{status:'Active',nextMilestone:'Definitive CBAM regime is active; maintain current Commission methodology and CN-code scope.',reviewed},
  'cbam-cement':{status:'Active',nextMilestone:'Definitive CBAM regime is active; maintain current Commission methodology and CN-code scope.',reviewed},
  'cbam-fertilizers':{status:'Active',nextMilestone:'Definitive CBAM regime is active; maintain current Commission methodology and CN-code scope.',reviewed},
  'eudr-coffee':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eudr-cocoa':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eudr-rubber':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eudr-timber':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eudr-soy':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
  'eudr-cattle':{status:'Upcoming',nextMilestone:'December 30, 2026 — current Commission application date for large and medium operators.',reviewed},
};
