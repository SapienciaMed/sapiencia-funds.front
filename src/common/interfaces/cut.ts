export interface ICut {
  id?: number;
  name: string;
  from: string;
  until: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface ICutSearch {
  name: string;
  from: string;
  until: string;
}
