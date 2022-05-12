export enum LeadType {
  INDIVIDUAL = 0,
  COMPANY = 1,
}

export interface Lead {
  fullname?: string;
  email?: string;
  phone: string;
  type?: LeadType;
  interest?: string;
  referer?: string;
}
