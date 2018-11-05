import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
	Button,
	InputLabel,
	TextField,
	Typography,
	OutlinedInput,
	Grid,
	FormControl,
	Select,
	FormControlLabel,
	Checkbox
} from "@material-ui/core";

import helper from "./helper/helper";
import { connect } from "react-redux";
import { actions, selectors } from "../../redux";
import combinedStyles from './CreateShipmentStyles'

const styles = combinedStyles;

class DryIcePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dryIceWeight: "3",
			dryIceWeightUnits: "lb",
			packageType: "Fiberboard Box",
			packageWeight: "6",
			packageWeightUnits: "lb",
			length: "10",
			width: "10",
			height: "10",
			lwhUnits: "in",
			purposeOfShipment: "For research purposes only",
			descriptionOfShipment: "Shipping research material to China",
			dangerousGoodsInformation: {
				inaccessibleFlag: false,
				overpackFlag: true,
				dryIceFlag: false
			}
		};
	}

	handleCheckboxChange = event => {
		let newDangerousGoodsInformation = this.state.dangerousGoodsInformation;
		newDangerousGoodsInformation[event.target.name] = event.target.checked;
		this.setState({ dangerousGoodsInformation: newDangerousGoodsInformation });
		//this.setState({ [event.target.name]: event.target.checked });
	};

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
		this.props.updateShipmentOrder({ dryIce: this.state });
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
						<Grid container spacing={32} className="flexSection">
							<Grid item xs={6}>
								<Typography className={classes.heading}>Dangerous Goods and Packing</Typography>
								{/* Package Weight */}
								<Grid item>
									<TextField
										name="packageWeight"
										label="Package Weight"
										variant="outlined"
										value={this.state.packageWeight}
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
											value={this.state.packageWeightUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="packageWeightUnits"
												/>
											}
										>
											{helper.renderMenuItems("weightUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Length Width Height */}
								<Grid item>
									<TextField
										name="length"
										label="L"
										variant="outlined"
										value={this.state.length}
										onChange={this.handleChange}
										className={classes.miniTextField}
									/>

									<TextField
										name="width"
										label="W"
										variant="outlined"
										value={this.state.width}
										onChange={this.handleChange}
										className={classes.miniTextField}
									/>

									<TextField
										name="height"
										label="H"
										variant="outlined"
										value={this.state.height}
										onChange={this.handleChange}
										className={classes.miniTextField}
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
											value={this.state.lwhUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="lwhUnits"
												/>
											}
										>
											{helper.renderMenuItems("dimensionUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Purpose of Shipment */}
								<Grid item>
									<TextField
										name="purposeOfShipment"
										label="Purpose of Shipment"
										variant="outlined"
										value={this.state.purposeOfShipment}
										onChange={this.handleChange}
										className={classes.largeFormControl}
									/>
								</Grid>

								{/* Description of Shipment */}
								<Grid item>
									<TextField
										name="descriptionOfShipment"
										label="Description of Shipment"
										variant="outlined"
										value={this.state.descriptionOfShipment}
										onChange={this.handleChange}
										className={classes.largeFormControl}
										multiline
										rows="4"
									/>
								</Grid>
							</Grid>

							<Grid item xs={6}>
								{/* Dry Ice Weight */}
								<Typography className={classes.heading}>Dry Ice Weight</Typography>
								<Grid item>
									<TextField
										name="dryIceWeight"
										label="Dry Ice Weight"
										variant="outlined"
										value={this.state.dryIceWeight}
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
											value={this.state.dryIceWeightUnits}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="dryIceWeightUnits"
												/>
											}
										>
											{helper.renderMenuItems("weightUnits")}
										</Select>
									</FormControl>
								</Grid>

								{/* Package Type */}
								<Grid item>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel
											ref={ref => {
												this.InputLabelRef = ref;
											}}
											htmlFor="outlined-age-simple"
										>
											Package Type
									</InputLabel>
										<Select
											value={this.state.packageType}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="packageType"
												/>
											}
										>
											{helper.renderMenuItems("packageType")}
										</Select>
									</FormControl>
								</Grid>

								{/* Dangerous Goods Shipping Information */}
								<Typography className={classes.heading}>
									Dangerous Goods Shipping Information
							</Typography>
								<Grid container>
									{/* Left side checkbox items */}
									<Grid item>
										<Grid item>
											<FormControlLabel
												disabled
												control={<Checkbox checked={this.state.dangerousGoodsInformation.inaccessibleFlag}
													name="inaccessibleFlag" />}
												label="Inaccessible Dangerous Goods"
											/>
										</Grid>
										<Grid item>
											<FormControlLabel
												disabled
												control={<Checkbox checked={this.state.dangerousGoodsInformation.overpackFlag}
													name="overpackFlag" />}
												label="Overpack"
											/>
										</Grid>
									</Grid>
									{/* Right side checkbox items */}
									<Grid item>
										<Grid item>
											<FormControlLabel
												control={<Checkbox checked={this.state.dangerousGoodsInformation.dryIceFlag}
													name="dryIceFlag"
													onChange={this.handleCheckboxChange} />}
												label="Dry Ice"
											/>
										</Grid>
									</Grid>
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

DryIcePage.propTypes = {
	classes: PropTypes.object.isRequired
};

let DryIcePageFinal = withStyles(styles)(DryIcePage);

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

DryIcePageFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(DryIcePageFinal);
export default DryIcePageFinal;
