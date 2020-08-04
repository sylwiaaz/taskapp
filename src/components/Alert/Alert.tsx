import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: any): JSX.Element => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Alert;
