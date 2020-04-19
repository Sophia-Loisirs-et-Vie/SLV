import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Agenda, Session } from '../../models/Agenda';
export interface ConfState {
  agenda: Agenda;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
