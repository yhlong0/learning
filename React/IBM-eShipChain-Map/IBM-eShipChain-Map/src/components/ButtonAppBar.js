import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderBar from "../headerbar_nologo.svg";
import ESGLogo from "../eSGlogo.svg";
import "./ButtonAppBar.css";

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

function ButtonAppBar(props) {
	const { classes, history } = props;
	return (
		<div history={history} className={classes.root}>
			<AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						<Button
							className="title-button"
							onClick={() => {
								history.push("/");
							}}
						>
							<img src={ESGLogo} className="logo-name" />
						</Button>
						<img src={HeaderBar} className="header-bar" />
					</Typography>
				</Toolbar>
			</AppBar>
		</div >
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
