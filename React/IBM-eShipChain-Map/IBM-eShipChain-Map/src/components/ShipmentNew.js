import React from "react";
import "./ShipmentNew.css";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ClassificationPage from "./CreateShipment/ClassificationPage";
import AdditionalMaterialPage from "./CreateShipment/AdditionalMaterialsPage";
import DryIcePage from "./CreateShipment/DryIcePage";
import CustomsPage from "./CreateShipment/CustomsPage";
import ShippingPage from "./CreateShipment/ShippingPage";
import BillingPage from "./CreateShipment/BillingPage";
import SummaryPage from "./CreateShipment/SummaryPage";

import { connect } from "react-redux";
import { actions, selectors } from "../redux";
import history from "../history";
import combinedStyles from './CreateShipment/CreateShipmentStyles'

const styles = combinedStyles;

function getSteps() {
	return [
		"Classification",
		"Additional Material Instructions",
		"Dry Ice & DGR Packaging",
		"Customs",
		"Shipping",
		"Billing"
	];
}

function getHeadings() {
	return [
		"Shipment Classification",
		"Additional Material Instructions",
		"Dangerous Goods and Packing",
		"Customs",
		"Receiver Information",
		"Billing Information"
	];
}

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			return <ClassificationPage />;
		case 1:
			return <AdditionalMaterialPage />;
		case 2:
			return <DryIcePage />;
		case 3:
			return <CustomsPage />;
		case 4:
			return <ShippingPage />;
		case 5:
			return <BillingPage />;
		default:
			return <Typography>Error State</Typography>;
	}
}

class ShipmentNew extends React.Component {
	state = {
		activeStep: 0
	};
	componentDidMount() {
		this.props.getUsers();
	}
	submitNewShippingOrder = () => {
		this.props.submitNewShippingOrder();
		history.push("/shipments");
	};
	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const headings = getHeadings();
		const { activeStep } = this.props;

		return (
			<div className="pageContainer">
				<div className={classes.root} >
					<div className={this.props.activeStep === steps.length ? classes.summaryPageContainer : classes.shipmentPageContainer}>
						<Typography className={classes.titleHeading}>
							{headings[activeStep]}
						</Typography>
						<div>
							{this.props.activeStep === steps.length ? (
								<div>
									<Typography className={classes.titleHeading}>Summary</Typography>
									<SummaryPage />

									<Button
										variant="contained"
										color="primary"
										onClick={this.submitNewShippingOrder}
										disabled
									>
										Submit
							</Button>
								</div>
							) : (
									<div className={classes.instructions}>
										{getStepContent(activeStep)}
									</div>
								)}
						</div>
					</div>

					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map(label => {
							return (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</ div>
			</div>
		);
	}
}

let ShipmentNewFinal = withStyles(styles)(ShipmentNew);

function mapStateToProps(state) {
	return {
		activeStep: state.createNewShipmentActivePage,
		newShipmentOrderObject: state.newShipmentOrderObject
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getUsers: () => {
			dispatch(actions.getUsers());
		},
		handleReset: () => {
			dispatch(actions.resetCreatePage());
		},
		submitNewShippingOrder: () => {
			dispatch(actions.submitNewShippingOrder());
		}
	};
}

ShipmentNewFinal = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShipmentNewFinal);
export default withStyles(styles)(ShipmentNewFinal);
