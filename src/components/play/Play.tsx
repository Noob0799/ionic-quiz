import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonAlert,
  withIonLifeCycle,
} from "@ionic/react";
import { documentText, power } from "ionicons/icons";
import styles from "./Play.module.css";
import React, { Fragment } from "react";
import data from "./monuments.json";
import images from "./images";
import ReactCardFlip from "react-card-flip";
import TinderCard from "react-tinder-card";
interface MyState {
  showIntroAlert: boolean;
  showExitAlert: boolean;
  isFlipped: Array<boolean>;
  monuments: Array<{ id: number; name: string; location: string }>;
  displayData: Array<{ id: number; name: string; location: string }>;
  score: number;
}

class Play extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showIntroAlert: false,
      showExitAlert: false,
      isFlipped: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      monuments: [],
      displayData: [],
      score: 0
    };
  }

  componentDidMount() {
    this.setState({
      showIntroAlert: true,
      monuments: [...data.monuments],
      displayData: [...data.monuments]
    });
  }

  handleRestart = () => {
    this.setState({
        displayData: [...this.state.monuments],
        score: 0,
        showIntroAlert: false,
        showExitAlert: false,
    });
  };

  setShowIntroAlert = (val: boolean) => {
    this.setState({
      showIntroAlert: val,
    });
  };

  setShowExitAlert = (val: boolean) => {
    this.setState({
      showExitAlert: val,
      score: 0,
      showIntroAlert: true,
      displayData: [...this.state.monuments],
      isFlipped: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]
    });
  };

  handleFlip = (id: number) => {
    const flipArr = [...this.state.isFlipped];
    flipArr[id] = !flipArr[id];
    this.setState({
      isFlipped: [...flipArr],
    });
  };

  onSwipe = (direction: string,id: number) => {
    console.log("You swiped: " + direction);
    let displayData: Array<{ id: number; name: string; location: string }> = [];
    if(direction === 'left' || direction === 'right') {
        displayData = this.state.displayData.filter(obj => {
            return obj.id !== id
        });
    }
    if(direction === 'right') {
        this.setState({
            score: this.state.score + 1,
            displayData: [...displayData]
        });
    } else if(direction === 'left') {
        this.setState({
            displayData: [...displayData]
        });
    }
  };

  onCardLeftScreen = (direction: string) => {
    console.log("You swiped: " + direction);
    if(this.state.displayData.length === 0) {
        this.setState({
            showExitAlert: true,
            displayData: [...this.state.monuments],
            showIntroAlert: false,
        });
    }
  };

  render() {
    return (
      <Fragment>
        <IonHeader>
          <IonToolbar color="warning">
            <IonTitle>
              Monument List <IonIcon icon={documentText}></IonIcon>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={styles.content}>
          <IonAlert
            isOpen={this.state.showIntroAlert}
            onDidDismiss={() => this.setShowIntroAlert(false)}
            cssClass={styles.alert}
            header={"Instructions"}
            message={
              "Guess the locations of the monuments and tap on the cards to see if you got them correct. Swipe left if you got them wrong and right if you were spot on!"
            }
            buttons={["OK"]}
          />
          <IonAlert
            isOpen={this.state.showExitAlert}
            onDidDismiss={() => this.setShowExitAlert(false)}
            cssClass={styles.alert}
            header={"Score"}
            message={
                `${this.state.score}/10`
            }
            buttons={["OK"]}
            />
          <div className={styles.container}>
            {this.state.monuments && this.state.monuments.length > 0 ? (
              this.state.displayData.map((obj) => {
                return (
                  <div key={obj.id}>
                    <ReactCardFlip
                      isFlipped={this.state.isFlipped[obj.id - 1]}
                      flipDirection="horizontal"
                    >
                      <div
                        key="front"
                        hidden={this.state.isFlipped[obj.id - 1]}
                      >
                        <IonCard onClick={() => this.handleFlip(obj.id - 1)}>
                          <img src={images["image" + obj.id]} alt={obj.name} />
                        </IonCard>
                      </div>
                      <div
                        key="back"
                        hidden={!this.state.isFlipped[obj.id - 1]}
                      >
                        <TinderCard
                          onSwipe={(direction) => this.onSwipe(direction,obj.id)}
                          onCardLeftScreen={this.onCardLeftScreen}
                          preventSwipe={["up", "down"]}
                        >
                            <div className={styles.details}>
                                <IonCardHeader
                                onClick={() => this.handleFlip(obj.id - 1)}
                                >
                                <IonCardSubtitle>Name</IonCardSubtitle>
                                <IonCardTitle>{obj.name}</IonCardTitle>
                                <br />
                                <IonCardSubtitle>Destination</IonCardSubtitle>
                                <IonCardTitle>{obj.location}</IonCardTitle>
                                </IonCardHeader>
                            </div>
                        </TinderCard>
                      </div>
                    </ReactCardFlip>
                  </div>
                );
              })
            ) : (
                <h3>Game cannot be played right now!</h3>
            )}
          </div>
          <div className={styles.playbutton}>
            <IonButton
              color="warning"
              size="large"
              href="/play"
              onClick={this.handleRestart}
            >
              Restart
              <IonIcon slot="end" icon={power}></IonIcon>
            </IonButton>
          </div>
        </IonContent>
      </Fragment>
    );
  }
}

export default withIonLifeCycle(Play);
