import * as types from "./actionTypes";

export function getShipments() {
	return { type: types.GET_SHIPMENT_LIST };
}

export function showShipments(shipments) {
	return { type: types.SHOW_SHIPMENT_STORE, shipments };
}

export function shipmentRequestFailed(error) {
	return { type: types.SHIPMENT_REQUEST_FAILED, error };
}

export function updatePickupDateTime(pickupDetails) {
	return { type: types.UPDATE_PICKUP_DATETIME, pickupDetails };
}

export function modalSubmissionError(error) {
	return { type: types.MODAL_SUBMIT_ERROR, error };
}

export function updateApproval(approvalDetails) {
	return { type: types.UPDATE_APPROVAL, approvalDetails };
}

export function confirmDelivery(details) {
	return { type: types.CONFIRM_DELIVERY, details };
}

export function clearCustoms(details) {
	return { type: types.CLEAR_CUSTOMS, details };
}
export function loginUser(credentials) {
	return { type: types.LOGIN_BEGIN, credentials };
}
export function loginSuccess(userProfile) {
	return { type: types.LOGIN_SUCCESS, userProfile };
}
export function loginFailed(error) {
	return { type: types.LOGIN_FAILURE, error };
}
export function getUsers() {
	return { type: types.GET_USERS };
}
export function putUsersInStore(users) {
	return { type: types.PUT_USERS_IN_STORE, users };
}
export function createNewNext() {
	return { type: types.CREATE_NEW_NEXT };
}
export function createNewBack() {
	return { type: types.CREATE_NEW_BACK };
}
export function resetCreatePage() {
	return { type: types.RESET_CREATE_NEW };
}
export function updateBlockchain(blockchainDetails) {
	return { type: types.UPDATE_BLOCKCHAIN, blockchainDetails };
}
export function updateShipmentOrder(shipmentObject) {
	return { type: types.UPDATE_SHIPMENT_ORDER, shipmentObject };
}

export function submitNewShippingOrder() {
	return { type: types.SUBMIT_NEW_SHIPPING_ORDER };
}
