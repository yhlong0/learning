const margin = "5px 5px 5px 10px";
const pageHeight = "455px";
const ackHeight = "48px";
const billingContainerHeight = "407px";

export default (theme) => {

  return {
    pageContent: {
      height: pageHeight,
      minHeight: pageHeight,
      width: "100%",
      display: "inline-block"
    },
    billingPageContent: {
      height: billingContainerHeight,
      minHeight: billingContainerHeight,
      width: "100%",
      display: "inline-block"
    },
    ackContainer: {
      height: ackHeight,
      minHeight: ackHeight,
      width: "100%",
      display: "inline-block"
    },
    shipmentPageContainer: {
      minHeight: "550px",
      height: "550px",
      overflow: 'hidden'
    },
    summaryPageContainer: {
      minHeight: "550px",
      height: "550px",
      overflow: 'scroll',
      width: '90%'
    },
    prefilledInformationDiv: {
      backgroundColor: "#ecebeb",
      borderRadius: '5px',
      marginTop: '10px',
      paddingLeft: '10px'
    },
    prefilledSummaryDiv: {
      backgroundColor: "#ecebeb",
      borderRadius: '5px',
      marginTop: '10px',
      paddingLeft: '10px',
      height: '260px'
    },
    acknowledgementLabel: {
      textSize: '20px'
    },
    userInformationDiv: {
      fontSize: "15px",
      padding: '20px',
      marginLeft: '10px',
      width: '225px',
      backgroundColor: "#ecebeb",
      borderRadius: '5px',
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    titleHeading: {
      fontSize: "35px",
      fontStyle: "italic",
      fontWeight: "900",
      fontFamily: "Merriweather"
    },
    un3373: {
      borderRadius: '25px',
      background: '#73AD21',
      padding: '15px',
      color: 'white',
      fontWeight: 500,
      fontSize: '16px',
      textAlign: 'center',
      margin: 'auto'
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    formControl: {
      margin: "10px",
      minWidth: 200
    },
    largeDropDown: {
      margin: "10px",
      width: "100%"
    },
    billingDropdown: {
      margin: "10px",
      width: "316px"
    },
    buttonStyle: {
      width: "45%",
      margin: margin,
      fontSize: "15px",
      height: "50px"
    },
    flexSection: {
      display: "flex",
      flexDirection: "column"
    },
    heading: {
      fontWeight: 500,
      fontSize: "17px"
    },
    summaryHeading: {
      fontWeight: 500,
      fontSize: "17px",
      margin: '10px 0 10px 0'
    },
    flexSection: {
      display: "flex",
      flexDirection: "column"
    },
    unitsDropdown: {
      margin: theme.spacing.unit,
      width: 100
    },
    currencyDropDown: {
      margin: theme.spacing.unit,
      width: 150
    },
    internationalShipmentText: {
      fontSize: "14px"
    },
    staticText: {
      padding: "5px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "450",
    },
    miniTextField: {
      margin: theme.spacing.unit,
      width: 50
    },
    largeFormControl: {
      margin: theme.spacing.unit,
      width: "100%"
    },
    userText: {
      margin: "0 0 2px 0",
      fontSize: "15px"
    }
  }
};
