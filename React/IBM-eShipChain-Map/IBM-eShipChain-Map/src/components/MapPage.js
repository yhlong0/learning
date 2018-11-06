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

const markers = [
  {
    index: 1,
    lat: 31.151151,
    lng: 121.805615,
    icon: blinkBox,
    info: <div>
            <h1 style={{ color: '#2196f3' }}>Shanghai Pudong International Airport</h1>
            <div>
              <p><b>Shipment ID:</b> 123456789</p>
              <p><b>Shipment Date:</b> 11/01/2018</p>
              <p><b>Receiver:</b> John Smith</p>
              <p><b>Tracking Status:</b> At Shanghai airport waiting for customs clearance.</p>
            </div>
          </div>
  },
  {
    index: 2,
    lat: 28.586,
    lng: 77.187,
    icon: box,
    info: <div>
            <h1 style={{color: 'green'}}>Delivered</h1>
            <div>
              <p><b>Shipment ID:</b> 5421589900</p>
              <p><b>Delivery Date:</b> 11/02/2018</p>
              <p><b>Destination:</b> New Delhi, India</p>
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
  },
  {
    index: 3,
    lat: 27.146281,
    lng: 132.808777,
    icon: ship,
    info: <div>
            <h1 style={{color: '#2196f3'}}>Cargo Ship in transit</h1>
            <p><b>Shipment ID:</b> 7789200004</p>
            <p><b>Shipment Date:</b> 10/25/2018</p>
            <p><b>Receiver:</b> John Bob</p> 
            <p><b>Tracking Status:</b></p> 
            <p> In transit, waiting for deliever.</p>
            <p> 12/28 5:30 am Departed UPS location <b>Los Angeles, CA</b></p>
            <p> 12/28 7:45 am Arrived at UPS location <b>Los Angeles, CA</b></p>
            <p> 12/27 7:20 am Picked up <b>Houston, TX</b> </p>
            <p> 12/26 7:36am at UPS origin facility <b>Houston, TX</b> </p>
          </div>
  },
  {
    index: 4,
    lat: 34.195281,
    lng: -118.190,
    icon: redBox,
    info: <div>
      <h1 style={{ color: 'red' }}>Delivery Exception</h1>
      <p><b>Shipment ID:</b> 7789200004</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Bob</p>
      <p><b>Tracking Status:</b> Local weather delay - Delivery not attempted!.</p> 
      <p> 12/28 7:45 am Arrived at UPS location <b>Los Angeles, CA</b></p>
      <p> 12/27 7:20 am Picked up <b>Houston, TX</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>Houston, TX</b> </p> 
    </div>
  },
  {
    index: 5,
    lat: 30.640281,
    lng: -122.368,
    icon: plane,
    info: <div>
      <h1 style={{ color: '#2196f3' }}>Fedex plane in transit</h1>
      <p><b>Shipment ID:</b> 77892022204</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Smith</p>
      <p><b>Tracking Status:</b></p>
      <p> 12/28 7:45 am Will arrived at UPS location <b>Los Angeles, CA</b></p>
      <p> 12/27 7:20 am Picked up <b>New Delhi, India</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>New Delhi, India</b> </p>
    </div>
  },
  {
    index: 6,
    lat: 39.302,
    lng: -95.009,
    icon: truck,
    info: <div>
      <h1 style={{ color: '#2196f3' }}>UPS truck in transit</h1>
      <p><b>Shipment ID:</b> 77892022204</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Smith</p>
      <p><b>Tracking Status:</b></p>
      <p> 12/29 5:45 pm Arrived at UPS location <b>Kansas City, KA</b></p>
      <p> 12/28 11:45 am Arrived at UPS location <b>Los Angeles, CA</b></p>
      <p> 12/27 7:20 am Picked up <b>New Delhi, India</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>New Delhi, India</b> </p>
    </div>
  },
  {
    index: 7,
    lat: 13.086,
    lng: 80.132,
    icon: truck,
    info: <div>
      <h1 style={{ color: '#2196f3' }}>FedEx truck in transit</h1>
      <p><b>Shipment ID:</b> 7781222204</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Smith</p>
      <p><b>Tracking Status:</b></p>
      <p> 12/29 5:45 pm Departed at UPS location <b>Chennai, India</b></p>
      <p> 12/28 11:45 am Arrived at UPS location <b>Chennai, India</b></p>
      <p> 12/27 7:20 am Picked up <b>Los Angeles, CA</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>Kansas City, KA</b> </p>
    </div>
  },
  {
    index: 8,
    lat: 17.442,
    lng: 69.671,
    icon: plane,
    info: <div>
      <h1 style={{ color: '#2196f3' }}>UPS plane in transit</h1>
      <p><b>Shipment ID:</b> 82892022204</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Cathy</p>
      <p><b>Tracking Status:</b></p>
      <p> 12/28 7:45 am Will arrived at UPS location <b>Mumbai, India</b></p>
      <p> 12/27 7:20 am Picked up <b>Los Angeles, CA</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>Los Angeles, CA</b> </p>
    </div>
  },
  {
    index: 9,
    lat: 49.341,
    lng: -123.051,
    icon: box,
    info: <div>
      <h1 style={{ color: 'green' }}>Delivered</h1>
      <div>
        <p><b>Shipment ID:</b> 5421589900</p>
        <p><b>Delivery Date:</b> 11/02/2018</p>
        <p><b>Destination:</b> Vancouver, Canada</p>
        <p><b>Receiver:</b> Alice Smith</p>
        <p><b>Tracking Status:</b></p>
        <p> 12/29 10:45 am Delivered <b>Vancouver, Canada</b></p>
        <p> 12/28 7:45 am Arrived at FedEx location <b>Los Angeles, CA</b></p>
        <p> 12/27 7:20 am Picked up <b>New Delhi, India</b> </p>
        <p> 12/26 7:36am at FedEx origin facility <b>New Delhi, India</b> </p>
      </div>
    </div>
  },
  {
    index: 10,
    lat: 35.146281,
    lng: -131.808777,
    icon: ship,
    info: <div>
      <h1 style={{ color: '#2196f3' }}>Cargo Ship in transit</h1>
      <p><b>Shipment ID:</b> 7789200004</p>
      <p><b>Shipment Date:</b> 10/25/2018</p>
      <p><b>Receiver:</b> John Bob</p>
      <p><b>Tracking Status:</b></p>
      <p> In transit, waiting for deliever.</p>
      <p> 12/28 5:30 am Departed UPS location <b>Visakhapatnam, India</b></p>
      <p> 12/28 7:45 am Arrived at UPS location <b>Visakhapatnam, India</b></p>
      <p> 12/27 7:20 am Picked up <b>New Delhi, India</b> </p>
      <p> 12/26 7:36am at UPS origin facility <b>New Delhi, India</b> </p>
    </div>
  }
];
  


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showInfoIndex: 1
    }
  };

  toggleInfoWindow = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showInfo(index, isOpen) {
    this.setState({
      isOpen: !isOpen,
      showInfoIndex: index
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
              onClick={() => this.showInfo(marker.index)}
            >
                {(this.state.isOpen && this.state.showInfoIndex == marker.index) &&
                  <InfoWindow onCloseClick={() => this.toggleInfoWindow()}>
                    <div>
                      {marker.info}
                    </div>
                  </InfoWindow>
                }
            </Marker>
          )}
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
