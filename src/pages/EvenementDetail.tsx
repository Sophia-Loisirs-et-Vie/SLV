import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, cloudDownload } from 'ionicons/icons';
import './EvenementDetail.scss';
import { addFavorite, removeFavorite } from '../data/evenements/evenements.actions';
import { Evenement } from '../models/Agenda';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  evenement?: Evenement;
  favoriteEvenements: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type EvenementDetailProps = OwnProps & StateProps & DispatchProps;

const EvenementDetail: React.FC<EvenementDetailProps> = ({ evenement, addFavorite, removeFavorite, favoriteEvenements }) => {

  if (!evenement) {
    return <div>Evenement not found</div>
  }

  const isFavorite = favoriteEvenements.indexOf(evenement.id) > -1;
  
  const toggleFavorite = () => { 
    isFavorite ? removeFavorite(evenement.id) : addFavorite(evenement.id);
  };
  const shareEvenement = () => { };
  const evenementClick = (text: string) => { 
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="evenement-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/agenda"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareEvenement}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{evenement.name}</h1>
          {evenement.tags.map(tag => (
            <span key={tag} className={`evenement-tag-${tag.toLowerCase()}`}>{tag}</span>
          ))}
          <p>{evenement.description}</p>
          <IonText color="medium">
            {evenement.timeStart} &ndash; {evenement.timeEnd}
            <br />
            {evenement.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => evenementClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => evenementClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => evenementClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => evenementClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => evenementClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    evenement: selectors.getEvenement(state, OwnProps),
    favoriteEvenements: state.data.favoris
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(EvenementDetail)
})