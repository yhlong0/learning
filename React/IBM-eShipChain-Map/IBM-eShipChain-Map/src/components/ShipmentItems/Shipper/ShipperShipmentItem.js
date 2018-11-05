import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ApproveShipmentModal from "../common/ApproveShipmentModal";
import SchedulePickupModal from "../common/SchedulePickupModal/SchedulePickupModal";
import ShipmentDescriptor from "../common/ShipmentDescriptor";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import config from "../../../config";
import FirstIcon from "../../../4.png";
import SecondIcon from "../../../5.png";
import Corrosive from "../../../corrosive.png";
import "./ShipperShipmentItem.css";

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
	documentLastRow: {
		position: "relative",
		top: "10px"
	},
	scheduleBox: {
		display: "flex",
		marginLeft: "auto"
	},
	shipmentSubText: {
		fontSize: "10px",
		fontWeight: "100"
	},
	displayFlex: {
		display: "flex"
	},
	docMenu: {
		position: "absolute",
		left: "10px",
		zIndex: "10"
	},
	menuHangover: {
		position: "relative"
	},
	greyBackground: {
		backgroundColor: '#f7f7f7'
	}
});

function imageIcon(key) {
	if (key % 3 == 2) { // 1st element
		return FirstIcon;
	}
	if (key % 3 == 1) { // 2nd element
		return SecondIcon;
	}
	if (key % 3 == 0) { // 3rd element
		return Corrosive;
	}
	return Corrosive;
}

class ShipmentItem extends Component {
	openDocument = link => {
		console.log("open document + ", config.apiRoot + link);
		var win = window.open(config.apiRoot + link, "_blank");
		win.focus();
	};

	render() {
		const { classes, shipment, role } = this.props;

		const isEco = role === "eco";

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
								<Typography className={classes.rowHeading}>
									{shipment.recipientInformation.firstName}{" "}
									{shipment.recipientInformation.lastName}
								</Typography>
								<Typography className={classes.rowSubtitle}>
									{shipment.recipientInformation.city},{" "}
									{shipment.recipientInformation.state}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.rowHeading}>
									{shipment.status}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography className={classes.rowHeading}>
									{shipment.carrierInformation.carrierName}
								</Typography>
								<Typography className={classes.rowSubtitle}>
									{shipment.carrierInformation.carrierVariant}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography align="center">
									{shipment.universityApprovals.isEhsApproved ? (
										<CheckCircleIcon color="action" />
									) : null}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography align="center">
									{shipment.universityApprovals.isEcoApproved ? (
										<CheckCircleIcon color="action" />
									) : null}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography align="center">
									{shipment.pickupScheduled.startPickup != "" ? (
										<CheckCircleIcon color="action" />
									) : null}
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
									<Grid item xs={2} />
									<Grid item xs={5}>
										<Grid container spacing={8}>
											<Grid item>
												{shipment.documents ? (
													<Typography className={classes.shipmentSubText}>
														Documents:{" "}
													</Typography>
												) : null}
											</Grid>
											<Grid item className={classes.menuHangover}>
												{shipment.documents ? (
													<Paper className={classes.docMenu}>
														<MenuList>
															{shipment.documents
																? shipment.documents.map((d, index) => (
																	<MenuItem
																		key={index}
																		onClick={event =>
																			this.openDocument(d.documentLink)
																		}
																	>
																		<ListItemText
																			classes={{ primary: classes.primary }}
																			primary={d.documentName}
																		/>

																		<img src={imageIcon(index)} className="icon" />
																	</MenuItem>
																))
																: null}
														</MenuList>
													</Paper>
												) : null}
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={5}
										className={classes.displayFlex}
										justify="flex-end"
									>
										<p>{isEco}</p>
										{isEco ? (
											<ApproveShipmentModal
												shipment={shipment}
												isEcoApproved={
													shipment.universityApprovals.isEcoApproved
												}
											/>
										) : (
												""
											)}

										<SchedulePickupModal shipment={shipment} />
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
