import { Lead } from '../../lead/inteface/lead.interface';

export enum UidType {
  CIN = 0,
  PASSPORT = 1,
  DRIVER_LICE = 2,
  MAT_FISC = 3,
  OTHER = 4,
}

export enum GenderType {
  MALE = 'm',
  FEMALE = 'f',
}

export interface Client extends Lead {
  fullname: string;
  uid: {
    value: string;
    type: UidType;
  };
  gender?: GenderType;
  birthdate?: Date;
  scolar: {
    level: number;
    diploma?: string;
  };
  note?: string;
  address: {
    street: string;
    city: string;
    zip: number;
  };
}
