const pageHeight = "650px";
const contentHeight = "440px";

export default (theme) => {

  return {
    innerContent: {
      height: contentHeight,
      minHeight: contentHeight,
      width: "100%",
      display: "inline-block",
      overflow: "auto"
    },
    pageContent: {
      width: "100%",
      display: "inline-block",
      overflow: "hidden",
      height: pageHeight,
      minHeight: pageHeight
    },
    heading: {
      margin: "50px 0 50px 0"
    },
    titleHeading: {
      fontSize: "35px",
      fontStyle: "italic",
      fontWeight: "500",
      fontFamily: "Merriweather",
      fontWeight: 900,
      fontStyle: "italic"

    },
    centeredItem: {
      display: "flex",
      alignContent: "center"
    },
    addIcon: {
      paddingRight: "5px"
    },
    roleNameDisplay: {
      padding: "15px",
      fontWeight: 500
    }
  }
}