sap.ui.define([
			"es4products/controller/BaseController",
			"sap/ui/model/json/JSONModel",
			"es4products/model/formatter"
		], function(BaseController, JSONModel, formatter) {
			"use strict";

			return BaseController.extend("es4products.controller.Tile", {

					sURI: jQuery.sap.getModulePath("es4products") + "/sap/opu/odata/sap/ZTG_TEST_SRV",
					oModel: null,
					counter: 0,
					employeeArray: null,
					
					formatter: formatter,

					onAfterRendering: function() {
						debugger;
						var view = this.getView();
						var oViewData = view.getViewData();
						var genericTile = view.byId(view.createId("genericTile"));
						if (oViewData !== undefined && oViewData.properties !== undefined) {
							var titleTextVar = oViewData.properties && oViewData.properties.titleText;
							genericTile.setHeader(titleTextVar);
						} else {
							genericTile.setHeader("Get to know your colleagues…");
						}
						this.oModel = new sap.ui.model.odata.ODataModel(this.sURI, true);
						var parameters = {};
						parameters.async = true;
						var that = this;
						parameters.error = function() {};
						parameters.success = function(oData, response) {
							if (response.statusCode === 200) {
								var controller = that;
								//var view = controller.getView();
								controller.employeeArray = oData.results;
								//var genericTile = view.byId(view.createId("genericTile"));
								var jsonModel = new sap.ui.model.json.JSONModel();
								jsonModel.setData({
									modelData: oData.results
								});
								view.setModel(jsonModel);
								var empArr = controller.employeeArray;
								var internalCounter = controller.counter + 1;
								genericTile.bindElement("/modelData/0");
								setInterval(function() {
										if (internalCounter === empArr.length) {
											internalCounter = 0;
										}
										genericTile.bindElement("/modelData/" + internalCounter);
										internalCounter += 1;
									},
									5000);
							}
						};
						//this.oModel.read("/Employees", parameters);
						this.oModel.read("/ProductSet", parameters);
					},
					
					onPress: function() {
						var oStaticTileView = this.getView(),
							oViewData = oStaticTileView.getViewData(),
							navTargetUrl = oViewData.properties && oViewData.properties.navigation_target_url;
						if (navTargetUrl) {
							if (navTargetUrl[0] === '#') {
								hasher.setHash(navTargetUrl);
							} else {
								window.open(navTargetUrl, '_blank');
							}
						}
					}

				});
			}
		);