import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { documentText, pin, power, walk, warning, wifi, wine } from 'ionicons/icons';
import styles from "./Play.module.css";
import React, { Fragment } from 'react';
import data from './monuments.json';

class Play extends React.Component {
    handleRestart = () => {}
    render() {
        console.log(data.monuments);
        return (
            <Fragment>
                <IonHeader>
                    <IonToolbar color="warning">
                        <IonTitle>Monument List <IonIcon icon={documentText}></IonIcon></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className={styles.content}>
                    <div className={styles.container}>
                    {
                    data.monuments && data.monuments.length > 0 ?
                    (
                        data.monuments.map(obj => {
                            return (
                                <IonCard key={obj.id}>
                                    <img src={obj.url} alt={obj.name}/>
                                    <IonCardHeader>
                                    <IonCardSubtitle>Name</IonCardSubtitle>
                                    <IonCardTitle>{obj.name}</IonCardTitle>
                                    <IonCardSubtitle>Destination</IonCardSubtitle>
                                    <IonCardTitle>{obj.location}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            )
                        })
                    ) : 
                    (
                        <h3>Game cannot be played right now.</h3>
                    )
                    }
                    </div>
                    <div className={styles.playbutton}>
                    <IonButton color="warning" size="large" href="/play" onClick={this.handleRestart}>
                    Restart
                    <IonIcon slot="end" icon={power}></IonIcon>
                    </IonButton>
                    </div>
                </IonContent>
            </Fragment>
        );
    }
}

export default Play;
