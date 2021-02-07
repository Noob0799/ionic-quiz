import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './components/landing/Landing';
import Play from './components/play/Play';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import { Route, Redirect } from 'react-router';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/play" component={Play} />
        <Route path="/landing" component={Landing} />
        <Redirect exact from="/" to="/landing" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
