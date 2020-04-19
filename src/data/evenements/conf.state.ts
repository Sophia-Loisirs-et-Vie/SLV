import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Agenda, Evenement } from '../../models/Agenda';
export interface ConfState {
  agenda: Agenda;
  evenements: Evenement[];
  speakers: Speaker[];
  favoris: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
