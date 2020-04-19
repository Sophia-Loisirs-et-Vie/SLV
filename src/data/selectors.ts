import { createSelector } from 'reselect';
import { Agenda, Evenement, AgendaGroup } from '../models/Agenda';
import { AppState } from './state';

const getAgenda = (state: AppState) => {

  return state.data.agenda
};
export const getSpeakers = (state: AppState) => state.data.speakers;
const getEvenements = (state: AppState) => state.data.evenements;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favoris;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredAgenda = createSelector(
  getAgenda, getFilteredTracks,
  (agenda, filteredTracks) => {
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {
      const evenements: Evenement[] = [];
      group.evenements.forEach(evenement => {
        evenement.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            evenements.push(evenement);
          }
        })
      })
      if (evenements.length) {
        const groupToAdd: AgendaGroup = {
          time: group.time,
          evenements
        }
        groups.push(groupToAdd);
      }
    });

    return {
      date: agenda.date,
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
          time: group.time,
          evenements
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: agenda.date,
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
          time: group.time,
          evenements
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: agenda.date,
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

export const getSpeaker = createSelector(
  getSpeakers, getIdParam,
  (speakers, id) => speakers.find(x => x.id === id)
);

export const getSpeakerEvenements = createSelector(
  getEvenements,
  (evenements) => {
    const speakerEvenements: { [key: string]: Evenement[] } = {};

    evenements.forEach(evenement => {
      evenement.speakerNames && evenement.speakerNames.forEach(name => {
        if (speakerEvenements[name]) {
          speakerEvenements[name].push(evenement);
        } else {
          speakerEvenements[name] = [evenement];
        }
      })
    });
    return speakerEvenements;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    };
  }
  return item;
}
