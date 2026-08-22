export type ProductVideo={
  title:string;
  description:string;
  embedUrl:string;
  uploadDate:string;
  duration?:string;
  thumbnailUrl:string;
  transcript:string[];
  related:{label:string;href:string}[];
};

// Add only real, published Emissa product videos. Empty by design so no synthetic VideoObject pages are indexed.
export const productVideos:Record<string,ProductVideo>={};
