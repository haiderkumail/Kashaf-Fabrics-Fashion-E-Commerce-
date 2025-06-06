import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const round2 = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

// export const convertDocToObj = (doc: any) => {
//   doc._id = doc._id.toString();
//   return doc;
// };

export function convertDocToObj(doc: any) {
  return {
    ...doc,
    _id: doc._id?.toString?.(),
    createdAt: doc.createdAt?.toString?.(),
    updatedAt: doc.updatedAt?.toString?.(),
    colors: doc.colors?.map((color: any) => ({
      ...color,
      _id: color._id?.toString?.(),
    })),
    sizes: doc.sizes || [],
  };
}



export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
