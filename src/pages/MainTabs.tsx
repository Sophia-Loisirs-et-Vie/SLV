import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people } from 'ionicons/icons';
import AgendaPage from './AgendaPage';
import LieuList from './LieuList';
import LieuDetail from './LieuDetail';
import EvenementDetail from './EvenementDetail';
import CarteView from './CarteView';
import APropos from './APropos';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/agenda" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/agenda" render={() => <AgendaPage />} exact={true} />
        <Route path="/tabs/lieux" render={() => <LieuList />} exact={true} />
        <Route path="/tabs/lieux/:id" component={LieuDetail} exact={true} />
        <Route path="/tabs/agenda/:id" component={EvenementDetail} />
        <Route path="/tabs/lieux/evenements/:id" component={EvenementDetail} />
        <Route path="/tabs/map" render={() => <CarteView />} exact={true} />
        <Route path="/tabs/apropos" render={() => <APropos />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="agenda" href="/tabs/agenda">
          <IonIcon icon={calendar} />
          <IonLabel>Agenda</IonLabel>
        </IonTabButton>
        <IonTabButton tab="lieux" href="/tabs/lieux">
          <IonIcon icon={people} />
          <IonLabel>Lieux</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Carte</IonLabel>
        </IonTabButton>
        <IonTabButton tab="apropos" href="/tabs/apropos">
          <IonIcon icon={informationCircle} />
          <IonLabel>A propos</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;