sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("Hotel.hotelassignment.controller.View1", {
			onInit: function () {

			},
			onBack: function () {
                 
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                 oRouter.navTo("RouteView1");


			},
			billPopup: null,
 
			 onBill: function() {
				 debugger;
  
				 var tObject = this.getView().byId("tabId").getSelectedContexts("model2");
				 var arr = [];
				 // var arr2 = [];
  
				 var total = 0;
				 for (var i = 0; i < tObject.length; i++) {
					 arr.push(tObject[i].getObject());
					 total += Number(tObject[i].getObject().price);
  
					 if (arr.length == tObject.length) {
						 arr.push({
							 item: "Total",
							 price: total
						 })
					 }
 
				 }
  
				 var model3 = new sap.ui.model.json.JSONModel({ tableItem: arr });
				 this.getOwnerComponent().setModel(model3, "model3")
 
				 if (!this.billPopup) {
 
					 this.billPopup = new sap.ui.xmlfragment("Hotel.hotelassignment.fragments.popup", this);
  
					 this.getView().addDependent(this.billPopup);
				 }
				 this.billPopup.open();
  
			 },
			 onClose:function()
			 {
				 this.billPopup.close();
			 },
			 DetailsPopup: null,
 
			 onRequest: function(oEvent) {
				 debugger;
  
				 var tObject = oEvent.getSource().getBindingContext("model2");
  
				 var arr = [];
  
				 arr.push(tObject.getObject());
 
 
  
				 var model3 = new sap.ui.model.json.JSONModel({ tableItem: arr });
				 this.getOwnerComponent().setModel(model3, "model3")
  
				 if (!this.DetailsPopup) {
  
					 this.DetailsPopup = new sap.ui.xmlfragment("Shopping.shoppingcartapp.fragments2.Details", this);
  
					 this.getView().addDependent(this.DetailsPopup);
  
				 }
				 this.DetailsPopup.open();
  
			 },
			 onClose: function() {
  
				 this.DetailsPopup.close();
			 },
		});
	});
