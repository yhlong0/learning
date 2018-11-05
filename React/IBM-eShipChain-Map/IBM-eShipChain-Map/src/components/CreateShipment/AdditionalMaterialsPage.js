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
import TextField from "@material-ui/core/TextField";
import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";
import combinedStyles from "./CreateShipmentStyles";

const styles = combinedStyles;

class AdditionalMaterialsPage extends React.Component {
	constructor(props) {
		super(props);
		// this.state = { open: false, feedback: "" };
		// this.feedbackChange = this.feedbackChange.bind(this);
	}

	state = {
		primaryQuantity: "10",
		primaryQuantityUnits: "ml",
		numberOfUnits: "5",
		outerQuantity: "50",
		outerQuantityUnits: "ml",
		grossWeight: "2",
		grossWeightUnits: "lb",
		netValue: "100",
		currency: "USD",
		internationalShipmentInformation: {
			eccn: "EAR99",
			scheduleB: "3002.90.5150",
			exportCode: "OS",
			license: "NLR",
			licenseType: "33",
			licenseExpiryDate: ""
		}
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
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
		this.props.updateShipmentOrder({ additionalMaterial: this.state });
	};
	handleBack = () => {
		this.props.handleBack();
	};
	render() {
		const { classes } = this.props;

		return (
			<div>
				<div className={classes.pageContent}>
					<form autoComplete="off">
						<Grid container spacing={16} className="flexSection">
							<Grid item xs={6}>
								{/* Primary Quantity */}
								<Grid item>
									<Typography className={classes.heading}>
										Classification: Category-B, Human Blood Pathogen
								</Typography>
									<TextField
										name="primaryQuantity"
										label="Primary Quantity"
										variant="outlined"
										value={this.state.primaryQuantity}
										onChange={this.handleChange}
										className={classes.formControl}
									/>
									<FormControl
										variant="outlined"
										className={classes.unitsDropdown}
									>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Units
									</InputLabel>
										<Select
											value={this.state.primaryQuantityUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="primaryQuantityUnits"
												/>
											}
										>
											{helper.renderMenuItems("volumeUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Number of Units */}
								<Grid item>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Number of Units
									</InputLabel>
										<Select
											value={this.state.numberOfUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="numberOfUnits"
												/>
											}
										>
											{helper.renderMenuItems("numberOfUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Outer Quantity */}
								<Grid item>
									<TextField
										name="outerQuantity"
										label="Outer Quantity"
										variant="outlined"
										value={this.state.outerQuantity}
										onChange={this.handleChange}
										className={classes.formControl}
									/>
									<FormControl
										variant="outlined"
										className={classes.unitsDropdown}
									>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Units
									</InputLabel>
										<Select
											value={this.state.outerQuantityUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="outerQuantityUnits"
												/>
											}
										>
											{helper.renderMenuItems("volumeUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Gross Weight */}
								<Grid item>
									<TextField
										name="grossWeight"
										label="Gross Weight"
										variant="outlined"
										value={this.state.grossWeight}
										onChange={this.handleChange}
										className={classes.formControl}
									/>
									<FormControl
										variant="outlined"
										className={classes.unitsDropdown}
									>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Units
									</InputLabel>
										<Select
											value={this.state.grossWeightUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="grossWeightUnits"
												/>
											}
										>
											{helper.renderMenuItems("weightUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Net Value */}
								<Grid item>
									<TextField
										name="netValue"
										label="Net Value"
										variant="outlined"
										value={this.state.netValue}
										onChange={this.handleChange}
										className={classes.formControl}
									/>
									<FormControl
										variant="outlined"
										className={classes.unitsDropdown}
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
							</Grid>
							{/* Material Classification */}
							<Grid item xs={6}>
								<Typography className={classes.heading}>
									International Shipment Information
							</Typography>
								<div className={classes.prefilledInformationDiv}>
									<Grid container spacing={16}>
										{/* Left side checkbox items */}
										<Grid item>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>ECCN: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.eccn}
													</span>
												</Typography>
											</Grid>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>Schedule B: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.scheduleB}
													</span>
												</Typography>
											</Grid>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>Export Code: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.exportCode}
													</span>
												</Typography>
											</Grid>
										</Grid>
										{/* Right side checkbox items */}
										<Grid item>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>License: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.license}
													</span>
												</Typography>
											</Grid>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>License Type: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.licenseType}
													</span>
												</Typography>
											</Grid>
											<Grid item>
												<Typography className={classes.staticText}>
													<span className={classes.label}>License Expiry Date: </span>
													<span className={classes.internationalShipmentText}>
														{this.state.internationalShipmentInformation.licenseExpiryDate}
													</span>
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</div>
								{/* UN 3373 */}
								<Grid item>
									<div style={{
										display: "inline-block", marginTop: "30px"
									}} >
										<Typography className={classes.un3373}>UN 3373 Affects Humans</Typography>
									</div>
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

AdditionalMaterialsPage.propTypes = {
	classes: PropTypes.object.isRequired
};

let AdditionalMaterialsPageFinal = withStyles(styles)(AdditionalMaterialsPage);

function mapStateToProps(state) {
	return {
		//activeStep: state.createNewShipmentActivePage
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

AdditionalMaterialsPageFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdditionalMaterialsPageFinal);
export default AdditionalMaterialsPageFinal;
