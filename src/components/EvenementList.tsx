import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Agenda, Evenement } from '../models/Agenda';
import EvenementListItem from './EvenementListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/evenements/evenements.actions';

interface OwnProps {
  agenda: Agenda;
  listType: 'tous' | 'favoris';
  hide: boolean;
}

interface StateProps {
  favoriteEvenements: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface EvenementListProps extends OwnProps, StateProps, DispatchProps { };

const EvenementList: React.FC<EvenementListProps> = ({ addFavorite, removeFavorite, favoriteEvenements, hide, agenda, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (agenda.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Evenements Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {agenda.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider>
            {group.evenements.map((evenement: Evenement, evenementIndex: number) => (
              <EvenementListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteEvenements.indexOf(evenement.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${evenementIndex}`}
                evenement={evenement}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteEvenements: state.data.favoris
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: EvenementList
});