import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";
import combinedStyles from './CreateShipmentStyles';
import moment from "moment";

const styles = combinedStyles;

class BillingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipDate: this.parseDate(moment()),
      declaredValue: "100",
      declaredValueCurrency: "USD",
      carrier: {},
      accessorialServices: {
        returnShipmentFlag: false,
        holdAtLocationFlag: false,
        signatureRequiredFlag: false,
        residentialDeliveryFlag: false,
        saturdayDeliveryFlag: false
      },
      acknowledgementFlag: false
    };
  }

  parseDate(dateTime) {
    if (moment(dateTime).isValid()) {
      return moment(dateTime)
        .format("YYYY-MM-DD")
        .toString();
    }
    return moment()
      .format("YYYY-MM-DD")
      .toString();
  }

  handleChange = event => {
    //console.log("event:", event);
    console.log('value')
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = event => {
    let newAccessorialServices = this.state.accessorialServices;
    newAccessorialServices[event.target.name] = event.target.checked;
    this.setState({ accessorialServices: newAccessorialServices });
    //this.setState({ [event.target.name]: event.target.checked });
  };

  handleAcknowledgementChange = event => {
    this.setState({ acknowledgementFlag: event.target.checked });
  }

  handleSelectClose = event => {
    this.setState({ open: false });
  };

  handleSelectOpen = event => {
    this.setState({ [event.target.name]: { open: true } });
  };

  handleNext = () => {
    this.props.handleNext();
    this.props.updateShipmentOrder({ billing: this.state });
  };
  handleBack = () => {
    this.props.handleBack();
  };

  render() {
    const { classes, newShipmentOrderObject } = this.props;
    console.log(newShipmentOrderObject)

    return (
      <div>
        <div className={classes.billingPageContent}>
          <form autoComplete="off">
            <Grid container spacing={32} className="flexSection">
              <Grid item xs={6}>
                <Typography className={classes.heading}>Shipment Information</Typography>

                {/* Ship Date */}
                <Grid item>
                  <TextField
                    name="shipDate"
                    type="date"
                    label="Ship Date"
                    variant="outlined"
                    value={this.state.shipDate}
                    onChange={this.handleChange}
                    className={classes.formControl}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />

                </Grid>

                {/* Declared Value */}
                <Typography className={classes.heading}>Declared Value</Typography>
                <Grid item>
                  <TextField
                    name="declaredValue"
                    label="Declared Value"
                    variant="outlined"
                    value={this.state.declaredValue}
                    onChange={this.handleChange}
                    className={classes.formControl}
                  />
                  <FormControl variant="outlined" className={classes.unitsDropdown}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Currency
									</InputLabel>
                    <Select
                      value={this.state.declaredValueCurrency}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="declaredValueCurrency"
                        />
                      }
                    >
                      {helper.renderMenuItems("currency")}
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

              {/* Right hand side */}
              <Grid item xs={6}>


                <Typography className={classes.heading}>Accessorial Services</Typography>
                <Grid container >
                  {/* Left side checkbox items */}
                  <Grid item>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.accessorialServices.returnShipmentFlag
                            }
                            onChange={this.handleCheckboxChange}
                            name="returnShipmentFlag"
                          />
                        }
                        label="Is return Shipment"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.accessorialServices.holdAtLocationFlag
                            }
                            onChange={this.handleCheckboxChange}
                            name="holdAtLocationFlag"
                          />
                        }
                        label="Hold at Location"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.accessorialServices.signatureRequiredFlag
                            }
                            onChange={this.handleCheckboxChange}
                            name="signatureRequiredFlag"
                          />
                        }
                        label="Signature Required"
                      />
                    </Grid>
                  </Grid>
                  {/* Right side checkbox items */}
                  <Grid item>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.accessorialServices
                                .residentialDeliveryFlag
                            }
                            onChange={this.handleCheckboxChange}
                            name="residentialDeliveryFlag"
                          />
                        }
                        label="Residential Delivery"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.accessorialServices.saturdayDeliveryFlag
                            }
                            onChange={this.handleCheckboxChange}
                            name="saturdayDeliveryFlag"
                          />
                        }
                        label="Saturday Delivery"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Typography className={classes.heading}>Carrier Information</Typography>
                {/* Carrier Services */}
                <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Carrier Services
									</InputLabel>
                    <Select
                      value={this.state.carrier}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="carrier"
                        />
                      }
                    >
                      {helper.renderCarrierItems()}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Carrier Information */}
                <div
                  className={classes.userInformationDiv}
                  hidden={Object.keys(this.state.carrier).length === 0}
                >
                  <Grid item>
                    <Typography className={classes.userText}>
                      {" "}
                      {this.state.carrier.carrierName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.userText}>
                      {" "}
                      {this.state.carrier.carrierVariant}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.userText}>
                      {" "}
                      $
										{Number.parseFloat(
                        this.state.carrier.estimatedShippingCharges
                      ).toFixed(2)}{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.userText}>
                      {" "}
                      {this.state.carrier.estimatedDelivery}
                    </Typography>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className={classes.ackContainer}>
          <Grid container alignItems="flex-end">
            <FormControlLabel
              classes={classes.acknowledgementLabel}
              control={
                <Checkbox
                  checked={
                    this.state.acknowledgementFlag
                  }
                  onChange={this.handleAcknowledgementChange}
                  name="acknowledgementFlag"
                />
              }
              label="I acknowledge the shipment information is correct."
            />
          </Grid>
        </div>

        <Grid container className={classes.buttonContainer}>
          <Grid item>
            <div>
              <Button onClick={this.handleBack}>Back</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </div >
    );
  }
}

BillingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

let BillingPageFinal = withStyles(styles)(BillingPage);

function mapStateToProps(state) {
  return {
    users: selectors.getUsers(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNext: () => {
      dispatch(actions.createNewNext());
    },
    handleBack: () => {
      dispatch(actions.createNewBack());
    },
    updateShipmentOrder: shipmentObject => {
      dispatch(actions.updateShipmentOrder(shipmentObject));
    }
  };
}

BillingPageFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingPageFinal);
export default BillingPageFinal;
