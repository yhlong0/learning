import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	}
});

class TimePickers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes } = this.props;
		let { time } = this.props;

		return (
			<form className={classes.container} noValidate>
				<TextField
					id="time"
					type="time"
					value={time}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					inputProps={{
						step: 300 // 5 min
					}}
					onChange={this}
				/>
			</form>
		);
	}
}

TimePickers.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimePickers);
