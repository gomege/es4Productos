sap.ui.define([
	], function () {
		"use strict";

		return {
			/**
			 * Rounds the currency value to 2 digits
			 *
			 * @public
			 * @param {string} sValue value to be formatted
			 * @returns {string} formatted currency value with 2 digits
			 */
			priceValue : function (price, currency) {
				if (!price || !currency) {
					return "N/A";
				}

				return parseFloat(price).toFixed(2) + " "+ currency;
			},
			
			currencyValue : function (price) {
				if (!price) {
					return "N/A";
				}

				return parseFloat(price).toFixed(2);
			},
			
		
			
			
			pictureURLFormatter: function(ProductPicUrl) {
			    var sServerURL = "https://sapes4.sapdevcenter.com";
			    if(ProductPicUrl === null || ProductPicUrl === undefined ||                    
		                            ProductPicUrl.trim() === ""){
			        ProductPicUrl = "/SAP/PUBLIC/BC/NWDEMO_MODEL/IMAGES/HT-1002.jpg";
			    }
		        return sServerURL + ProductPicUrl;
		    }
		};

	}
);