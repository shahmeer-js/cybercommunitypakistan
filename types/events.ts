export interface EventData {
  id: string;
  status: "LIVE" | "REGISTRATION OPEN" | "UPCOMING";
  slug: string;
  timeDate: string;
  title: string;
  description: string;
  image?: string;
  totalParticipants: number;
  seatsLeft: number;
}
