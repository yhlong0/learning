import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";


const styles = theme => ({
	root: {
		width: "100%",
	},
	textField: {
		marginTop: "0",
		width: "300px",
		right: "40px",
		padding: "0px"
	},
	textFieldInput: {
		fontSize: "10px",
		margin: "-10px -5px -10px -5px"
	},
	shipmentSubText: {
		fontSize: "10px",
		fontWeight: "100"
	}
});

class ShipmentDescriptor extends React.Component {


	render() {
		const { classes, materialClassification, description } = this.props;

		return (
			<div>

				{ /* Material Classification */}
				<Grid container spacing={16}>
					<Grid item xs={2}></Grid>
					<Grid item xs={10}>
						<Grid container spacing={0}>
							<Grid item xs={3} >
								<Typography className={classes.shipmentSubText}>Material Classification: </Typography>
							</Grid>
							<Grid item>
								<TextField
									multiline
									disabled
									rows="2"
									value={materialClassification}
									className={classes.textField}
									InputProps={{
										classes: {
											input: classes.textFieldInput,
										}
									}}
									margin="normal"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* Description of Shipment */}
				<Grid container spacing={16}>
					<Grid item xs={2}>

					</Grid>
					<Grid item xs={10}>
						<Grid container spacing={0}>
							<Grid item xs={3}>
								<Typography className={classes.shipmentSubText}>Description of shipment: </Typography>
							</Grid>
							<Grid item>
								<TextField
									rows="2"
									multiline
									disabled
									value={description}
									className={classes.textField}
									InputProps={{
										classes: {
											input: classes.textFieldInput,
										},
									}}
									margin="none"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(ShipmentDescriptor);
