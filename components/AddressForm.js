import { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useForm, Controller } from 'react-hook-form';
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
    marginLeft: theme.spacing(1),
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const save = useCheckoutStore((state) => state.save);
  const addressForm = useCheckoutStore((state) => state.data.addressForm);
  const activeStep = useCheckoutStore((state) => state.activeStep);
  const setActiveStep = useCheckoutStore((state) => state.setActiveStep);

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: addressForm,
  });
  // a hack to shift store state into uncontrolled checkbox
  const [checked, setChecked] = useState(addressForm?.saveAddress || false);

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit((data) => {
          save('addressForm', data);
          setActiveStep(activeStep + 1);
        })}
      >
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First name *"
              fullWidth
              autoComplete="given-name"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name *"
              fullWidth
              autoComplete="family-name"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label="Address line 1 *"
              fullWidth
              autoComplete="shipping address-line1"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City *"
              fullWidth
              autoComplete="shipping address-level2"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              label="Zip / Postal code *"
              fullWidth
              autoComplete="shipping postal-code"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country *"
              fullWidth
              autoComplete="shipping country"
              inputRef={register({ required: 'This is required' })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Remember shipping address for next time"
              name="saveAddress"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
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

// THIS ONE IS WORKING v6 checkbox multi select
//https://codesandbox.io/s/material-demo-bzj4i?file=/demo.js
// single value
{
  /* <Controller
  name="rememberMe"
  render={(props) => {
    console.log(props);
    return (
      <FormControlLabel
        control={
          <Checkbox onChange={() => props.onChange(!props.value)} />
        }
        key="rememberMe"
        label="remember me"
      />
    );
  }}
  control={control}
/> */
}

// many examples
//https://codesandbox.io/s/react-hook-form-v6-controller-24gcl?file=/src/index.jsx:1859-1933

// validate with yup
// https://react-hook-form.com/advanced-usage
//https://www.carlrippon.com/custom-validation-rules-in-react-hook-form/

//https://github.com/react-spring/zustand/issues/76
