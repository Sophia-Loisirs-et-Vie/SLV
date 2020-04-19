import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import LieuItem from '../components/LieuItem';
import { Lieu } from '../models/Lieu';
import { Evenement } from '../models/Agenda';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './LieuList.scss';

interface OwnProps { };

interface StateProps {
  lieux: Lieu[];
  lieuEvenements: { [key: string]: Evenement[] };
};

interface DispatchProps { };

interface LieuListProps extends OwnProps, StateProps, DispatchProps { };

const LieuList: React.FC<LieuListProps> = ({ lieux, lieuEvenements }) => {

  return (
    <IonPage id="lieu-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lieux</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lieux</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {lieux.map(lieu => (
                <IonCol size="12" size-md="6" key={lieu.id}>
                  <LieuItem
                    key={lieu.id}
                    lieu={lieu}
                    evenements={lieuEvenements[lieu.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    lieux: selectors.getLieux(state),
    lieuEvenements: selectors.getLieuEvenements(state)
  }),
  component: React.memo(LieuList)
});