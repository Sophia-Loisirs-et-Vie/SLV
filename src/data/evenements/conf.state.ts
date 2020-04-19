import { Location } from '../../models/Location';
import { Lieu } from '../../models/Lieu';
import { Agenda, Evenement } from '../../models/Agenda';
export interface ConfState {
  agenda: Agenda;
  evenements: Evenement[];
  lieux: Lieu[];
  favoris: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
