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
import { extname } from "path";


const styles = theme => ({
  root: {

  }
});

const markers = [
  {
    index: 1,
    lat: 25.062400,
    lng: 153.042605,
    icon: box,
    info: `<div>
            <h1 id="firstHeading" class="firstHeading">Shanghai Pudong International Airport</h1>
            <div id="bodyContent">
              <p><b>Shipment ID:</b> 123456789</p>
              <p><b>Shipment Date:</b> 11/01/2018</p>
              <p><b>Receiver:</b> John Smith</p>
              <p><b>Tracking Status:</b> At Shanghai airport waiting for customs clearance.</p>
            </div>
          </div>`
  },
  {
    index: 2,
    lat: 45.848175,
    lng: 139.642131,
    icon: box,
    info: `<div>
            <h1 id="firstHeading" class="firstHeading">Shanghai Pudong International Airport</h1>
            <div id="bodyContent">
              <p><b>Shipment ID:</b> 123456789</p>
              <p><b>Shipment Date:</b> 11/01/2018</p>
              <p><b>Receiver:</b> John Smith</p>
              <p><b>Tracking Status:</b> At Shanghai airport waiting for customs clearance.</p>
            </div>
          </div>`
  }
];
  


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  };

  open = (markerIndex) => {
    this.setState({
      isOpen: true
    });
  }

  close = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {

    return(
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 25.062400, lng: 153.042605 }}
      >
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={90}
      >
        {
          markers.map(marker =>
            <Marker 
              key={marker.index} 
              position={{ lat: marker.lat, lng: marker.lng }}
              options={{ icon: marker.icon }}
              onClick={() => this.open()}
            >
                {this.state.isOpen &&
                  <InfoWindow onCloseClick={() => this.setState({ isOpen: false })}>
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
                }
            </Marker>
          )}
        }
      </MarkerClusterer>
    </GoogleMap>
    );
  }
}

const MapComponent = withScriptjs(withGoogleMap(Map));


class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRTo3HKFYSImMhL6g2M4cErR8iEHNaod8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
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
