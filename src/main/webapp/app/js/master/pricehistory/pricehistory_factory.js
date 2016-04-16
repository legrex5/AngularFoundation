'use strict';

/**
 * Factory for Pricehistory
 */
masterModule.factory('Pricehistory', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage pricehistory
    var entityURL = restURLMaster + '/pricehistory';
	
	/**
     * Validate pricehistory
     * @param pricehistory pricehistory
     * @throws validation exception
     */
	var validate = function (pricehistory) {
		var errors = [];
        if( pricehistory.pricehistoryid == null || pricehistory.pricehistoryid == '' ) {
			errors.push('master.pricehistory.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all pricehistorys as list items
         * @return all pricehistorys as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/pricehistory');
    	},

        /**
         * Get all pricehistorys
         * @return all pricehistorys
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get pricehistory
         * @param pricehistoryid pricehistoryid
         * @return pricehistory
         */
    	get: function(pricehistoryid) {
    	    var url = entityURL + '/' + pricehistoryid;
        	return $http.get(url);
    	},

        /**
         * Create a new pricehistory
         * @param pricehistory pricehistory
         * @return pricehistory saved
         */
		create: function(pricehistory) {
			validate(pricehistory)
			var url = entityURL;
			return $http.post(url, pricehistory);
    	},

        /**
         * Update pricehistory
         * @param pricehistory pricehistory
         * @return pricehistory saved
         */
    	update: function(pricehistory) {
			validate(pricehistory)
			var url = entityURL + '/' + pricehistory.pricehistoryid;
			return $http.put(url, pricehistory);
    	},

		/**
         * Delete pricehistory
         * @param pricehistoryid pricehistoryid
         */
    	delete: function(pricehistoryid) {
        	var url = entityURL + '/' + pricehistoryid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

