import { createSelector } from 'reselect';
import { Agenda, Session, AgendaGroup } from '../models/Agenda';
import { AppState } from './state';

const getAgenda = (state: AppState) => {

  return state.data.agenda
};
export const getSpeakers = (state: AppState) => state.data.speakers;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredAgenda = createSelector(
  getAgenda, getFilteredTracks,
  (agenda, filteredTracks) => {
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {
      const sessions: Session[] = [];
      group.sessions.forEach(session => {
        session.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session);
          }
        })
      })
      if (sessions.length) {
        const groupToAdd: AgendaGroup = {
          time: group.time,
          sessions
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

      const sessions = group.sessions.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (sessions.length) {
        const groupToAdd: AgendaGroup = {
          time: group.time,
          sessions
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

export const getGroupedFavorites = createSelector(
  getAgendaList, getFavoriteIds,
  (agenda, favoriteIds) => {
    const groups: AgendaGroup[] = [];
    agenda.groups.forEach(group => {
      const sessions = group.sessions.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (sessions.length) {
        const groupToAdd: AgendaGroup = {
          time: group.time,
          sessions
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

export const getSession = createSelector(
  getSessions, getIdParam,
  (sessions, id) => {
    return sessions.find(s => s.id === id);
  }
);

export const getSpeaker = createSelector(
  getSpeakers, getIdParam,
  (speakers, id) => speakers.find(x => x.id === id)
);

export const getSpeakerSessions = createSelector(
  getSessions,
  (sessions) => {
    const speakerSessions: { [key: string]: Session[] } = {};

    sessions.forEach(session => {
      session.speakerNames && session.speakerNames.forEach(name => {
        if (speakerSessions[name]) {
          speakerSessions[name].push(session);
        } else {
          speakerSessions[name] = [session];
        }
      })
    });
    return speakerSessions;
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
