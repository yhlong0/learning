import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    width: "100%",
  },
  tabHeading: {
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  shipmentListHeading: {
    marginBottom: '10px',
    paddingLeft: '24px',
    paddingRight: '56px'
  }
});

class ShipperListHeader extends Component {


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.shipmentListHeading}>
        <Grid container spacing={16}>
          <Grid item xs={2}>
            <Typography className={classes.tabHeading}>
              Shipment ID
          </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.tabHeading}>
              Shipper
          </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.tabHeading}>
              Status
        </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.tabHeading}>
              Carrier
        </Typography>
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default withStyles(styles)(ShipperListHeader);
