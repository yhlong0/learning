import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions, selectors } from "../redux";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
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
      <Marker 
        position={{ lat: 35.900762, lng: 139.642131 }} 
        options={{ icon: box }}
      >
        <InfoWindow>
          <div>
            <h1 id="firstHeading" class="firstHeading">Shanghai Pudong International Airport</h1>
            <div id="bodyContent">
              <p><b>Shipment ID:</b> 123456789</p>
              <p><b>Shipment Date:</b> 11/01/2018</p>
              <p><b>Receiver:</b> John Smith</p> 
              <p><b>Tracking Status:</b> At Shanghai airport waiting for customs clearance.</p>
            </div> 
          </div>
        </InfoWindow>
      </Marker>
      <Marker position={{lat: 45.848175, lng: -108.387897 }} options={{ icon: blinkBox }} >
        <InfoWindow>
          <div>
            <h1 id="firstHeading" class="firstHeading" style={{color: 'green'}}>Delivered</h1>
            <div id="bodyContent">
              <p><b>Shipment ID:</b> 5421589900</p>
              <p><b>Delivery Date:</b> 11/02/2018</p>
              <p><b>Destination:</b> Texarkana, AR US</p>
              <p><b>Receiver:</b> Alice Smith</p> 
              <p><b>Tracking Status:</b></p> 
              <p> 12/29 10:45 am Delivered <b>New Delhi, India</b></p>
              <p> 12/29 8:45 am on FedEx vehicle for delivery <b>New Delhi, India</b></p> 
              <p> 12/29 7:10 am at local FedEx facility <b>New Delhi, India</b></p>
              <p> 12/28 5:30 am Departed FedEx location <b>New Delhi, India</b></p>
              <p> 12/28 7:45 am Arrived at FedEx location <b>Los Angeles, CA</b></p>
              <p> 12/27 7:20 am Picked up <b>Houston, TX</b> </p>
              <p> 12/26 7:36am at FedEx origin facility <b>Houston, TX</b> </p> 
            </div> 
          </div>
        </InfoWindow>
      </Marker>
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
