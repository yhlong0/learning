//import {combineReducers} from 'redux'
import * as types from "./actionTypes";

const initialState = {
	shipments: undefined, //a list
	loading: true,
	userProfile: undefined,
	error: undefined,
	modalError: undefined,
	users: undefined,
	createNewShipmentActivePage: 0,
	newShipmentOrderObject: {
		shippingClassification: {
			receivingCountry: "",
			shippingClassification: "",
			materialName: "",
			materialType: "",
			additionalClassification: "",
			materialClassification: {
				human: true,
				trainingVerified: true,
				blood: true,
				categoryB: true,
				pathogen: true,
				biological: true,
				dryIce: true
			}
		},
		additionalMaterial: {
			primaryQuantity: "",
			primaryQuantityUnits: "",
			numberOfUnits: "",
			outerQuantity: "",
			outerQuantityUnits: "",
			grossWeight: "",
			grossWeightUnits: "",
			netValue: "",
			currency: "",
			internationalShipmentInformation: {
				eccn: "EAR99",
				scheduleB: "3002.90.5150",
				exportCode: "OS",
				license: "C30 - BIS REGULATIONS",
				licenseType: "456123789",
				licenseExpiryDate: "10/31/2018"
			}
		},
		dryIce: {
			dryIceWeight: "",
			dryIceWeightUnits: "",
			packageType: "",
			packageWeight: "",
			packageWeightUnits: "",
			length: "",
			width: "",
			height: "",
			lwhUnits: "",
			purposeOfShipment: "",
			descriptionOfShipment: "",
			dangerousGoodsInformation: {
				inaccessibleFlag: true,
				overpackFlag: true,
				dryIceFlag: true
			}
		},
		customs: {
			broker: {},
			customsValue: "",
			currency: "",
			termsOfSale: "",
			exportIntent: "",
			descriptionOfShipment: ""
		},
		shipping: {
			shipper: {},
			receiver: {},
			billShipmentTo: {},
			billDutiesTo: {}
		},
		billing: {
			shipDate: "",
			declaredValue: "",
			declaredValueCurrency: "",
			carrier: {},
			accessorialServices: {
				returnShipmentFlag: false,
				holdAtLocationFlag: false,
				signatureRequiredFlag: false,
				residentialDeliveryFlag: false,
				saturdayDeliveryFlag: false
			}
		}
	}
};

function reducer(state = initialState, action) {
	switch (action.type) {
	case types.GET_SHIPMENT_LIST:
		return Object.assign({}, state, {
			loading: true
		});

	case types.SHOW_SHIPMENT_STORE:
		return Object.assign({}, state, {
			shipments: action.shipments,
			loading: false,
			error: undefined,
			modalError: undefined
		});

	case types.SHIPMENT_REQUEST_FAILED:
		return Object.assign({}, state, {
			error: action.error
		});

	case types.MODAL_SUBMIT_ERROR:
		return Object.assign({}, state, {
			modalError: action.error
		});
	case types.LOGIN_SUCCESS:
		return Object.assign({}, state, {
			userProfile: action.userProfile
		});
	case types.LOGIN_FAILURE:
		return Object.assign({}, state, {
			userProfile: undefined,
			error: action.error
		});
	case types.PUT_USERS_IN_STORE:
		return Object.assign({}, state, {
			users: action.users
		});
	case types.CREATE_NEW_NEXT:
		return Object.assign({}, state, {
			createNewShipmentActivePage: state.createNewShipmentActivePage + 1
		});
	case types.CREATE_NEW_BACK:
		return Object.assign({}, state, {
			createNewShipmentActivePage: state.createNewShipmentActivePage - 1
		});
	case types.RESET_CREATE_NEW:
		return Object.assign({}, state, {
			createNewShipmentActivePage: 0
		});
	case types.UPDATE_SHIPMENT_ORDER: {
		//console.log("mak", action.shipmentObject);
		// let newShipmentOrder = state.newShipmentOrderObject;
		let newShipmentOrder = Object.assign({}, state.newShipmentOrderObject, {
			...action.shipmentObject
		});
		return Object.assign({}, state, {
			newShipmentOrderObject: newShipmentOrder
		});
	}
	default:
		return state;
	}
}

const rootReducer = reducer; //combineReducers({});

export default rootReducer;
