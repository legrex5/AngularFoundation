'use strict';

/**
 * Factory for Salesordercorrection
 */
salesModule.factory('Salesordercorrection', ['$http', 'restURLSales', function($http, restURLSales) {

	// REST Service URL to manage salesordercorrection
    var entityURL = restURLSales + '/salesordercorrection';
	
	/**
     * Validate salesordercorrection
     * @param salesordercorrection salesordercorrection
     * @throws validation exception
     */
	var validate = function (salesordercorrection) {
		var errors = [];
        if( salesordercorrection.salesordercorrectionid == null || salesordercorrection.salesordercorrectionid == '' ) {
			errors.push('salesordercorrection.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all salesordercorrections as list items
         * @return all salesordercorrections as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLSales + '/items/salesordercorrection');
    	},

        /**
         * Get all salesordercorrections
         * @return all salesordercorrections
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get salesordercorrection
         * @param salesordercorrectionid salesordercorrectionid
         * @return salesordercorrection
         */
    	get: function(salesordercorrectionid) {
    	    var url = entityURL + '/' + salesordercorrectionid;
        	return $http.get(url);
    	},

        /**
         * Create a new salesordercorrection
         * @param salesordercorrection salesordercorrection
         * @return salesordercorrection saved
         */
		create: function(salesordercorrection) {
			validate(salesordercorrection)
			var url = entityURL;
			return $http.post(url, salesordercorrection);
    	},

        /**
         * Update salesordercorrection
         * @param salesordercorrection salesordercorrection
         * @return salesordercorrection saved
         */
    	update: function(salesordercorrection) {
			validate(salesordercorrection)
			var url = entityURL + '/' + salesordercorrection.salesordercorrectionid;
			return $http.put(url, salesordercorrection);
    	},

		/**
         * Delete salesordercorrection
         * @param salesordercorrectionid salesordercorrectionid
         */
    	delete: function(salesordercorrectionid) {
        	var url = entityURL + '/' + salesordercorrectionid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

