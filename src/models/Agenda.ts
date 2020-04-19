export interface Agenda {
  date: string;
  groups: AgendaGroup[]
}

export interface AgendaGroup {
  time: string;
  sessions: Session[];
}

export interface Session {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  speakerNames: string[];
  tracks: string[];
}
