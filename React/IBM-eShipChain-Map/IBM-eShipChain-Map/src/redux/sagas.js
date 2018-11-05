//import "isomorphic-fetch";
//import { delay } from "redux-saga";
import {
	call,
	put,
	take,
	takeEvery,
	select,
	takeLatest
} from "redux-saga/effects";
import * as types from "./actionTypes";
import * as actions from "./actions";
import * as selectors from "./selectors";
import config from "../config";
import converter from "./formatConverter";

export function* fetchJson(...args) {
	const response = yield call(fetch, ...args); // eslint-disable-line no-undef
	if (!response.ok) {
		const err = new Error(response.statusText);
		err.response = response;
		throw err;
	}

	return yield call([response, response.json]);
}
export function getJsonOptions() {
	return {
		credentials: "same-origin",
		method: "GET",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json"
		}
	};
}
export function putJsonOptions(body) {
	return {
		credentials: "same-origin",
		method: "PUT",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	};
}
export function postJsonOptions(body) {
	return {
		credentials: "same-origin",
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	};
}

export function* fetchShipments(action) {
	try {
		let userProfile = yield select(selectors.getUserProfile);
		//console.log("userPro: ", userProfile);
		let shipmentEndPoint = "";

		switch (userProfile.role) {
		case "eco":
		case "shipper":
			shipmentEndPoint = `https://eship-shipment-service.mybluemix.net/shippers/${
				userProfile.username
			}/orders`;
			break;
		case "broker":
			shipmentEndPoint = `https://eship-shipment-service.mybluemix.net/brokers/${
				userProfile.username
			}/orders`;
			break;
		case "receiver":
			//receiver
			shipmentEndPoint = `https://eship-shipment-service.mybluemix.net/receivers/${
				userProfile.username
			}/orders`;
			break;
		default:
			//default to shipper
			shipmentEndPoint = `https://eship-shipment-service.mybluemix.net/shippers/${
				userProfile.username
			}/orders`;
		}
		const result = yield call(fetchJson, shipmentEndPoint, getJsonOptions());
		//console.log("saga:", result);
		let shipments = [];
		if (userProfile.role == "shipper") {
			shipments = result.shippingOrder;
		} else if (userProfile.role == "receiver") {
			shipments = result.orders;
		} else if (userProfile.role == "broker") {
			shipments = result.shippingOrders;
		} else if (userProfile.role == "eco") {
			shipments = result.shippingOrder;
		} else shipments = [];
		yield put(actions.showShipments(shipments));
	} catch (error) {
		yield put(actions.shipmentRequestFailed(error));
	}
}
export function* updatePickupDateTime(action) {
	let body = {
		startPickup: action.pickupDetails.startDateTime,
		endPickup: action.pickupDetails.endDateTime,
		pickUpLogitude: "33",
		pickUpLatitude: "33",
		pickUpInstructions: action.pickupDetails.pickUpInstructions,
		carrierConfirmation: ""
	};
	try {
		const result = yield call(
			fetchJson,
			`https://eship-shipment-service.mybluemix.net/shippingorder/${
				action.pickupDetails.shippingOrderID
			}`,
			putJsonOptions(body)
		);
		console.log("saga:", result);
		// isScheduledPickup: true moves shipment from shipper to broker
		if (action.pickupDetails.isFirstCall) {
			yield put(
				actions.updateBlockchain({
					shippingOrderID: action.pickupDetails.shippingOrderID,
					isScheduledPickup: true
				})
			);
		}
		yield put(actions.getShipments());
	} catch (error) {
		yield put(actions.modalSubmissionError(error));
		console.log("update pickup schedule", error);
	}
}
export function* updateBlockchain(action) {
	let body = {
		isScheduledPickup: action.blockchainDetails.isScheduledPickup
	};
	try {
		const result = yield call(
			fetchJson,
			`https://eship-shipment-service.mybluemix.net/carriers/update/${
				action.blockchainDetails.shippingOrderID
			}`,
			postJsonOptions(body)
		);
		console.log("saga:", result);
		// yield put(actions.getShipments());
	} catch (error) {
		yield put(actions.modalSubmissionError(error));
		console.log("blockchain update error", error);
	}
}
export function* updateApproval(action) {
	let body = {
		isEcoApproved: action.approvalDetails.isEcoApproved,
		ecoComments: action.approvalDetails.ecoComments
	};
	try {
		const result = yield call(
			fetchJson,
			`https://eship-shipment-service.mybluemix.net/ecoapproval/${
				action.approvalDetails.shippingOrderID
			}`,
			putJsonOptions(body)
		);
		console.log("saga:", result);
		yield put(actions.getShipments());
	} catch (error) {
		yield put(actions.modalSubmissionError(error));
		console.log("update approval error: ", error);
	}
}
export function* confirmDelivery(action) {
	let body = {
		isDeliveryConfirmed: action.details.isDeliveryConfirmed,
		deliveryTimestamp: "",
		carrierRating: action.details.carrierRating,
		carrierFeedback: action.details.carrierFeedback
	};
	try {
		const result = yield call(
			fetchJson,
			`https://eship-shipment-service.mybluemix.net/receivers/${
				action.details.shippingOrderID
			}/confirmdelivery`,
			putJsonOptions(body)
		);
		console.log("saga:", result);
		yield put(actions.getShipments());
	} catch (error) {
		yield put(actions.modalSubmissionError(error));
		console.log("confirm delivery error: ", error);
	}
}
export function* clearCustoms(action) {
	let body = {
		isBrokerCleared: action.details.isBrokerCleared,
		brokerComments: action.details.brokerComments
	};
	try {
		const result = yield call(
			fetchJson,
			`https://eship-shipment-service.mybluemix.net/brokers/clearcustoms/${
				action.details.shippingOrderID
			}`,
			putJsonOptions(body)
		);
		console.log("saga:", result);
		// isScheduledPickup: false moves shipment from broker to receiver
		yield put(
			actions.updateBlockchain({
				shippingOrderID: action.details.shippingOrderID,
				isScheduledPickup: false
			})
		);
		yield put(actions.getShipments());
	} catch (error) {
		yield put(actions.modalSubmissionError(error));
		console.log("clear custom error: ", error);
	}
}

