import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import history from "../history";
import { actions } from "../redux";
import { selectors } from "../redux";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import ShipperShipmentItem from "./ShipmentItems/Shipper/ShipperShipmentItem";
import ShipperListHeader from "./ShipmentItems/Shipper/ShipperListHeader";
import ReceiverShipmentItem from "./ShipmentItems/Receiver/ReceiverShipmentItem";
import ReceiverListHeader from "./ShipmentItems/Receiver/ReceiverListHeader";
import BrokerShipmentItem from "./ShipmentItems/Broker/BrokerShipmentItem";
import BrokerListHeader from "./ShipmentItems/Broker/BrokerListHeader";

import combinedStyles from './ShipmentItems/ShipmentItemStyles';

const styles = combinedStyles;

const renderHeader = function (roleName) {
  switch (roleName) {
    case "eco":
    case "shipper":
      return <ShipperListHeader />;
    case "receiver":
      return <ReceiverListHeader />;
    case "broker":
      return <BrokerListHeader />;
    default:
      return <h1>Invalid Role</h1>;
  }
};

const truncateShipmentId = function (shipments) {
  shipments.map(shipment => {
    let shipmentId = shipment.shippingOrderID;
    let idSegments = shipmentId.split(/\s*\-\s*/g);

    shipment.displayID = idSegments[0];
  });

  return shipments;
};

const mapShipments = function (roleName, shipments) {
  let html;
  let modifiedShipments = truncateShipmentId(shipments);

  switch (roleName) {
    case "eco":
    case "shipper":
      html = modifiedShipments.map(s => (
        <ShipperShipmentItem
          key={s.shippingOrderID}
          shipment={s}
          role={roleName}
        />
      ));
      break;
    case "receiver":
      html = modifiedShipments.map(s => (
        <ReceiverShipmentItem key={s.shippingOrderID} shipment={s} />
      ));
      break;
    case "broker":
      html = modifiedShipments.map(s => (
        <BrokerShipmentItem key={s.shippingOrderID} shipment={s} />
      ));
      break;
    default:
      html = <p>Could not display</p>;
      break;
  }

  return html;
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class ShipmentList extends Component {
  constructor(props) {
    super(props);
  }

  handleCreateNewShipmentBtn = e => {
    e.preventDefault();
    history.push("/shipments/new");
  };

  componentDidMount() {
    this.props.getShipments();
  }

  renderShippingList = function (roleName, shipments, pageClass) {
    if (this.props.error) {
      return (
        <div>
          <Typography>Error retrieving shipments for user</Typography>
        </div>
      );
    } else if (shipments.length == 0) {
      return <Typography>This user has no shipments</Typography>;
    }
    {
      return (
        <div>
          {renderHeader(roleName)}
          <div className={pageClass}>
            {mapShipments(roleName, shipments)}
          </div>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    if (!this.props.shipments)
      return <CircularProgress size={50} className={classes.buttonProgress} />;
    else {
      const roleName = this.props.userProfile.role;
      const { shipments, loading } = this.props;

      return (
        <div className="pageContainer">
          <div className={classes.pageContent}>
            <Grid container spacing={16} className={classes.heading}>
              <Grid item xs={5}>
                <Typography className={classes.titleHeading}>
                  Your shipments
              </Typography>
              </Grid>

              <Grid item xs={5} className={classes.centeredItem}>
                {roleName == "shipper" || roleName == "eco" ? (
                  <div>
                    <Button
                      color="primary"
                      className={classes.button}
                      onClick={this.handleCreateNewShipmentBtn}
                    >
                      <AddCircleIcon className={classes.addIcon} />
                      Create Shipment
                  </Button>
                    <Button
                      color="primary"
                      className={classes.button}
                      onClick={this.handleCreateNewShipmentBtn}
                    >
                      <AddCircleIcon className={classes.addIcon} />
                      View Map
                  </Button>
                  </div>
                ) : (
                    ""
                  )}
              </Grid>

              <Grid item className={classes.centeredItem}>
                <Typography className={classes.roleNameDisplay}>
                  {capitalizeFirstLetter(roleName)}
                </Typography>
              </Grid>
            </Grid>

            {loading === true || loading === undefined ? (
              <CircularProgress size={50} className={classes.buttonProgress} />
            ) : (
                this.renderShippingList(roleName, shipments, classes.innerContent)
              )}
          </div>
        </div>
      );
    }
  }
}

ShipmentList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userProfile: selectors.getUserProfile(state),
    shipments: selectors.getShipments(state),
    loading: state.loading,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getShipments() {
      dispatch(actions.getShipments());
    }
  };
}

let ShipmentListFinal = withStyles(styles)(ShipmentList);
ShipmentListFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentListFinal);

export default ShipmentListFinal;
