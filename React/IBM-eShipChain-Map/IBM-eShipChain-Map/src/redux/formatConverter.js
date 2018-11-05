const formatForBackEnd = uiShipmentOrderObject => {
	return {
		shippingOrderID: "",
		doctype: "shippingOrder",
		shippingOrderOwner_UserID: 98765,
		purposeOfShipment: "mak testing",
		description: "Biohazard - you've been warned",
		material: {
			materialName: "",
			materialClassification: "Biological Substance",
			eccn: "",
			scheduleB: "",
			exportCode: "",
			innerQuantity: 0,
			innerQuatityUOM: "",
			outerQuantity: 0,
			outerQuantityUOM: "",
			grossWeight: 0,
			grossWeightUOM: "",
			isInnaccessible: false,
			isDangareousGood: false,
			netValue: ""
		},
		shipper_username: "jack@esg",
		receiver_username: "jerry@esg",
		cosigner_UserID: 20001,
		broker_UserID: "harry@esg",
		brokerApprovals: {
			isBrokerCleared: false,
			brokerComments: ""
		},
		receiving_Country:
			uiShipmentOrderObject.shippingClassification.receivingCountry,
		license: [
			{
				licenseNumber:
					uiShipmentOrderObject.additionalMaterial
						.internationalShipmentInformation.license,
				licenseType:
					uiShipmentOrderObject.additionalMaterial
						.internationalShipmentInformation.licenseType,
				licenseExpDt:
					uiShipmentOrderObject.additionalMaterial
						.internationalShipmentInformation.licenseExpiryDate
			}
		],
		recipientInformation: {
			name: "",
			address: ""
		},
		packageInformation: {
			packageType: "Box",
			packageWeightInUSPounds: 1,
			packageWidthInInches: 12,
			packageLengthInInches: 12,
			packageHeight: 12
		},
		carrierInformation: {
			carrierID: 0,
			carrierName: "UPS",
			carrierVariant: "Worldwide Express Plus",
			estimatedShippingCharges: 0,
			estimatedDeliveryDate: "",
			isReturnShipment: false,
			isSignatureRequired: false,
			isResidentDelivery: false,
			isSaturdayDelivery: false,
			isHoldAtLocation: false,
			billingAccountNumber: "",
			billingZipCode: ""
		},
		universityApprovals: {
			isEhsApproved: true,
			ehsComments: "",
			isEcoApproved: false,
			ecoComments: ""
		},
		pickupScheduled: {
			startPickup: "",
			endPickup: "",
			pickUpLogitude: "",
			pickUpLatitude: "",
			pickUpInstructions: "",
			carrierConfirmation: ""
		},
		status: "Pending Schedule",
		documents: [
			{
				documentName: "doc1-Name",
				documentLink: "/document/101087049-fedexdeclbio.pdf",
				documentDesc: "doc1 description",
				documentHash: "54321"
			},
			{
				documentName: "doc2-Name",
				documentLink: "/document/address-label.pdf",
				documentDesc: "doc2 description",
				documentHash: "12345"
			}
		],
		shipmentType: {
			isDangerousGoods: false,
			isChemicalPreservative: false,
			isOverpack: false,
			isInaccessible: false,
			isDryIce: false,
			dryIceWeight: 0,
			dryIceWeightUOM: "",
			declaredValue: ""
		},
		intShipmentInfo: {
			termOfSale: "",
			exportIntentDescription: ""
		},
		receiverFeedback: {
			isDeliveryConfirmed: false,
			deliveryTimestamp: "",
			carrierRating: 0,
			carrierFeedback: ""
		}
	};
};

export default {
	formatForBackEnd
};
