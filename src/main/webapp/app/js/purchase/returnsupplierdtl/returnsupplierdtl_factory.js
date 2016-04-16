'use strict';

/**
 * Factory for Returnsupplierdtl
 */
purchaseModule.factory('Returnsupplierdtl', ['$http', 'restURLPurchase', function($http, restURLPurchase) {

	// REST Service URL to manage returnsupplierdtl
    var entityURL = restURLPurchase + '/returnsupplierdtl';
	
	/**
     * Validate returnsupplierdtl
     * @param returnsupplierdtl returnsupplierdtl
     * @throws validation exception
     */
	var validate = function (returnsupplierdtl) {
		var errors = [];
        if( returnsupplierdtl.returndtlid == null || returnsupplierdtl.returndtlid == '' ) {
			errors.push('returnsupplierdtl.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all returnsupplierdtls as list items
         * @return all returnsupplierdtls as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLPurchase + '/items/returnsupplierdtl');
    	},

        /**
         * Get all returnsupplierdtls
         * @return all returnsupplierdtls
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get returnsupplierdtl
         * @param returndtlid returndtlid
         * @return returnsupplierdtl
         */
    	get: function(returndtlid) {
    	    var url = entityURL + '/' + returndtlid;
        	return $http.get(url);
    	},

        /**
         * Create a new returnsupplierdtl
         * @param returnsupplierdtl returnsupplierdtl
         * @return returnsupplierdtl saved
         */
		create: function(returnsupplierdtl) {
			validate(returnsupplierdtl)
			var url = entityURL;
			return $http.post(url, returnsupplierdtl);
    	},

        /**
         * Update returnsupplierdtl
         * @param returnsupplierdtl returnsupplierdtl
         * @return returnsupplierdtl saved
         */
    	update: function(returnsupplierdtl) {
			validate(returnsupplierdtl)
			var url = entityURL + '/' + returnsupplierdtl.returndtlid;
			return $http.put(url, returnsupplierdtl);
    	},

		/**
         * Delete returnsupplierdtl
         * @param returndtlid returndtlid
         */
    	delete: function(returndtlid) {
        	var url = entityURL + '/' + returndtlid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

