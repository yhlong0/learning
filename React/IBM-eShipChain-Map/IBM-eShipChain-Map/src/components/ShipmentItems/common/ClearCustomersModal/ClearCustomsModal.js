import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { generateKeyPairSync } from "crypto";
import "./ClearCustomsModal.css";
import { actions, selectors } from "../../../../redux";
import { connect } from "react-redux";

import modalStyles from "../ShipmentModalStyles";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const styles = modalStyles;

class ClearCustomsModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			shipment: props.shipment,
			brokerComments: ""
		};
		this.feedbackChange = this.feedbackChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	feedbackChange = event => {
		this.setState({ brokerComments: event.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onSubmit = () => {
		this.setState({ open: false });
		this.props.clearCustoms({
			brokerComments: this.state.brokerComments,
			isBrokerCleared: true,
			shippingOrderID: this.state.shipment.shippingOrderID,
			user: "tom@esg" // TODO : need to revisit
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Button
					variant="contained"
					onClick={this.handleOpen}
					className={classes.modalActionButton}
				>
					Clear Customs
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
								This shipment has been [cleared].
							</Typography>
							<Typography className={classes.secondaryHeading} gutterBottom>
								Please add any additional comments below.
							</Typography>
							<div className={classes.titleHeading}>
								<TextField
									multiline
									rows="8"
									value={this.state.brokerComments}
									onChange={this.feedbackChange}
									className="feedback-multiline-text"
									margin="normal"
									variant="outlined"
								/>
							</div>
						</div>

						{/* Buttons */}
						<Grid
							container
							justify="flex-end"
							justifyContent="flex-end"
							className={classes.buttonContainer}
						>
							<Grid item xs={8} />
							<Grid item xs={2} className={classes.buttonItem}>
								<Button
									disabled
									onClick={e => this.handleClose()}
									variant="outlined"
								>
									Cancel
								</Button>
							</Grid>

							<Grid
								container
								item
								xs={2}
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

ClearCustomsModal.propTypes = {
	classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
let ClearCustomsModalWrapped = withStyles(styles)(ClearCustomsModal);

function mapStateToProps(state) {
	return {
		//modalError: selectors.getModalError(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		clearCustoms: details => {
			dispatch(actions.clearCustoms(details));
		}
	};
}

ClearCustomsModalWrapped = connect(
	mapStateToProps,
	mapDispatchToProps
)(ClearCustomsModalWrapped);

export default ClearCustomsModalWrapped;
