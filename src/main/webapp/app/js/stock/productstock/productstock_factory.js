'use strict';

/**
 * Factory for Productstock
 */
stockModule.factory('Productstock', ['$http', 'restURLStock', function($http, restURLStock) {

	// REST Service URL to manage productstock
    var entityURL = restURLStock + '/productstock';
	
	/**
     * Validate productstock
     * @param productstock productstock
     * @throws validation exception
     */
	var validate = function (productstock) {
		var errors = [];
        if( productstock.productstockid == null || productstock.productstockid == '' ) {
			errors.push('productstock.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all productstocks as list items
         * @return all productstocks as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLStock + '/items/productstock');
    	},

        /**
         * Get all productstocks
         * @return all productstocks
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get productstock
         * @param productstockid productstockid
         * @return productstock
         */
    	get: function(productstockid) {
    	    var url = entityURL + '/' + productstockid;
        	return $http.get(url);
    	},

        /**
         * Create a new productstock
         * @param productstock productstock
         * @return productstock saved
         */
		create: function(productstock) {
			validate(productstock)
			var url = entityURL;
			return $http.post(url, productstock);
    	},

        /**
         * Update productstock
         * @param productstock productstock
         * @return productstock saved
         */
    	update: function(productstock) {
			validate(productstock)
			var url = entityURL + '/' + productstock.productstockid;
			return $http.put(url, productstock);
    	},

		/**
         * Delete productstock
         * @param productstockid productstockid
         */
    	delete: function(productstockid) {
        	var url = entityURL + '/' + productstockid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

