import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";
import combinedStyles from "./CreateShipmentStyles";
import SummaryLabel from "./SummaryLabel";

const styles = combinedStyles;

class SummaryPage extends React.Component {

  state = {
    receivingCountry: 'China',
    shippingClassification: 'Biological + Dry Ice',
    materialName: 'Human Material',
    materialType: 'Blood',
    additionalClassification: 'Purposefully infected with viruses, toxins, bacteria or fungi',
    materialClassification: {
      human: true,
      trainingVerified: true,
      blood: true,
      categoryB: true,
      pathogen: true,
      biological: true,
      dryIce: true
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBack = () => {
    this.props.handleBack();
  };

  handleSelectClose = event => {
    this.setState({ open: false });
  };

  handleSelectOpen = event => {
    this.setState({ [event.target.name]: { open: true } });
  };

  handleNext = () => {
    this.props.handleNext();
    this.props.updateShipmentOrder({ shippingClassification: this.state })
  };

  render() {
    const { classes } = this.props;
    const { shippingClassification, additionalMaterial, dryIce, customs, shipping, billing } = this.props.newShipmentOrderObject;

    // console.log('asdf')
    // console.log(this.props.newShipmentOrderObject)

    return (
      <div>
        <div className={classes.pageContent}>


          <Grid container spacing={8}>
            {/* Left Side */}
            <Grid item xs={6} >

              {/* Shipment Classification */}
              <Typography className={classes.summaryHeading}>Shipment Classification</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Receiving Country: "
                    content={shippingClassification.receivingCountry} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Shipping Classification: "
                    content={shippingClassification.shippingClassification} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Material Name: "
                    content={shippingClassification.materialName} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Material Type: "
                    content={shippingClassification.materialType} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Additional Classification: "
                    content={shippingClassification.additionalClassification} />
                </Grid>
              </div>

              {/* Dry Ice */}
              <Typography className={classes.summaryHeading}>Dry Ice</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Dry Ice Weight: "
                    content={`${dryIce.dryIceWeight} ${dryIce.dryIceWeightUnits}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Package Type: "
                    content={dryIce.packageType} />
                </Grid>


                <Grid item>
                  <SummaryLabel
                    label="Package Weight: "
                    content={`${dryIce.packageWeight} ${dryIce.packageWeightUnits}`} />
                </Grid>


                <Grid item>
                  <SummaryLabel
                    label="Dimensions: "
                    content={`${dryIce.length} x ${dryIce.width} x ${dryIce.height} ${dryIce.lwhUnits}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Purpose of Shipment: "
                    content={dryIce.purposeOfShipment} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Description of Shipment: "
                    content={dryIce.descriptionOfShipment} />
                </Grid>

              </div>

              {/* Additional Material */}
              <Typography className={classes.summaryHeading}>Additional Material</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Primary Quantity: "
                    content={`${additionalMaterial.primaryQuantity} ${additionalMaterial.primaryQuantityUnits}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Number of Units: "
                    content={additionalMaterial.numberOfUnits} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Outer Quantity: "
                    content={`${additionalMaterial.outerQuantity} ${additionalMaterial.outerQuantityUnits}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Gross Weight: "
                    content={`${additionalMaterial.grossWeight} ${additionalMaterial.grossWeightUnits}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Net Value: "
                    content={`${additionalMaterial.netValue} ${additionalMaterial.currency}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="ECCN: "
                    content={additionalMaterial.eccn} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Schedule B: "
                    content={additionalMaterial.scheduleB} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Export Code: "
                    content={additionalMaterial.exportCode} />
                </Grid>
              </div>

            </Grid>
            {/* Right Side */}
            <Grid item xs={6}>

              {/* Customs */}
              <Typography className={classes.summaryHeading}>Customs</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Broker: "
                    content={`${customs.broker.firstName} ${customs.broker.lastName}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Customs Value: "
                    content={`${customs.customsValue} ${customs.currency}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Terms of Sale: "
                    content={customs.termsOfSale} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Export Intent: "
                    content={customs.exportIntent} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="ITN/FTSR: "
                    content={customs.customsValue} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Description of Shipment: "
                    content={customs.descriptionOfShipment} />
                </Grid>
              </div>


              {/* Shipping */}
              <Typography className={classes.summaryHeading}>Shipping</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Shipper: "
                    content={`${shipping.shipper.firstName} ${shipping.shipper.lastName}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Receiver: "
                    content={`${shipping.receiver.firstName} ${shipping.receiver.lastName}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Duties To: "
                    content={shipping.billDutiesTo} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Duties Zip: "
                    content={shipping.billDutiesZip} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Duties Country: "
                    content={shipping.billDutiesToCountry} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Shipment To: "
                    content={shipping.billShipmentTo} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Shipment Zip: "
                    content={shipping.billShipmentZip} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Bill Shipment Country: "
                    content={shipping.billShipmentCountry} />
                </Grid>
              </div>


              {/* Billing */}
              <Typography className={classes.summaryHeading}>Billing</Typography>

              <div className={classes.prefilledSummaryDiv}>
                <Grid item>
                  <SummaryLabel
                    label="Ship Date: "
                    content={billing.shipDate} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Declared Value: "
                    content={`${billing.declaredValue} ${billing.declaredValueCurrency}`} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Carrier Name: "
                    content={billing.carrier.carrierName} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Carrier Variant: "
                    content={billing.carrier.carrierVariant} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Estimated Shipping Charges: "
                    content={billing.carrier.estimatedShippingCharges} />
                </Grid>

                <Grid item>
                  <SummaryLabel
                    label="Estimated Delivery Date: "
                    content={billing.carrier.estimatedDeliveryDate} />
                </Grid>
              </div>
            </Grid>
          </Grid>




          <Grid container>
            {/* Additional Classification */}

          </Grid>
        </div>

        <Grid container className={classes.buttonContainer}>
          <Grid item>
            <div>
              <Button variant="contained"
                color="primary"
                onClick={this.handleBack}>Back</Button>
              <Button
                disabled
              >
                Next
                            </Button>
            </div>
          </Grid>
        </Grid>
      </div>

    );
  }
}

SummaryPage.propTypes = {
  classes: PropTypes.object.isRequired
};

let SummaryPageFinal = withStyles(styles)(SummaryPage);

function mapStateToProps(state) {
  return {
    //activeStep: state.createNewShipmentActivePage
    newShipmentOrderObject: state.newShipmentOrderObject
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleBack: () => {
      dispatch(actions.createNewBack());
    },
    updateShipmentOrder: (shipmentObject) => {
      dispatch(actions.updateShipmentOrder(shipmentObject));
    }
  };
}

SummaryPageFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryPageFinal);

export default SummaryPageFinal;
