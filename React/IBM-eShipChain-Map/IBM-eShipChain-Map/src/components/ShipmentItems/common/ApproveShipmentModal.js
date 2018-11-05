import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { actions, selectors } from "../../../redux";
import combinedStyles from "../ShipmentItemStyles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = combinedStyles;

// textField: {
//   marginLeft: theme.spacing.unit,
//   marginRight: theme.spacing.unit,
//   width: 200
// },

class ApproveShipmentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      actionSelect: "",
      shipment: this.props.shipment,
      ecoComments: ""
    };
    //this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      shipment: newProps.shipment
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  onSubmit = () => {
    this.setState({ open: false });
    this.props.submitApproval({
      shippingOrderID: this.state.shipment.shippingOrderID,
      user: "tom@esg",
      isEcoApproved: true,
      ecoComments: this.state.ecoComments
    });
  };

  handleActionSelect = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleActionMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleActionMenuClose = (e, action) => {
    if (action == "cancel" || action == "approve") {
      this.setState({ actionSelect: action, open: true });
    }
    this.setState({ anchorEl: null });
  };
  feedbackChange = event => {
    this.setState({ ecoComments: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          variant="contained"
          onClick={this.handleActionMenuClick}
          disabled={this.props.isEcoApproved}
          className={classes.modalActionButton}
        >
          Take Action
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleActionMenuClose}
        >
          <MenuItem onClick={e => this.handleActionMenuClose(e, "approve")}>
            Approve shipment
          </MenuItem>
          <MenuItem disabled>Edit shipment</MenuItem>
          <MenuItem disabled>Cancel shipment</MenuItem>
          <MenuItem disabled>Apply for a license</MenuItem>
        </Menu>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.heading}>
              <Typography className={classes.titleHeading} gutterBottom>
                Do you want to {this.state.actionSelect} this shipment?
              </Typography>
              <Typography className={classes.secondaryHeading} gutterBottom>
                Please add any additional comments below.
              </Typography>
              <div className={classes.titleHeading}>
                <TextField
                  multiline
                  rows="8"
                  value={this.state.ecoComments}
                  onChange={this.feedbackChange}
                  className="feedback-multiline-text"
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>

            {/* Buttons */}
            <Grid
              container
              justify="flex-end"
              justifyContent="flex-end"
              className={classes.buttonContainer}
            >
              <Grid item xs={8} />
              <Grid item xs={2} className={classes.buttonItem}>
                <Button
                  disabled
                  onClick={e => this.handleClose()}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Grid>

              <Grid
                container
                item
                xs={2}
                className={classes.buttonItem}
                justify="flex-end"
                justifyContent="flex-end"
              >
                <Button onClick={this.onSubmit} variant="outlined">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

ApproveShipmentModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
let ApproveShipmentModalFinal = withStyles(styles)(ApproveShipmentModal);

function mapStateToProps(state) {
  return {
    //modalError: selectors.getModalError(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitApproval: approvalDetails => {
      dispatch(actions.updateApproval(approvalDetails));
    }
  };
}
ApproveShipmentModalFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveShipmentModalFinal);

export default ApproveShipmentModalFinal;
