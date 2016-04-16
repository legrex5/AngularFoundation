'use strict';

/**
 * Factory for Paymentform
 */
masterModule.factory('Paymentform', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage paymentform
    var entityURL = restURLMaster + '/paymentform';
	
	/**
     * Validate paymentform
     * @param paymentform paymentform
     * @throws validation exception
     */
	var validate = function (paymentform) {
		var errors = [];
        if( paymentform.paymentformcode == null || paymentform.paymentformcode == '' ) {
			errors.push('master.paymentform.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all paymentforms as list items
         * @return all paymentforms as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/paymentform');
    	},

        /**
         * Get all paymentforms
         * @return all paymentforms
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get paymentform
         * @param paymentformid paymentformid
         * @return paymentform
         */
    	get: function(paymentformid) {
    	    var url = entityURL + '/' + paymentformid;
        	return $http.get(url);
    	},

        /**
         * Create a new paymentform
         * @param paymentform paymentform
         * @return paymentform saved
         */
		create: function(paymentform) {
			validate(paymentform)
			var url = entityURL;
			return $http.post(url, paymentform);
    	},

        /**
         * Update paymentform
         * @param paymentform paymentform
         * @return paymentform saved
         */
    	update: function(paymentform) {
			validate(paymentform)
			var url = entityURL + '/' + paymentform.paymentformid;
			return $http.put(url, paymentform);
    	},

		/**
         * Delete paymentform
         * @param paymentformid paymentformid
         */
    	delete: function(paymentformid) {
        	var url = entityURL + '/' + paymentformid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

