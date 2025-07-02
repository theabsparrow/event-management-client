export type TAtendee = {
  _id: string;
  eventId: {
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
  userId: string;
};
