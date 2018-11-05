import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import getStore from "./redux/store"; //Redux Store
import "./App.css";
import Login from "./components/Login";
import ShipmentList from "./components/ShipmentList";
import ShipmentNew from "./components/ShipmentNew";
import MapPage from "./components/MapPage";
import NotFound from "./components/NotFound";
import history from "./history";
import Button from "@material-ui/core/Button";
import ButtonAppBar from "./components/ButtonAppBar";
import img from './img/LabBG.jpg';

let store = getStore(); //Redux store initialization

const formElementHeight = '56px';
const disabledColor = '#666666';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#02aeef'
		}
	},
	appBar: {
		backgroundColor: "#ffffff"
	},
	overrides: {
		MuiSelect: {
			root: {
				height: formElementHeight,
			},
			disabled: {
				color: disabledColor
			}
		},
		MuiButton: {
			raisedPrimary: {
				color: 'white'
			},
			root: {
				fontWeight: 500,
			},
			disabled: {
				color: disabledColor
			}
		}
	},
});

const backgroundStyle = {
	backgroundImage: 'url(' + img + ')',
	backgroundSize: 'cover',
	backgroundColor: 'purple'
}

const ReduxConnectedApp = function (props) {
	return <Provider store={store}>{props.children}</Provider>;
};

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<ReduxConnectedApp>
					<Router history={history}>
						<div className="App">
							<div className="App-header">
								<Route
									render={({ history }) => <ButtonAppBar history={history} />}
								/>
							</div>
							<div className="App-content" >
								<Switch>
									<Route exact path="/" component={Login} />
									<Route exact path="/shipments" component={ShipmentList} />
									<Route exact path="/shipments/new" component={ShipmentNew} />
									<Route exact path="/map" component={MapPage} />
									<Route component={NotFound} />
								</Switch>
							</div>
							<div className="App-footer">
								{}
							</div>
						</div>
					</Router>
				</ReduxConnectedApp>
			</MuiThemeProvider>
		);
	}
}

export default App;
