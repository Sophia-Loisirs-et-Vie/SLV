import { EvenementsActions } from './evenements.actions';
import { ConfState } from './conf.state';

export const evenementsReducer = (state: ConfState, action: EvenementsActions): ConfState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-conf-data': {
      return { ...state, ...action.data };
    }
    case 'add-favorite': {
      return { ...state, favoris: [...(state.favoris), action.evenementId] };
    }
    case 'remove-favorite': {
      return { ...state, favoris: [...(state.favoris).filter(x => x !== action.evenementId)] };
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}