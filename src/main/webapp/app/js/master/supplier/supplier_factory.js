'use strict';

/**
 * Factory for Supplier
 */
masterModule.factory('Supplier', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage supplier
    var entityURL = restURLMaster + '/supplier';
	
	/**
     * Validate supplier
     * @param supplier supplier
     * @throws validation exception
     */
	var validate = function (supplier) {
		var errors = [];
        if( supplier.suppliercode == null || supplier.suppliercode == '' ) {
			errors.push('master.supplier.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all suppliers as list items
         * @return all suppliers as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/supplier');
    	},

        /**
         * Get all suppliers
         * @return all suppliers
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get supplier
         * @param supplierid supplierid
         * @return supplier
         */
    	get: function(supplierid) {
    	    var url = entityURL + '/' + supplierid;
        	return $http.get(url);
    	},

        /**
         * Create a new supplier
         * @param supplier supplier
         * @return supplier saved
         */
		create: function(supplier) {
			validate(supplier)
			var url = entityURL;
			return $http.post(url, supplier);
    	},

        /**
         * Update supplier
         * @param supplier supplier
         * @return supplier saved
         */
    	update: function(supplier) {
			validate(supplier)
			var url = entityURL + '/' + supplier.supplierid;
			return $http.put(url, supplier);
    	},

		/**
         * Delete supplier
         * @param supplierid supplierid
         */
    	delete: function(supplierid) {
        	var url = entityURL + '/' + supplierid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

