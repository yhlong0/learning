import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import { actions, selectors } from "../../../../redux";

import "./ConfirmDeliveryModal.css";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const styles = theme => ({
	paper: {
		position: "absolute",
		// width: theme.spacing.unit * 50,
		width: "550px",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	textHeading: {
		fontSize: "10px",
		color: "grey",
		fontSize: "15px",
		paddingTop: "10px"
	},
	titleHeading: {
		lineHeight: "1.5",
		fontSize: "20px",
		fontStyle: "italic",
		fontWeight: "800"
	},
	subtitleHeading: {
		fontWeight: "500"
	},
	textField: {
		width: "100%",
		font: "none !important"
	},
	buttonItem: {
		display: "flex",
		marginLeft: "auto"
	},
	buttonContainer: {
		marginTop: "20px"
	}
});

class ConfirmDeliveryModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			shipment: props.shipment,
			carrierFeedback: "",
			carrierRating: 0
		};
		this.feedbackChange = this.feedbackChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			shipment: newProps.shipment
		});
	}

	feedbackChange = event => {
		this.setState({ carrierFeedback: event.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onSubmit = () => {
		console.log(
			"onsubmit:",
			this.state.carrierFeedback,
			this.state.carrierRating
		);
		this.setState({ open: false });
		this.props.confirmDelivery({
			carrierFeedback: this.state.carrierFeedback,
			carrierRating: this.state.carrierRating,
			isDeliveryConfirmed: true,
			shippingOrderID: this.state.shipment.shippingOrderID,
			user: "tom@esg" // TODO : need to revisit
		});
	};

	changeRating = newRating => {
		this.setState({
			carrierRating: newRating
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Button
					variant="contained"
					onClick={this.handleOpen}
					className={classes.schedulePickupButton}
				>
					Confirm Delivery
				</Button>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography className={classes.titleHeading} gutterBottom>
							<div>You've confirmed this delivery.</div>
							<div>Thanks!</div>
						</Typography>

						<Typography className={classes.textHeading}>
							<div>
								Would you mind taking a second to rate your delivery experience?
							</div>
						</Typography>

						<Typography className={classes.textHeading}>
							<StarRatings
								rating={this.state.carrierRating}
								starRatedColor="blue"
								starHoverColor="blue"
								changeRating={this.changeRating}
								numberOfStars={5}
								name="rating"
							/>
						</Typography>

						<Typography className={classes.textHeading}>
							<div>Please add any additional comments below.</div>
						</Typography>

						<div className={classes.titleHeading}>
							<TextField
								multiline
								rows="5"
								value={this.state.carrierFeedback}
								className="feedback-multiline-text"
								onChange={this.feedbackChange}
								margin="normal"
								variant="outlined"
							/>
						</div>

						<div className={classes.textHeading}>
							We appreciate your feedback!
						</div>

						<Grid
							container
							justify="flex-end"
							className={classes.buttonContainer}
						>
							<Grid item xs={5} />
							<Grid
								container
								item
								xs={3}
								className={classes.buttonItem}
								justify="flex-end"
								justifyContent="flex-end"
							>
								<Button onClick={this.onSubmit} variant="outlined">
									Submit
								</Button>
							</Grid>
						</Grid>
					</div>
				</Modal>
			</div>
		);
	}
}

ConfirmDeliveryModal.propTypes = {
	classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
let ConfirmDeliveryModalFinal = withStyles(styles)(ConfirmDeliveryModal);

function mapStateToProps(state) {
	return {
		//modalError: selectors.getModalError(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		confirmDelivery: details => {
			dispatch(actions.confirmDelivery(details));
		}
	};
}
ConfirmDeliveryModalFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmDeliveryModalFinal);

export default ConfirmDeliveryModalFinal;
