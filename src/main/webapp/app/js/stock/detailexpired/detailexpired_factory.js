'use strict';

/**
 * Factory for Detailexpired
 */
restURLStock.factory('Detailexpired', ['$http', 'restURLStock', function($http, restURLStock) {

	// REST Service URL to manage detailexpired
    var entityURL = restURLStock + '/detailexpired';
	
	/**
     * Validate detailexpired
     * @param detailexpired detailexpired
     * @throws validation exception
     */
	var validate = function (detailexpired) {
		var errors = [];
        if( detailexpired.detailexpiredid == null || detailexpired.detailexpiredid == '' ) {
			errors.push('detailexpired.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all detailexpireds as list items
         * @return all detailexpireds as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLStock + '/items/detailexpired');
    	},

        /**
         * Get all detailexpireds
         * @return all detailexpireds
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get detailexpired
         * @param detailexpiredid detailexpiredid
         * @return detailexpired
         */
    	get: function(detailexpiredid) {
    	    var url = entityURL + '/' + detailexpiredid;
        	return $http.get(url);
    	},

        /**
         * Create a new detailexpired
         * @param detailexpired detailexpired
         * @return detailexpired saved
         */
		create: function(detailexpired) {
			validate(detailexpired)
			var url = entityURL;
			return $http.post(url, detailexpired);
    	},

        /**
         * Update detailexpired
         * @param detailexpired detailexpired
         * @return detailexpired saved
         */
    	update: function(detailexpired) {
			validate(detailexpired)
			var url = entityURL + '/' + detailexpired.detailexpiredid;
			return $http.put(url, detailexpired);
    	},

		/**
         * Delete detailexpired
         * @param detailexpiredid detailexpiredid
         */
    	delete: function(detailexpiredid) {
        	var url = entityURL + '/' + detailexpiredid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

