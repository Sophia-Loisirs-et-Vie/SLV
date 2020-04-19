import { createSelector } from 'reselect';
import { Agenda, Evenement, AgendaGroup } from '../models/Agenda';
import { AppState } from './state';

const getAgenda = (state: AppState) => {

  return state.data.agenda
};
export const getLieux = (state: AppState) => state.data.lieux;
const getEvenements = (state: AppState) => state.data.evenements;
const getFilteredTags = (state: AppState) => state.data.filteredTags;
const getFavoriteIds = (state: AppState) => state.data.favoris;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredAgenda = createSelector(
  getAgenda, getFilteredTags,
  (agenda, filteredTags) => {
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {
      const evenements: Evenement[] = [];
      group.evenements.forEach(evenement => {
        evenement.tags.forEach(tag => {
          if (filteredTags.indexOf(tag) > -1) {
            evenements.push(evenement);
          }
        })
      })
      if (evenements.length) {
        const groupToAdd: AgendaGroup = {
          jour: group.jour,
          evenements
        }
        groups.push(groupToAdd);
      }
    });

    return {
      annee: agenda.annee,
      groups
    } as Agenda;
  }
);

export const getSearchedAgenda = createSelector(
  getFilteredAgenda, getSearchText,
  (agenda, searchText) => {
    if (!searchText) {
      return agenda;
    }
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {

      const evenements = group.evenements.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (evenements.length) {
        const groupToAdd: AgendaGroup = {
          jour: group.jour,
          evenements
        }
        groups.push(groupToAdd);
      }
    });
    return {
      annee: agenda.annee,
      groups
    } as Agenda;
  }
)

export const getAgendaList = createSelector(
  getSearchedAgenda,
  (agenda) => agenda
);

export const getGroupedFavoris = createSelector(
  getAgendaList, getFavoriteIds,
  (agenda, favoriteIds) => {
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {
      const evenements = group.evenements.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (evenements.length) {
        const groupToAdd: AgendaGroup = {
          jour: group.jour,
          evenements
        }
        groups.push(groupToAdd);
      }
    });
    return {
      annee: agenda.annee,
      groups
    } as Agenda;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getEvenement = createSelector(
  getEvenements, getIdParam,
  (evenements, id) => {
    return evenements.find(s => s.id === id);
  }
);

export const getLieu = createSelector(
  getLieux, getIdParam,
  (lieux, id) => lieux.find(x => x.id === id)
);

export const getLieuEvenements = createSelector(
  getEvenements,
  (evenements) => {
    const lieuEvenements: { [key: string]: Evenement[] } = {};

    evenements.forEach(evenement => {
      evenement.lieuNames && evenement.lieuNames.forEach(name => {
        if (lieuEvenements[name]) {
          lieuEvenements[name].push(evenement);
        } else {
          lieuEvenements[name] = [evenement];
        }
      })
    });
    return lieuEvenements;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Centre Carte',
      lat: 43.50,
      lng: 7.07
    };
  }
  return item;
}
