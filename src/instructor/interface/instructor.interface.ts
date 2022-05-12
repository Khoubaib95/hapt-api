import { GenderType, UidType } from 'src/client/interface/client.interface';

export interface Instructor {
  fullname: string;
  uid: {
    value: string;
    type: UidType;
  };
  gender?: GenderType;
  birthdate?: Date;
  phone: string;
  email: string;
  scolar: {
    level: number;
    diploma?: string;
  };
  job: {
    title: string;
    place: string;
    exp: string;
  };
  note?: string;
  address: {
    street: string;
    city: string;
    zip: number;
  };
}
