export interface Registration {
  id: number;
  eventId: number;
  name: string;
  email: string;
  phoneNumber: string;
  profession: string;
  instituteName: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventData {
  id: number;
  title: string;
  slug: string;
  description: string;
  venue: string;
  dateTime: string;
  createdAt: string;
  updatedAt: string;

  image?: string;
  timeDate?: string;
  totalParticipants?: number;
}
