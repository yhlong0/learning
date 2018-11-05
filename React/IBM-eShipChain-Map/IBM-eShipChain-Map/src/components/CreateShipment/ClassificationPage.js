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

const styles = combinedStyles;

class ClassficationPage extends React.Component {

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

    return (
      <div>
        <div className={classes.pageContent}>
          <form autoComplete="off">

            <Grid container spacing={8}>
              <Grid item xs={7} >

                {/* Destination Country */}
                <Grid item>
                  <Typography className={classes.heading}>Shipment Classification</Typography>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Destination Country
          </InputLabel>
                    <Select
                      value={this.state.receivingCountry}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="receivingCountry"
                        />
                      }
                    >
                      {helper.renderCountryMenuItems()}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Shipment Type  */}
                <Grid item>
                  <Typography className={classes.heading}>Shipment Type</Typography>
                  <Button className={classes.buttonStyle} variant="outlined">Biological + Dry Ice</Button>
                  <Button className={classes.buttonStyle} variant="outlined" disabled>Biological</Button>
                </Grid>

                <Grid item>
                  <Button className={classes.buttonStyle} variant="outlined" disabled>Consumer Electronics</Button>
                  <Button className={classes.buttonStyle} variant="outlined" disabled>Chemical</Button>
                </Grid>

                <Grid item>
                  <Button className={classes.buttonStyle} variant="outlined" disabled>Business Document</Button>
                  <Button className={classes.buttonStyle} variant="outlined" disabled>Other types</Button>
                </Grid>

                {/* Material Name */}
                <Grid item>
                  <Typography className={classes.heading}>Material Selection</Typography>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Material Name
          </InputLabel>
                    <Select
                      value={this.state.materialName}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="materialName"
                        />
                      }
                    >
                      {helper.renderMenuItems('materialName')}
                    </Select>
                  </FormControl>

                  {/* Material Type */}
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Material Type
          </InputLabel>
                    <Select
                      value={this.state.materialType}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="materialType"
                        />
                      }
                    >
                      {helper.renderMenuItems('materialType')}
                    </Select>
                  </FormControl>
                </Grid>


              </Grid>
              {/* Material Classification */}
              <Grid item xs={5}>

                <div hidden={this.state.additionalClassification != 'High probability of containing a pathogen'}>
                  <Typography className={classes.heading}>Material Classification</Typography>
                  <Grid container>
                    {/* Left side checkbox items */}
                    <Grid item>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Human" />
                      </Grid>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Blood" />
                      </Grid>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Pathogen" />
                      </Grid>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Dry Ice" />
                      </Grid>
                    </Grid>
                    {/* Right side checkbox items */}
                    <Grid item>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Training Verified" />
                      </Grid>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Category B" />
                      </Grid>
                      <Grid item>
                        <FormControlLabel disabled control={<Checkbox checked={true} />} label="Biological" />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* UN 3373 */}
                  <Grid item>
                    <Typography className={classes.un3373}>UN 3373 Affects Humans </Typography>
                  </Grid>
                </div>
              </Grid>

            </Grid>

          </form>


          <Grid container>
            {/* Additional Classification */}
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Additional Classification
          </InputLabel>
                <Select
                  value={this.state.additionalClassification}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="additionalClassification"
                    />
                  }
                >
                  {helper.renderMenuItems('additionalClassification')}
                </Select>
              </FormControl>
            </Grid>

          </Grid>
        </div>

        <Grid container className={classes.buttonContainer}>
          <Grid item>
            <div>
              <Button disabled>Back</Button>
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
      </div>

    );
  }
}

ClassficationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

let ClassficationPageFinal = withStyles(styles)(ClassficationPage);

function mapStateToProps(state) {
  return {
    //activeStep: state.createNewShipmentActivePage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleNext: () => {
      dispatch(actions.createNewNext());
    },
    updateShipmentOrder: (shipmentObject) => {
      dispatch(actions.updateShipmentOrder(shipmentObject));
    }
  };
}

ClassficationPageFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassficationPageFinal);

export default ClassficationPageFinal;