export function* submitNewShippingOrder(action) {
	let uiShipmentOrderObject = yield select(selectors.getNewShippingOrder);
	const convertedShippingOrder = converter.formatForBackEnd(
		uiShipmentOrderObject
	);
	let body = {
		...convertedShippingOrder
	};

	try {
		const result = yield call(
			fetchJson,
			`${config.apiRoot}/shippingorder`,
			postJsonOptions(body)
		);
		console.log("new order posted:", result);
		yield put(actions.resetCreatePage());
		yield put(actions.getShipments());
	} catch (error) {
		//yield put(actions.modalSubmissionError(error));
		console.log("new order posting error", error);
	}
}

export function* watchGetShipments() {
	yield takeEvery(types.GET_SHIPMENT_LIST, fetchShipments);
	yield takeEvery(types.UPDATE_PICKUP_DATETIME, updatePickupDateTime);
	yield takeEvery(types.UPDATE_APPROVAL, updateApproval);
	yield takeEvery(types.CONFIRM_DELIVERY, confirmDelivery);
	yield takeEvery(types.CLEAR_CUSTOMS, clearCustoms);
	yield takeEvery(types.UPDATE_BLOCKCHAIN, updateBlockchain);
	yield takeEvery(types.SUBMIT_NEW_SHIPPING_ORDER, submitNewShippingOrder);
}
export function* login(action) {
	const url = config.apiRoot + config.loginPath + action.credentials.username;
	try {
		const result = yield call(fetchJson, url, getJsonOptions());
		//console.log("login info:", result);
		if (result.success == false) throw new Error("Login failed!");
		yield put(actions.loginSuccess(result.profile));
	} catch (error) {
		yield put(actions.loginFailed(error));
	}
}

export function* getUsers(action) {
	const url = config.apiRoot + "/loginprofiles";
	try {
		const result = yield call(fetchJson, url, getJsonOptions());
		if (result.success == false) throw new Error("Login failed!");
		yield put(actions.putUsersInStore(result.users));
	} catch (error) {
		yield put(actions.loginFailed(error));
	}
}

export function* watchLogin() {
	yield takeEvery(types.LOGIN_BEGIN, login);
	yield takeLatest(types.GET_USERS, getUsers);
}
export default function* main() {
	yield [watchGetShipments(), watchLogin()];
}
