export type Organization = {
  id: number;
  name: string;
};
export type Contract = {
  id: number;
  number: string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  scan: Blob;
  orgId: string;
};
export type Personal = {
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

export type Service = {
  id: number;
  name: string;
  date: Date;
  user: string;
  place: string;
  cost: number;
  time: number;
  count: number;
  orgId?: string;
  description: string;
  ispaid: boolean;
};

export type ServiceCostChange = {
  id: number;
  date: Date;
  user: string;
  newCost: number;
  serviceId: number;
};

export type ServiceCost = Pick<Service, 'id' | 'cost' | 'count' | 'orgId' | 'date'>;

export type CreateService = Omit<Service, 'id'>;
export type ActInfo = {
  contract: Contract;
  persons: Personal[];
  services: Service[];
};

export interface User {
  login: string;
  password: string;
}

export type FetchStatus = 'idle' | 'pending' | 'succeeded' | 'rejected';

export type OrgMonthPayment = {
  orgId: number | null;
  month: string;
  year: string;
  isPaid?: boolean;
};

export type MonthYear = {
  month: string;
  year: string;
};

export type ContractScan = {
  orgId: number | null;
};

export type OrganizationCost = { orgId?: string; cost: number };

export type SoftInfoContentType = { type: 'text' | 'image'; id: string; value?: string };
export type SoftArticleLink = {
  id: string;
  name: string;
  url: string;
  softArticleId: string;
};
export type NewSoftArticleLink = Omit<SoftArticleLink, 'id'>;
export type SoftArticle = {
  id: string;
  name: string;
  info: string;
  softInfoId: string;
};
export type SoftInfoForm = SoftArticle & { softLinks: SoftArticleLink[] };
export type ArticlesName = { id: string; name: string };
export type SoftInfo = {
  id: string;
  name: string;
  softArticle: ArticlesName[];
};

export type OrgInfo = 'org' | 'service' | 'contract' | 'personal' | 'act' | null;
export type Software = 'info' | 'article' | null;
export type OrgInfoAction = 'change' | 'add' | 'show' | null;
export type ArtileAction = 'show' | 'change' | 'new';
