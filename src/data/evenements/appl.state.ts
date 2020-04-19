import { Location } from '../../models/Location';
import { Lieu } from '../../models/Lieu';
import { Agenda, Evenement } from '../../models/Agenda';
export interface ApplState {
  agenda: Agenda;
  evenements: Evenement[];
  lieux: Lieu[];
  favoris: number[];
  locations: Location[];
  filteredTags: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTags: string[];
  menuEnabled: boolean;
}
