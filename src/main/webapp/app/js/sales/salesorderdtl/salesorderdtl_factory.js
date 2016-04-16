'use strict';

/**
 * Factory for Salesorderdtl
 */
salesModule.factory('Salesorderdtl', ['$http', 'restURLSales', function($http, restURLSales) {

	// REST Service URL to manage salesorderdtl
    var entityURL = restURLSales + '/salesorderdtl';
	
	/**
     * Validate salesorderdtl
     * @param salesorderdtl salesorderdtl
     * @throws validation exception
     */
	var validate = function (salesorderdtl) {
		var errors = [];
        if( salesorderdtl.salesorderdtlid == null || salesorderdtl.salesorderdtlid == '' ) {
			errors.push('salesorderdtl.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all salesorderdtls as list items
         * @return all salesorderdtls as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLSales + '/items/salesorderdtl');
    	},

        /**
         * Get all salesorderdtls
         * @return all salesorderdtls
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get salesorderdtl
         * @param salesorderdtlid salesorderdtlid
         * @return salesorderdtl
         */
    	get: function(salesorderdtlid) {
    	    var url = entityURL + '/' + salesorderdtlid;
        	return $http.get(url);
    	},

        /**
         * Create a new salesorderdtl
         * @param salesorderdtl salesorderdtl
         * @return salesorderdtl saved
         */
		create: function(salesorderdtl) {
			validate(salesorderdtl)
			var url = entityURL;
			return $http.post(url, salesorderdtl);
    	},

        /**
         * Update salesorderdtl
         * @param salesorderdtl salesorderdtl
         * @return salesorderdtl saved
         */
    	update: function(salesorderdtl) {
			validate(salesorderdtl)
			var url = entityURL + '/' + salesorderdtl.salesorderdtlid;
			return $http.put(url, salesorderdtl);
    	},

		/**
         * Delete salesorderdtl
         * @param salesorderdtlid salesorderdtlid
         */
    	delete: function(salesorderdtlid) {
        	var url = entityURL + '/' + salesorderdtlid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

