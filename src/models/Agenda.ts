export interface Agenda {
  date: string;
  groups: AgendaGroup[]
}

export interface AgendaGroup {
  time: string;
  evenements: Evenement[];
}

export interface Evenement {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  lieuNames: string[];
  tracks: string[];
}
