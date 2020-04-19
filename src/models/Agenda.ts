export interface Agenda {
  annee: string;
  groups: AgendaGroup[]
}

export interface AgendaGroup {
  jour: string;
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
  tags: string[];
}
