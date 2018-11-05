import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";

import combinedStyles from './CreateShipmentStyles';

const styles = combinedStyles;

class CustomsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			broker: {},
			customsValue: "100",
			currency: "USD",
			termsOfSale: "Delivery Duty Paid",
			exportIntent: "Not for Resale",
			itn: "N/A",
			descriptionOfShipment: "Shipping research material to China"
		};
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSelectClose = event => {
		this.setState({ open: false });
	};

	handleSelectOpen = event => {
		this.setState({ [event.target.name]: { open: true } });
	};

	handleNext = () => {
		this.props.handleNext();
		this.props.updateShipmentOrder({ customs: this.state });
	};
	handleBack = () => {
		this.props.handleBack();
	};

	render() {
		const { classes } = this.props;

		this.state.broker = helper.getFilteredUsers(this.props.users, "broker")[0];

		return (
			<div>
				<div className={classes.pageContent}>
					<form autoComplete="off">
						<Grid container spacing={8} className="flexSection">
							<Grid item xs={5}>
								{/* Broker Information */}
								<Grid item>
									<Typography className={classes.heading}>Broker Information</Typography>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Broker Name
									</InputLabel>
										<Select
											value={this.state.broker}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="broker"
												/>
											}
										>
											{helper.renderUserMenuItems(this.props.users, "broker")}
										</Select>
									</FormControl>
								</Grid>

								{/* Broker Information */}
								<div
									className={classes.userInformationDiv}
									hidden={Object.keys(this.state.broker) == 0}
								>
									<Grid item>
										<Typography className={classes.userText}>
											{this.state.broker.firstName} {this.state.broker.lastName}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.broker.addressLine1}{" "}
											{this.state.broker.addressLine2}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.broker.city}, {this.state.broker.state}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.broker.zipcode} {this.state.broker.country}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{this.state.broker.phone}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.userText}>
											{" "}
											{this.state.broker.email}
										</Typography>
									</Grid>
								</div>
							</Grid>
							{/* Customs Information */}
							<Grid item xs={6}>
								<Typography className={classes.heading}>Customs Information</Typography>

								{/* Customs Value */}
								<Grid item>
									<TextField
										name="customsValue"
										label="Customs Value"
										variant="outlined"
										value={this.state.customsValue}
										onChange={this.handleChange}
										className={classes.formControl}
									/>
									<FormControl
										variant="outlined"
										className={classes.currencyDropDown}
									>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Currency
									</InputLabel>
										<Select
											value={this.state.currency}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="currency"
												/>
											}
										>
											{helper.renderMenuItems("currency")}
										</Select>
									</FormControl>
								</Grid>

								{/* Terms of Sale  */}
								<Grid item>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Terms of Sale
									</InputLabel>
										<Select
											value={this.state.termsOfSale}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="termsOfSale"
												/>
											}
										>
											{helper.renderMenuItems("termsOfSale")}
										</Select>
									</FormControl>
								</Grid>

								{/* Export Intent */}
								<Grid item>
									<TextField
										name="exportIntent"
										label="Export Intent"
										variant="outlined"
										value={this.state.exportIntent}
										onChange={this.handleChange}
										className={classes.largeFormControl}
									/>
								</Grid>

								{/* ITN/FTSR */}
								<Grid item>
									<TextField
										name="itn"
										label="ITN/FTSR"
										variant="outlined"
										value={this.state.itn}
										onChange={this.handleChange}
										className={classes.largeFormControl}
									/>
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
							>Next</Button>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

CustomsPage.propTypes = {
	classes: PropTypes.object.isRequired
};

let CustomsPageFinal = withStyles(styles)(CustomsPage);

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

CustomsPageFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomsPageFinal);

export default CustomsPageFinal;
