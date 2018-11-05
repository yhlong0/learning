import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";
import combinedStyles from "./CreateShipmentStyles";

const styles = combinedStyles;

class SummaryPage extends React.Component {

  state = {}

  render() {
    const { classes, label, content } = this.props;

    return (
      <div>
        <Typography className={classes.staticText}>
          <span className={classes.label}>{label} </span>
          <span className={classes.internationalShipmentText}>
            {content}
          </span>
        </Typography>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  classes: PropTypes.object.isRequired
};

let SummaryPageFinal = withStyles(styles)(SummaryPage);

export default SummaryPageFinal;
