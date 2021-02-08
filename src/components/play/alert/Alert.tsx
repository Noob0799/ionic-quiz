import { IonAlert } from '@ionic/react';
import React, { Fragment } from 'react';

const Alert = (props: any) => {
    return (
        <Fragment>
            <IonAlert
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass={props.cssClass}
            header={props.header}
            message={props.message}
            buttons={props.buttons}
            />
        </Fragment>
    )
}

export default Alert;
