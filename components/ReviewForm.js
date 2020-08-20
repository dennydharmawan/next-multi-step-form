import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
} from '@material-ui/core';

import useCheckoutStore from '../hooks/zustand/useCheckoutStore';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Review() {
  const classes = useStyles();

  const activeStep = useCheckoutStore((state) => state.activeStep);
  const setActiveStep = useCheckoutStore((state) => state.setActiveStep);
  const addressForm = useCheckoutStore((state) => state.data.addressForm);
  const paymentForm = useCheckoutStore((state) => state.data.paymentForm);

  const addresses = [addressForm.address1, addressForm.address2];

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: paymentForm.cardName },
    { name: 'Card number', detail: paymentForm.cardNumber },
    { name: 'Expiry date', detail: paymentForm.expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${addressForm.firstName} ${addressForm.lastName}`}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
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
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Place Order
        </Button>
      </div>
    </React.Fragment>
  );
}
