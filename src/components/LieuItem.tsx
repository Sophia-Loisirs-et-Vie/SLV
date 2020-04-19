import React from 'react';
import { Evenement } from '../models/Agenda';
import { Lieu } from '../models/Lieu';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface LieuItemProps {
  lieu: Lieu;
  evenements: Evenement[];
}

const LieuItem: React.FC<LieuItemProps> = ({ lieu, evenements }) => {
  return (
    <>
      <IonCard className="lieu-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="lieu-item" routerLink={`/tabs/lieux/${lieu.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + lieu.profilePic} alt="Lieu profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{lieu.name}</h2>
              <p>{lieu.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {evenements.map(evenement => (
              <IonItem detail={false} routerLink={`/tabs/lieux/evenements/${evenement.id}`} key={evenement.name}>
                <IonLabel>
                  <h3>{evenement.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/lieux/${lieu.id}`}>
              <IonLabel>
                <h3>About {lieu.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default LieuItem;