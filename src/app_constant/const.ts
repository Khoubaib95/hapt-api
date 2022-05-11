export type getHello = {
  message: string;
  version: string;
  name: string;
  website: string;
  contact: string;
};
export const appGlobalPrefix = 'api';
export const apiVersion = 'v1';
export const getEntryPointHello: getHello = {
  message: 'Welcom to HAPT API.',
  version: '0.0.1',
  name: 'hapt_api',
  website: 'hapt.tn',
  contact: 'contact@hapt.com " NOT YET SUPPORTED "',
};
