'use strict';

/**
 * Factory for Supplierproduct
 */
purchaseModule.factory('Supplierproduct', ['$http', 'restURLPurchase', function($http, restURLPurchase) {

	// REST Service URL to manage supplierproduct
    var entityURL = restURLPurchase + '/supplierproduct';
	
	/**
     * Validate supplierproduct
     * @param supplierproduct supplierproduct
     * @throws validation exception
     */
	var validate = function (supplierproduct) {
		var errors = [];
        if( supplierproduct.supplierproductid == null || supplierproduct.supplierproductid == '' ) {
			errors.push('supplierproduct.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all supplierproducts as list items
         * @return all supplierproducts as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLPurchase + '/items/supplierproduct');
    	},

        /**
         * Get all supplierproducts
         * @return all supplierproducts
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get supplierproduct
         * @param supplierproductid supplierproductid
         * @return supplierproduct
         */
    	get: function(supplierproductid) {
    	    var url = entityURL + '/' + supplierproductid;
        	return $http.get(url);
    	},

        /**
         * Create a new supplierproduct
         * @param supplierproduct supplierproduct
         * @return supplierproduct saved
         */
		create: function(supplierproduct) {
			validate(supplierproduct)
			var url = entityURL;
			return $http.post(url, supplierproduct);
    	},

        /**
         * Update supplierproduct
         * @param supplierproduct supplierproduct
         * @return supplierproduct saved
         */
    	update: function(supplierproduct) {
			validate(supplierproduct)
			var url = entityURL + '/' + supplierproduct.supplierproductid;
			return $http.put(url, supplierproduct);
    	},

		/**
         * Delete supplierproduct
         * @param supplierproductid supplierproductid
         */
    	delete: function(supplierproductid) {
        	var url = entityURL + '/' + supplierproductid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

