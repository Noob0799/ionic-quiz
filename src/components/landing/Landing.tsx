import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { flashOutline, play } from "ionicons/icons";
import styles from "./Landing.module.css";
import React, { Fragment } from "react";

const Landing: React.FC = () => {
  return (
    <Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar color="warning">
            <IonTitle>
              Ionic Quiz <IonIcon icon={flashOutline}></IonIcon>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={styles.content}>
          <div className={styles.title}>
            <h3>
              Monuments of <span>India</span>
            </h3>
            <p>
              Test your knowledge on the locations of some of the famous
              monuments of our country. Can you guess them all correctly?{" "}
            </p>
          </div>
          <div className={styles.playbutton}>
            <IonButton color="warning" size="large" href="/play">
              Play
              <IonIcon slot="end" icon={play}></IonIcon>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </Fragment>
  );
};

export default Landing;
