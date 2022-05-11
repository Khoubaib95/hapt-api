import { getHello } from '../@types';
// API Global Prefix
export const appGlobalPrefix = 'api';
export const apiVersion = 'v1';
// Entry Point Message
export const getEntryPointHello: getHello = {
  status: 'OK',
  message: 'Welcom to HAPT API.',
  version: '0.0.1',
  name: 'hapt_api',
  website: 'hapt.tn',
  contact: 'contact@hapt.com " NOT YET SUPPORTED "',
};
// JWT Constants
export const jwtConstants = {
  jwt_secret: process.env.JWT_SECRET,
  jwt_life: '8h',
};
