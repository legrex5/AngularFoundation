'use strict';

/**
 * Factory for Purchaseorder
 */
purchaseModule.factory('Purchaseorder', ['$http', 'restURLPurchase', function($http, restURLPurchase) {

	// REST Service URL to manage purchaseorder
    var entityURL = restURLPurchase + '/purchaseorder';
	
	/**
     * Validate purchaseorder
     * @param purchaseorder purchaseorder
     * @throws validation exception
     */
	var validate = function (purchaseorder) {
		var errors = [];
        if( purchaseorder.purchaseorderid == null || purchaseorder.purchaseorderid == '' ) {
			errors.push('purchaseorder.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all purchaseorders as list items
         * @return all purchaseorders as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLPurchase + '/items/purchaseorder');
    	},

        /**
         * Get all purchaseorders
         * @return all purchaseorders
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get purchaseorder
         * @param purchaseorderid purchaseorderid
         * @return purchaseorder
         */
    	get: function(purchaseorderid) {
    	    var url = entityURL + '/' + purchaseorderid;
        	return $http.get(url);
    	},

        /**
         * Create a new purchaseorder
         * @param purchaseorder purchaseorder
         * @return purchaseorder saved
         */
		create: function(purchaseorder) {
			validate(purchaseorder)
			var url = entityURL;
			return $http.post(url, purchaseorder);
    	},

        /**
         * Update purchaseorder
         * @param purchaseorder purchaseorder
         * @return purchaseorder saved
         */
    	update: function(purchaseorder) {
			validate(purchaseorder)
			var url = entityURL + '/' + purchaseorder.purchaseorderid;
			return $http.put(url, purchaseorder);
    	},

		/**
         * Delete purchaseorder
         * @param purchaseorderid purchaseorderid
         */
    	delete: function(purchaseorderid) {
        	var url = entityURL + '/' + purchaseorderid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

