import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './LieuDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Lieu } from '../models/Lieu';


interface OwnProps extends RouteComponentProps {
  lieu?: Lieu;
};

interface StateProps {};

interface DispatchProps {};

interface LieuDetailProps extends OwnProps, StateProps, DispatchProps {};

const LieuDetail: React.FC<LieuDetailProps> = ({ lieu }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openLieuShare(lieu: Lieu) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Annuler',
        role: 'annuler',
        handler: () => {
          console.log('Annuler clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${lieu.name}`);
    setShowActionSheet(true);
  }

  function openContact(lieu: Lieu) {
    setActionSheetButtons([
      {
        text: `Email ( ${lieu.email} )`,
        handler: () => {
          window.open('mailto:' + lieu.email);
        }
      },
      {
        text: `Call ( ${lieu.phone} )`,
        handler: () => {
          window.open('tel:' + lieu.phone);
        }
      }
    ]);
    setActionSheetHeader(`Share ${lieu.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!lieu) {
    return <div>Lieu not found</div>
  }

  return (
    <IonPage id="lieu-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/lieux" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(lieu)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openLieuShare(lieu)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="lieu-background">
          <img src={lieu.profilePic} alt={lieu.name}/>
          <h2>{lieu.name}</h2>
        </div>

        <div className="ion-padding lieu-detail">
          <p>{lieu.about} Say hello on social media!</p>

          <hr/>

          <IonChip color="twitter" onClick={() => openExternalUrl(`https://twitter.com/${lieu.twitter}`)}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>

          <IonChip color="dark" onClick={() => openExternalUrl('https://github.com/ionic-team/ionic')}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

          <IonChip color="instagram" onClick={() => openExternalUrl('https://instagram.com/ionicframework')}>
            <IonIcon icon={logoInstagram}></IonIcon>
            <IonLabel>Instagram</IonLabel>
          </IonChip>
        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    lieu: selectors.getLieu(state, ownProps)
  }),
  component: LieuDetail
});
