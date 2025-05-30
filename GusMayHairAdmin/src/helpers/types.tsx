type DescItem = {
  id: number;
  name: string;
  cost?: number;
  minCost?: number;
  maxCost?: number;
};
type CostItem = {
  id: number;
  name: string;
  cost?: number;
  minCost?: number;
  maxCost?: number;
  descTitle: string;
  descContent: string | null;
  descComment?: string;
  serviceDesc: DescItem[];
};

type CostUpdateItem = {
  id: number;
  cost?: number;
  minCost?: number;
  maxCost?: number;
};

type CostInfo = {
  name?: string;
  services: CostItem[];
};

type Prompt = {
  toElement: HTMLElement;
  content: PromptContent;
};

type PromptContent = {
  title: string;
  content: string | DescItem[];
  descComment?: string;
};

type FeedbackItem = {
  id: number;
  name: string;
  text: string;
};

type AppointmentId = { id: string };
type Appointment = { times: AppointmentItem[] };
type AppointmentItem = {
  id: string;
  time: string;
};
type AdvatageItemProps = { title: string | { __html: string }; text: { __html: string } };
export type {
  CostInfo,
  PromptContent,
  Prompt,
  CostItem,
  DescItem,
  FeedbackItem,
  AppointmentItem,
  Appointment,
  AppointmentId,
  AdvatageItemProps,
  CostUpdateItem,
};
