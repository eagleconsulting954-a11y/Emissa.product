import type { Metadata } from 'next';

/** Keep authenticated, preview and operational application surfaces out of search results. */
export const privateRouteMetadata:Metadata={
  robots:{
    index:false,
    follow:false,
    nocache:true,
    googleBot:{index:false,follow:false,noimageindex:true},
  },
};
