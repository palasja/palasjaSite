type Organization = {
  id: number;
  name: string;
};
type Contract = {
  id: number;
  number: string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  scan: Blob;
  orgId: string;
};
type Personal = {
  id: number;
  lastName: string;
  middleName: string;
  firstName: string;
  lastNameR?: string;
  middleNameR?: string;
  firstNameR?: string;
  positionName: string;
  isHead: boolean;
  orgId: string;
};

type Service = {
  id: number;
  name: string;
  date: Date;
  user: string;
  place: string;
  cost: number;
  count: number;
  orgId?: string;
};

type CreateService = Omit<Service, 'id'>;
type ActInfo = {
  contract: Contract;
  persons: Personal[];
  services: Service[];
};

interface User {
  login: string;
  password: string;
}
export type { Organization, Contract, Personal, Service, ActInfo, User, CreateService };
