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
			onNext: function () {
                 
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                 oRouter.navTo("RouteView2");
			},
			onSelectItems: function(oEvent) {
				 debugger;
				 var oListItem = oEvent.getParameter("listItem");
 
				 // this.getView().byId("oView").setText(oListItem.mProperties.title);
				 var arrData = this.getView().getModel().getProperty("/items");
				 var selectedItem = oListItem.mProperties.title;
				 var item = arrData.filter(element => {
 
						 if (element.name == selectedItem) {
							 return element;
						 }
 
					 })
				 var model = new sap.ui.model.json.JSONModel({ selectedItem: item });
				 this.getOwnerComponent().setModel(model, "model2")
			 },
			 onSearch: function(oEvent) {
				 var searchStr = oEvent.getParameter("query");
 
				 if (!searchStr) {
					 searchStr = oEvent.getParameter("newValue");
				 }
				 var oFilterName = new sap.ui.model.Filter(
					 "name",
					 sap.ui.model.FilterOperator.Contains,
					 searchStr);
 
				 var oFilterTyp = new sap.ui.model.Filter(
					 "nature",
					 sap.ui.model.FilterOperator.Contains,
					 searchStr);
 
				 var oFilter = new sap.ui.model.Filter({
 
					 filters: [oFilterName, oFilterTyp],
					 and: false
				 });
 
 
				 var aFilter = [oFilter];
				 var oList = this.getView().byId("idFroustList");
				 oList.getBinding("items").filter(aFilter);
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
			 }
		});
	});
