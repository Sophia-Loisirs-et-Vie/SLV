import { Plugins } from '@capacitor/core';
import { Agenda, Evenement } from '../models/Agenda';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const UTILISATEUR = 'utilisateur';
const DARKMODE = 'darkMode';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const agenda = responseData.agenda[0] as Agenda;
  const evenements = parseEvenements(agenda);
  const speakers = responseData.speakers as Speaker[];
  const locations = await response[1].json() as Location[];
  const allTracks = evenements
    .reduce((all, evenement) => all.concat(evenement.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    agenda,
    evenements,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: DARKMODE }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: UTILISATEUR })]);
  const isLoggedin = await response[0].value === 'true';
  const darkMode = await response[1].value === 'true';
  const hasSeenTutorial = await response[2].value === 'true';
  const utilisateur = await response[3].value || undefined;
  const data = {
    isLoggedin,
    darkMode,
    hasSeenTutorial,
    utilisateur
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setDarkmodeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARKMODE, value: JSON.stringify(darkMode) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUtilisateurData = async (utilisateur?: string) => {
  if (!utilisateur) {
    await Storage.remove({ key: UTILISATEUR });
  } else {
    await Storage.set({ key: UTILISATEUR, value: utilisateur });
  }
}

function parseEvenements(agenda: Agenda) {
  const evenements: Evenement[] = [];
  agenda.groups.forEach(g => {
    g.evenements.forEach(s => evenements.push(s))
  });
  return evenements;
}
