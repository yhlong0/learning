import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import DatePicker from "../../../DatePicker";
import TimePicker from "../../../TimePicker";
import Grid from "@material-ui/core/Grid";
import TestImage from "../../../../test.jpg";
import MapIcon from "../../../../mapIcon.svg";
import TextField from "@material-ui/core/TextField";
import "./SchedulePickupModal.css";
import moment from "moment";
import { connect } from "react-redux";
import { actions, selectors } from "../../../../redux";

import combinedStyles from "../ShipmentModalStyles";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const styles = combinedStyles;

class SchedulePickupModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			shipment: this.props.shipment,
			startTime: this.parseTime(
				this.props.shipment.pickupScheduled.startPickup
			),
			endTime: this.parseTime(this.props.shipment.pickupScheduled.endPickup),
			pickupDate: this.parseDate(
				this.props.shipment.pickupScheduled.startPickup
			),
			pickUpInstructions: this.props.shipment.pickupScheduled.pickUpInstructions
		};
		//this.changeRating = this.changeRating.bind(this);
	}
	componentWillReceiveProps(newProps) {
		//TODO: need to come back when redux will be used
		this.setState({
			shipment: newProps.shipment,
			startTime: this.parseTime(
				this.props.shipment.pickupScheduled.startPickup
			),
			endTime: this.parseTime(this.props.shipment.pickupScheduled.endPickup),
			pickupDate: this.parseDate(
				this.props.shipment.pickupScheduled.startPickup
			)
		});
	}
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	makeDateTime(date, time) {
		let dateTime = moment(date);
		var t = moment(time, "HH:mm");
		dateTime.minute(t.minute());
		dateTime.hour(t.hour());
		return dateTime.format("YYYY-MM-DDTHH:mm:ssZZ").toString();
	}
	onSchedule = () => {
		let startDateTime = this.makeDateTime(
			this.state.pickupDate,
			this.state.startTime
		);
		let endDateTime = this.makeDateTime(
			this.state.pickupDate,
			this.state.endTime
		);

		this.setState({ open: false });

		// isFirstCall tells the backend to update the blockchain
		let isFirstCall = this.props.shipment.pickupScheduled.startPickup == "";

		this.props.updatePickupDateTime({
			startDateTime,
			endDateTime,
			shippingOrderID: this.state.shipment.shippingOrderID,
			pickUpInstructions: this.state.pickUpInstructions,
			isFirstCall: isFirstCall
		});
	};
	updateStartTime = event => {
		this.setState({ startTime: event.target.value });
	};
	updateEndTime = event => {
		this.setState({ endTime: event.target.value });
	};
	updatePickupDate = event => {
		this.setState({ pickupDate: event.target.value });
	};
	updatePickupInstructions = event => {
		this.setState({ pickUpInstructions: event.target.value });
	};
	parseDate(dateTime) {
		if (moment(dateTime).isValid()) {
			return moment(dateTime)
				.format("YYYY-MM-DD")
				.toString();
		}
		return moment()
			.format("YYYY-MM-DD")
			.toString();
	}
	parseTime(dateTime) {
		if (moment(dateTime).isValid() == false) return "00:00";
		return moment(dateTime)
			.format("HH:mm")
			.toString();
	}

	renderAddress(shipment) {
		return (
			<div className="pickup-address">
				<div>{shipment.recipientInformation.addressLine1}</div>
				<div>{shipment.recipientInformation.addressLine2}</div>
				<div>{`${shipment.recipientInformation.city}, ${
					shipment.recipientInformation.state
					} ${shipment.recipientInformation.zipcode}`}</div>
			</div>
		);
	}

	render() {
		const { classes, modalError } = this.props;
		const shipment = this.state.shipment;

		return (
			<div>
				<Button
					variant="contained"
					onClick={this.handleOpen}
					className={classes.modalActionButton}
					disabled={!shipment.universityApprovals.isEcoApproved}
				>
					{shipment.pickupScheduled.startPickup == ""
						? "Schedule Pickup"
						: "Reschedule Pickup"}
				</Button>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<div className={classes.heading}>
							<Typography className={classes.titleHeading} gutterBottom>
								Schedule a pickup
							</Typography>
						</div>

						{/* Headings */}
						<Grid container spacing={32}>
							<Grid item xs={4}>
								<Typography className={classes.subtitleHeading}>
									Desired pickup date
								</Typography>
							</Grid>

							<Grid item xs={3}>
								<Typography className={classes.subtitleHeading}>
									Pickup time
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.toHeading}>TO</Typography>
							</Grid>
						</Grid>

						{/* Date and time picker row */}
						<Grid container spacing={32}>
							<Grid item xs={4}>
								<TextField
									id="date"
									type="date"
									value={this.state.pickupDate}
									onChange={this.updatePickupDate}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									id="starttime"
									type="time"
									value={this.state.startTime}
									InputLabelProps={{
										shrink: true
									}}
									inputProps={{
										step: 300 // 5 min
									}}
									onChange={this.updateStartTime}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									id="endtime"
									type="time"
									value={this.state.endTime}
									InputLabelProps={{
										shrink: true
									}}
									inputProps={{
										step: 300 // 5 min
									}}
									onChange={this.updateEndTime}
								/>
							</Grid>
						</Grid>

						{/* Map and Address */}
						<Grid container spacing={32} className={classes.mainAddress}>
							<Grid item xs={4}>
								<Typography className={classes.subtitleHeading}>
									Pickup instructions:
								</Typography>
								<div>
									<TextField
										multiline
										rows="3"
										value={this.state.pickUpInstructions}
										className="feedback-multiline-text"
										onChange={this.updatePickupInstructions}
										margin="normal"
										variant="outlined"
									/>
								</div>
								<Typography className={classes.subtitleHeading}>
									Pickup address:
								</Typography>
								{/* <Typography className={classes.addressText}> */}
								{shipment.recipientInformation && this.renderAddress(shipment)}

								{/* </Typography> */}
								<Typography className={classes.coordinatesText}>
									<Grid container spacing={32}>
										<Grid item xs={6}>
											29.0000000
										</Grid>
										<Grid item xs={6}>
											29.0000000
										</Grid>
									</Grid>
									<p>N 29 51 53''</p>
									<p>W 29 51 53''</p>
								</Typography>
								<div>
									<img src={MapIcon} />
									<Typography className={classes.mapImage}>
										Modify Address{" "}
									</Typography>
								</div>
							</Grid>

							<Grid item xs={8}>
								<img src={TestImage} height="235" />
							</Grid>
						</Grid>

						{/* Buttons */}
						<Grid
							container
							justify="flex-end"
							className={classes.buttonContainer}
						>
							<Grid item xs={7}>
								{modalError && (
									<div className="modal-submission-error">
										Error submitting schedule pickup datetime.
									</div>
								)}
							</Grid>
							{/* <Grid item xs={5} /> */}
							<Grid
								item
								xs={2}
								className={classes.buttonItem}
								justifyContent="flex-end"
							>
								<Button onClick={e => this.handleClose()} variant="outlined">
									Cancel
								</Button>
							</Grid>

							<Grid
								justify="flex-end"
								item
								xs={3}
								className={classes.buttonItem}
							>
								<Button onClick={e => this.onSchedule()} variant="outlined">
									Schedule
								</Button>
							</Grid>
						</Grid>
					</div>
				</Modal>
			</div>
		);
	}
}

SchedulePickupModal.propTypes = {
	classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
let SchedulePickupModalFinal = withStyles(styles)(SchedulePickupModal);

function mapStateToProps(state) {
	return {
		modalError: selectors.getModalError(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updatePickupDateTime: pickupDetails => {
			dispatch(actions.updatePickupDateTime(pickupDetails));
		}
	};
}

SchedulePickupModalFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(SchedulePickupModalFinal);

export default SchedulePickupModalFinal;
