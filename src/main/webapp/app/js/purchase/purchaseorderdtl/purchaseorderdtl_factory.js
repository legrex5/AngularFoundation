'use strict';

/**
 * Factory for Purchaseorderdtl
 */
purchaseModule.factory('Purchaseorderdtl', ['$http', 'restURLPurchase', function($http, restURLPurchase) {

	// REST Service URL to manage purchaseorderdtl
    var entityURL = restURLPurchase + '/purchaseorderdtl';
	
	/**
     * Validate purchaseorderdtl
     * @param purchaseorderdtl purchaseorderdtl
     * @throws validation exception
     */
	var validate = function (purchaseorderdtl) {
		var errors = [];
        if( purchaseorderdtl.purchaseorderdtlid == null || purchaseorderdtl.purchaseorderdtlid == '' ) {
			errors.push('purchaseorderdtl.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all purchaseorderdtls as list items
         * @return all purchaseorderdtls as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLPurchase + '/items/purchaseorderdtl');
    	},

        /**
         * Get all purchaseorderdtls
         * @return all purchaseorderdtls
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get purchaseorderdtl
         * @param purchaseorderdtlid purchaseorderdtlid
         * @return purchaseorderdtl
         */
    	get: function(purchaseorderdtlid) {
    	    var url = entityURL + '/' + purchaseorderdtlid;
        	return $http.get(url);
    	},

        /**
         * Create a new purchaseorderdtl
         * @param purchaseorderdtl purchaseorderdtl
         * @return purchaseorderdtl saved
         */
		create: function(purchaseorderdtl) {
			validate(purchaseorderdtl)
			var url = entityURL;
			return $http.post(url, purchaseorderdtl);
    	},

        /**
         * Update purchaseorderdtl
         * @param purchaseorderdtl purchaseorderdtl
         * @return purchaseorderdtl saved
         */
    	update: function(purchaseorderdtl) {
			validate(purchaseorderdtl)
			var url = entityURL + '/' + purchaseorderdtl.purchaseorderdtlid;
			return $http.put(url, purchaseorderdtl);
    	},

		/**
         * Delete purchaseorderdtl
         * @param purchaseorderdtlid purchaseorderdtlid
         */
    	delete: function(purchaseorderdtlid) {
        	var url = entityURL + '/' + purchaseorderdtlid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

