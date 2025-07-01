export type TEvent = {
  title: string;
  image?: string;
  date: string;
  time: string;
  division?: string;
  district?: string;
  address?: string;
  location: string;
  description: string;
};

export type TEventInfos = {
  _id: string;
  userId: string;
  title: string;
  name: string;
  image?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
  isDeleted: boolean;
};
