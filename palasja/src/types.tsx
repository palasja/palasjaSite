type Organization = {
  id: string;
  name: string
}
type Contract = {
  id: string;
  number: string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  scan: Blob;
  orgId: string;
}
type Personal = {
  id: string;
  lastName: string;
  middleName: string;
  firstName: string;
  headPosition: string;
  signPosition: string;
  orgId: string;
}

type Service = {
  id: string;
  name: string;
  date: Date;
  user: string;
  place: string;
  cost: number;
  count: number;
  orgId: string;
}
export type {Organization, Contract, Personal, Service}