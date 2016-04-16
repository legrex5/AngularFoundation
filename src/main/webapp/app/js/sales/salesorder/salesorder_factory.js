'use strict';

/**
 * Factory for Salesorder
 */
salesModule.factory('Salesorder', ['$http', 'restURLSales', function($http, restURLSales) {

	// REST Service URL to manage salesorder
    var entityURL = restURLSales + '/salesorder';
	
	/**
     * Validate salesorder
     * @param salesorder salesorder
     * @throws validation exception
     */
	var validate = function (salesorder) {
		var errors = [];
        if( salesorder.salesorderid == null || salesorder.salesorderid == '' ) {
			errors.push('salesorder.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all salesorders as list items
         * @return all salesorders as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLSales + '/items/salesorder');
    	},

        /**
         * Get all salesorders
         * @return all salesorders
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get salesorder
         * @param salesorderid salesorderid
         * @return salesorder
         */
    	get: function(salesorderid) {
    	    var url = entityURL + '/' + salesorderid;
        	return $http.get(url);
    	},

        /**
         * Create a new salesorder
         * @param salesorder salesorder
         * @return salesorder saved
         */
		create: function(salesorder) {
			validate(salesorder)
			var url = entityURL;
			return $http.post(url, salesorder);
    	},

        /**
         * Update salesorder
         * @param salesorder salesorder
         * @return salesorder saved
         */
    	update: function(salesorder) {
			validate(salesorder)
			var url = entityURL + '/' + salesorder.salesorderid;
			return $http.put(url, salesorder);
    	},

		/**
         * Delete salesorder
         * @param salesorderid salesorderid
         */
    	delete: function(salesorderid) {
        	var url = entityURL + '/' + salesorderid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

