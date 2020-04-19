import { EvenementsActions } from './evenements.actions';
import { ApplState } from './appl.state';

export const evenementsReducer = (state: ApplState, action: EvenementsActions): ApplState => {
  switch (action.type) {
    case 'set-appl-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-appl-data': {
      return { ...state, ...action.data };
    }
    case 'add-favorite': {
      return { ...state, favoris: [...(state.favoris), action.evenementId] };
    }
    case 'remove-favorite': {
      return { ...state, favoris: [...(state.favoris).filter(x => x !== action.evenementId)] };
    }
    case 'update-filtered-tags': {
      return { ...state, filteredTags: action.filteredTags };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}