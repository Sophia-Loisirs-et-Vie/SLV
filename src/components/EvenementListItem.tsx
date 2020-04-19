import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Evenement } from '../models/Agenda';

interface EvenementListItemProps {
  evenement: Evenement;
  listType: "tous" | "favoris";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const EvenementListItem: React.FC<EvenementListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, evenement, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteEvenement = () => {
    onAddFavorite(evenement.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(evenement.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteEvenement = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteEvenement();
    } else {
      // remember this evenement as a user favorite
      onAddFavorite(evenement.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + evenement.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/agenda/${evenement.id}`}>
        <IonLabel>
          <h3>{evenement.name}</h3>
          <p>
            {evenement.timeStart}&mdash;&nbsp;
            {evenement.timeStart}&mdash;&nbsp;
            {evenement.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favoris" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteEvenement()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteEvenement}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(EvenementListItem);