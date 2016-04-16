'use strict';

/**
 * Factory for Returnsupplier
 */
purchaseModule.factory('Returnsupplier', ['$http', 'restURLPurchase', function($http, restURLPurchase) {

	// REST Service URL to manage returnsupplier
    var entityURL = restURLPurchase + '/returnsupplier';
	
	/**
     * Validate returnsupplier
     * @param returnsupplier returnsupplier
     * @throws validation exception
     */
	var validate = function (returnsupplier) {
		var errors = [];
        if( returnsupplier.returnsupplierid == null || returnsupplier.returnsupplierid == '' ) {
			errors.push('returnsupplier.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all returnsuppliers as list items
         * @return all returnsuppliers as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLPurchase + '/items/returnsupplier');
    	},

        /**
         * Get all returnsuppliers
         * @return all returnsuppliers
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get returnsupplier
         * @param returnsupplierid returnsupplierid
         * @return returnsupplier
         */
    	get: function(returnsupplierid) {
    	    var url = entityURL + '/' + returnsupplierid;
        	return $http.get(url);
    	},

        /**
         * Create a new returnsupplier
         * @param returnsupplier returnsupplier
         * @return returnsupplier saved
         */
		create: function(returnsupplier) {
			validate(returnsupplier)
			var url = entityURL;
			return $http.post(url, returnsupplier);
    	},

        /**
         * Update returnsupplier
         * @param returnsupplier returnsupplier
         * @return returnsupplier saved
         */
    	update: function(returnsupplier) {
			validate(returnsupplier)
			var url = entityURL + '/' + returnsupplier.returnsupplierid;
			return $http.put(url, returnsupplier);
    	},

		/**
         * Delete returnsupplier
         * @param returnsupplierid returnsupplierid
         */
    	delete: function(returnsupplierid) {
        	var url = entityURL + '/' + returnsupplierid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

