import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions, selectors } from "../redux";
import { withStyles } from "@material-ui/core/styles";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import box from '../img/box.png';



const styles = theme => ({
  root: {

  }
});

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.062400, lng: 153.042605 }}
  >
    <Marker 
      position={{ lat: 32.070, lng: 121.266 }} 
      options={{ icon: box }}
    />
    <Marker position={{ lat: 35.900762, lng: 139.642131 }} />
    <Marker position={{lat: 45.848175, lng: -108.387897 }} />
    <Marker position={{lat: 19.192271, lng: -99.373728 }} />
    <Marker position={{lat: 17.192271, lng: 83.373728 }} />
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
