import { combineReducers } from './combineReducers';
import { evenementsReducer } from './evenements/evenements.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    agenda: { groups: [] } as any,
    evenements: [],
    lieux: [],
    favoris: [],
    locations: [],
    allTags: [],
    filteredTags: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenInformation: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: evenementsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;