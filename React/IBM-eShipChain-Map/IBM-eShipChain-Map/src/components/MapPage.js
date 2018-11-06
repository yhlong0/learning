import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions, selectors } from "../redux";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import box from '../img/box.png';
import blinkBox from '../img/box.gif';
import plane from '../img/air-freight.png';
import ship from '../img/cargo-ship.png';
import truck from '../img/delivery-truck.png';
import redBox from '../img/redbox.png';



const styles = theme => ({
  root: {

  }
});

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.062400, lng: 153.042605 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={90}
    >
      <Marker position={{ lat: 35.900762, lng: 139.642131 }} options={{ icon: box }} />
      <Marker position={{lat: 45.848175, lng: -108.387897 }} options={{ icon: blinkBox }} />
      <Marker position={{lat: 19.192271, lng: -99.373728 }} options={{ icon: plane }} />
      <Marker position={{lat: 17.192271, lng: 83.373728 }} options={{ icon: ship }} />
      <Marker position={{lat: 34.679271, lng: 135.479528 }} options={{ icon: truck }} />
      <Marker position={{lat: 24.679271, lng: 125.479528 }} options={{ icon: redBox }} />
    </MarkerClusterer>
  </GoogleMap>
));


class SplashPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
    }

  render() {
    const { classes } = this.props;

    return (
      <MyMapComponent 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRTo3HKFYSImMhL6g2M4cErR8iEHNaod8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

SplashPage.propTypes = {
  classes: PropTypes.object.isRequired
};

let SplashPageFinal = withStyles(styles)(SplashPage);
function mapStateToProps(state) {
  return {
    userProfile: selectors.getUserProfile(state),
    error: state.error
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loginUser: credentials => {
      dispatch(actions.loginUser(credentials));
    }
  };
}

SplashPageFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashPageFinal);
export default SplashPageFinal;
