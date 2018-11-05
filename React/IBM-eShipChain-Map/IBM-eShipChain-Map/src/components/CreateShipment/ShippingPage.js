import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { InputLabel, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";

import combinedStyles from './CreateShipmentStyles';

const styles = combinedStyles;

class ShippingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shipper: {},
			receiver: {},
			billShipmentTo: 'Prepaid',
			billDutiesTo: 'Prepaid',
			billShipmentZip: '78758',
			billShipmentCountry: 'United States',
			billDutiesZip: '78758',
			billDutiesToCountry: 'United States'
		};
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleCheckboxChange = event => {
		this.setState({ [event.target.name]: event.target.checked });
	};

	handleSelectClose = event => {
		console.log("event", event);
		this.setState({ open: false });
	};

	handleSelectOpen = event => {
		this.setState({ [event.target.name]: { open: true } });
	};

	handleNext = () => {
		this.props.handleNext();
		this.props.updateShipmentOrder({ shipping: this.state });
	};

	handleBack = () => {
		this.props.handleBack();
	};

	render() {
		const { classes } = this.props;
		this.state.shipper = helper.getFilteredUsers(this.props.users, "shipper")[0];
		this.state.receiver = helper.getFilteredUsers(this.props.users, "receiver")[0];

		return (
			<div>
				<div className={classes.pageContent}>
					<form autoComplete="off">
						<Grid container spacing={8} className="flexSection">
							<Grid item xs={6}>
								<Typography className={classes.heading}>
									Shipper and Receiver Information
							</Typography>
								{/* Shipper Address */}
								<Grid item>
									<FormControl variant="outlined" className={classes.billingDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Shipper Address
									</InputLabel>
										<Select
											value={this.state.shipper}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="shipper"
												/>
											}
										>
											{helper.renderUserMenuItems(this.props.users, "shipper")}
										</Select>
									</FormControl>
								</Grid>

								{/* Shipper Information */}
								<div
									className={classes.userInformationDiv}
									hidden={Object.keys(this.state.shipper) == 0}
								>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.shipper.firstName} {this.state.shipper.lastName}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.shipper.addressLine1}{" "}
											{this.state.shipper.addressLine2}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.shipper.city}, {this.state.shipper.state}{" "}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.shipper.zipcode} {this.state.shipper.country}
										</Typography>
									</Grid>
								</div>

								{/* Receiver Address */}
								<Grid item>
									<FormControl variant="outlined" className={classes.billingDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Receiver Address
									</InputLabel>
										<Select
											value={this.state.receiver}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="receiver"
												/>
											}
										>
											{helper.renderUserMenuItems(this.props.users, "receiver")}
										</Select>
									</FormControl>
								</Grid>

								{/* Reciever Information */}
								<div
									className={classes.userInformationDiv}
									hidden={Object.keys(this.state.receiver) == 0}
								>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.receiver.firstName}{" "}
											{this.state.receiver.lastName}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.receiver.addressLine1}{" "}
											{this.state.receiver.addressLine2}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.receiver.city}, {this.state.receiver.state}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.receiver.zipcode} {this.state.receiver.country}
										</Typography>
									</Grid>
								</div>
							</Grid>

							{/* Ship date and accessorial */}
							<Grid item xs={6}>
								<Typography className={classes.heading}>Billing Information</Typography>
								{/* Bill Shipment To */}
								<Grid item>
									<FormControl variant="outlined" className={classes.billingDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Bill Shipment To
									</InputLabel>
										<Select
											value={this.state.billShipmentTo}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="billShipmentTo"
												/>
											}
										>
											{helper.renderMenuItems('billTo')}
										</Select>
									</FormControl>
								</Grid>

								{/* Bill To Country */}
								<Grid item>

									<TextField
										disabled
										name="billShipmentToZip"
										label="Zip Code"
										variant="outlined"
										value={this.state.billShipmentToZip}
										onChange={this.handleChange}
										className={classes.formControl}
									/>

									<FormControl disabled variant="outlined" className={classes.unitsDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Country
          </InputLabel>
										<Select
											value={this.state.billShipmentCountry}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="billShipmentCountry"
												/>
											}
										>
											{helper.renderCountryMenuItems()}
										</Select>
									</FormControl>
								</Grid>


								{/* Bill Duties/Taxes To Information */}
								<Grid item>
									<FormControl variant="outlined" className={classes.billingDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Bill Duties To
									</InputLabel>
										<Select
											value={this.state.billDutiesTo}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="billDutiesTo"
												/>
											}
										>
											{helper.renderMenuItems('billTo')}
										</Select>
									</FormControl>
								</Grid>

								{/* Bill Duties To Country */}
								<Grid item>

									<TextField
										disabled
										name="billDutiesToZip"
										label="Zip Code"
										variant="outlined"
										value={this.state.billDutiesToZip}
										onChange={this.handleChange}
										className={classes.formControl}
									/>

									<FormControl disabled variant="outlined" className={classes.unitsDropdown}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Country
          </InputLabel>
										<Select
											value={this.state.billDutiesToCountry}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="billDutiesToCountry"
												/>
											}
										>
											{helper.renderCountryMenuItems()}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</div>
				<Grid container className={classes.buttonContainer}>
					<Grid item>
						<div>
							<Button onClick={this.handleBack}>Back</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleNext}
							>
								Next
							</Button>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

ShippingPage.propTypes = {
	classes: PropTypes.object.isRequired
};

let ShippingPageFinal = withStyles(styles)(ShippingPage);

function mapStateToProps(state) {
	return {
		users: selectors.getUsers(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleNext: () => {
			dispatch(actions.createNewNext());
		},
		handleBack: () => {
			dispatch(actions.createNewBack());
		},
		updateShipmentOrder: shipmentObject => {
			dispatch(actions.updateShipmentOrder(shipmentObject));
		}
	};
}

ShippingPageFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShippingPageFinal);

export default ShippingPageFinal;
