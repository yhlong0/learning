export default (theme) => {

  return {
    modalActionButton: {
      height: "35px",
      width: "175px",
      marginLeft: "10px"
    },
    paper: {
      position: "absolute",
      // width: theme.spacing.unit * 50,
      width: "550px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4
    },
    titleHeading: {
      fontSize: "30px",
      fontStyle: "italic",
      fontWeight: "550"
    },
    secondaryHeading: {
      color: "grey",
      fontWeight: "100",
      paddingTop: "30px"
    },
    subtitleHeading: {
      fontWeight: "500"
    },
    textField: {
      width: "100%"
    },
    buttonItem: {
      display: "flex",
      marginLeft: "auto"
    },
    buttonContainer: {
      marginTop: "20px"
    },
    // Schedule Pickup Modal
    mainAddress: {
      paddingTop: "10px"
    },
    toHeading: {
      fontWeight: "500",
      position: "relative",
      top: "43px",
      left: "23px"
    },
    mapImage: {
      position: "relative",
      bottom: "25px",
      left: "25px"
    },
    addressText: {
      color: "grey",
      lineHeight: "0.5"
    },
    coordinatesText: {
      color: "grey",
      paddingTop: "20px",
      paddingBottom: "20px",
      lineHeight: "0.75"
    }
  }
}