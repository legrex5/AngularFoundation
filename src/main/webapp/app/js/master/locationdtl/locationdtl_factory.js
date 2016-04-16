'use strict';

/**
 * Factory for Locationdtl
 */
masterModule.factory('Locationdtl', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage locationdtl
    var entityURL = restURLMaster + '/locationdtl';
	
	/**
     * Validate locationdtl
     * @param locationdtl locationdtl
     * @throws validation exception
     */
	var validate = function (locationdtl) {
		var errors = [];
        if( locationdtl.locationdtlid == null || locationdtl.locationdtlid == '' ) {
			errors.push('master.locationdtl.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all locationdtls as list items
         * @return all locationdtls as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/locationdtl');
    	},

        /**
         * Get all locationdtls
         * @return all locationdtls
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get locationdtl
         * @param locationdtlid locationdtlid
         * @return locationdtl
         */
    	get: function(locationdtlid) {
    	    var url = entityURL + '/' + locationdtlid;
        	return $http.get(url);
    	},

        /**
         * Create a new locationdtl
         * @param locationdtl locationdtl
         * @return locationdtl saved
         */
		create: function(locationdtl) {
			validate(locationdtl)
			var url = entityURL;
			return $http.post(url, locationdtl);
    	},

        /**
         * Update locationdtl
         * @param locationdtl locationdtl
         * @return locationdtl saved
         */
    	update: function(locationdtl) {
			validate(locationdtl)
			var url = entityURL + '/' + locationdtl.locationdtlid;
			return $http.put(url, locationdtl);
    	},

		/**
         * Delete locationdtl
         * @param locationdtlid locationdtlid
         */
    	delete: function(locationdtlid) {
        	var url = entityURL + '/' + locationdtlid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

