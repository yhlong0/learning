import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import dropDownValues from "./DropDownValues";
import Countries from "./Countries";

const renderMenuItems = type => {
	return dropDownValues[type].map(unit => (
		<MenuItem value={unit}>{unit}</MenuItem>
	));
};

const renderCountryMenuItems = () => {
	return Object.keys(Countries).map(key => (
		<MenuItem key={key} value={Countries[key]}>
			{Countries[key]}
		</MenuItem>
	));
};

const renderCarrierItems = () => {
	return dropDownValues.carrierQuotes.map(item => (
		<MenuItem value={item}>
			{item.carrierName} - {item.carrierVariant} - ${Number.parseFloat(item.estimatedShippingCharges).toFixed(2)}
		</MenuItem>
	));
};

const renderUserMenuItems = (users, role) => {
	let filteredUsers = getFilteredUsers(users, role);
	return filteredUsers.map(user => {
		return (
			<MenuItem key={user._id} value={user}>
				{user.firstName} {user.lastName}
			</MenuItem>
		);
	});
};

const getFilteredUsers = (users, role) => {
	if (role === "all") {
		return users;
	}
	return users.filter(item => item.role === role);
};

export default {
	renderMenuItems,
	renderCountryMenuItems,
	renderUserMenuItems,
	renderCarrierItems,
	getFilteredUsers
};
