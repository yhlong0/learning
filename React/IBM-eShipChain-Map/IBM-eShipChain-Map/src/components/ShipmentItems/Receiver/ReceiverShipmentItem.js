import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import ShipmentDescriptor from "../common/ShipmentDescriptor";
import ConfirmDeliveryModal from "../common/ConfirmDeliveryModal/ConfirmDeliveryModal";
import "./ReceiverShipmentItem.css";

const styles = theme => ({
	root: {
		width: "100%"
	},
	rowHeading: {
		fontWeight: "500"
	},
	rowSubtitle: {
		color: "#909090",
		fontSize: "13px"
	},
	clearCustomsButton: {
		fontWeight: "600",
		height: "30px"
	},
	documentLastRow: {
		position: "relative",
		top: "10px"
	},
	scheduleBox: {
		display: "flex",
		marginLeft: "auto"
	},
	shipmentSubText: {
		fontWeight: "500",
		fontSize: "12px"
	},
	displayFlex: {
		display: "flex"
	},
	greyBackground: {
		backgroundColor: '#f7f7f7'
	}
});

class ShipmentItem extends Component {
	render() {
		const { classes, shipment } = this.props;

		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						{/* Row details */}
						<Grid container spacing={16}>
							<Grid item xs={2}>
								<Typography className={classes.rowHeading}>
									{shipment.displayID}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								{shipment.shipperInformation && (
									<div>
										<Typography className={classes.rowHeading}>
											{shipment.shipperInformation.firstName}{" "}
											{shipment.shipperInformation.lastName}
										</Typography>
										<Typography className={classes.rowSubtitle}>
											{shipment.shipperInformation.city},{" "}
											{shipment.shipperInformation.state}
										</Typography>
									</div>
								)}
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.rowHeading}>
									{shipment.status}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.rowHeading}>
									{shipment.carrierInformation.carrierName}
								</Typography>
								<Typography className={classes.rowSubtitle}>
									{shipment.carrierInformation.carrierVariant}
								</Typography>
							</Grid>
						</Grid>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails className={classes.greyBackground}>
						<Grid container>
							<Grid item xs={12}>
								<ShipmentDescriptor
									materialClassification={
										shipment.material.materialClassification
									}
									description={shipment.description}
								/>

								{/* Document and Shipment Button */}
								<Grid
									container
									spacing={16}
									className={classes.documentLastRow}
								>
									<Grid item xs={8} />
									<Grid
										container
										item
										xs={4}
										className={classes.displayFlex}
										justify="flex-end"
									>
										<ConfirmDeliveryModal shipment={shipment} />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default withStyles(styles)(ShipmentItem);
