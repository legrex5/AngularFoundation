'use strict';

/**
 * Factory for Accountbank
 */
salesModule.factory('SalesAccountbank', ['$http', 'restURLSales', function($http, restURLSales) {

	// REST Service URL to manage accountbank
    var entityURL = restURLSales + '/accountbank';
	
	/**
     * Validate accountbank
     * @param accountbank accountbank
     * @throws validation exception
     */
	var validate = function (accountbank) {
		var errors = [];
        if( accountbank.accountbankid == null || accountbank.accountbankid == '' ) {
			errors.push('accountbank.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all accountbanks as list items
         * @return all accountbanks as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLSales + '/items/accountbank');
    	},

        /**
         * Get all accountbanks
         * @return all accountbanks
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get accountbank
         * @param accountbankid accountbankid
         * @return accountbank
         */
    	get: function(accountbankid) {
    	    var url = entityURL + '/' + accountbankid;
        	return $http.get(url);
    	},

        /**
         * Create a new accountbank
         * @param accountbank accountbank
         * @return accountbank saved
         */
		create: function(accountbank) {
			validate(accountbank)
			var url = entityURL;
			return $http.post(url, accountbank);
    	},

        /**
         * Update accountbank
         * @param accountbank accountbank
         * @return accountbank saved
         */
    	update: function(accountbank) {
			validate(accountbank)
			var url = entityURL + '/' + accountbank.accountbankid;
			return $http.put(url, accountbank);
    	},

		/**
         * Delete accountbank
         * @param accountbankid accountbankid
         */
    	delete: function(accountbankid) {
        	var url = entityURL + '/' + accountbankid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

