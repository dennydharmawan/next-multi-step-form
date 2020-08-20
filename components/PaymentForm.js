import { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';

import useCheckoutStore from '../hooks/zustand/useCheckoutStore';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function PaymentForm() {
  const classes = useStyles();
  const save = useCheckoutStore((state) => state.save);
  const paymentForm = useCheckoutStore((state) => state.data.paymentForm);
  const activeStep = useCheckoutStore((state) => state.activeStep);
  const setActiveStep = useCheckoutStore((state) => state.setActiveStep);

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: paymentForm,
  });
  const [checked, setChecked] = useState(paymentForm?.saveCard || false);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          save('paymentForm', data);
          setActiveStep(activeStep + 1);
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              id="cardName"
              name="cardName"
              label="Name on card *"
              fullWidth
              autoComplete="cc-name"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="cardName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="cardNumber"
              name="cardNumber"
              label="Card number *"
              fullWidth
              autoComplete="cc-number"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="cardNumber"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="expDate"
              name="expDate"
              label="Expiry date *"
              fullWidth
              autoComplete="cc-exp"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="expDate"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="cvv"
              name="cvv"
              label="CVV *"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="cvv"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              defaultValue={false}
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Remember credit card details for next time"
              name="saveCard"
              inputRef={register({ required: 'This is required' })}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
    </React.Fragment>
  );
}
