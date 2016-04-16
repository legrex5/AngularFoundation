'use strict';

/**
 * Factory for Product
 */
masterModule.factory('Product', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage product
    var entityURL = restURLMaster + '/product';
	
	/**
     * Validate product
     * @param product product
     * @throws validation exception
     */
	var validate = function (product) {
		var errors = [];
        if( product.productcode == null || product.productcode == '' ) {
			errors.push('master.product.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all products as list items
         * @return all products as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/product');
    	},

        /**
         * Get all products
         * @return all products
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get product
         * @param productid productid
         * @return product
         */
    	get: function(productid) {
    	    var url = entityURL + '/' + productid;
        	return $http.get(url);
    	},

        /**
         * Create a new product
         * @param product product
         * @return product saved
         */
		create: function(product) {
			validate(product)
			var url = entityURL;
			return $http.post(url, product);
    	},

        /**
         * Update product
         * @param product product
         * @return product saved
         */
    	update: function(product) {
			validate(product)
			var url = entityURL + '/' + product.productid;
			return $http.put(url, product);
    	},

		/**
         * Delete product
         * @param productid productid
         */
    	delete: function(productid) {
        	var url = entityURL + '/' + productid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

