'use strict';

/**
 * Factory for Location
 */
masterModule.factory('Location', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage location
    var entityURL = restURLMaster + '/location';
	
	/**
     * Validate location
     * @param location location
     * @throws validation exception
     */
	var validate = function (location) {
		var errors = [];
        if( location.locationcode == null || location.locationcode == '' ) {
			errors.push('master.location.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all locations as list items
         * @return all locations as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/location');
    	},

        /**
         * Get all locations
         * @return all locations
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get location
         * @param locationid locationid
         * @return location
         */
    	get: function(locationid) {
    	    var url = entityURL + '/' + locationid;
        	return $http.get(url);
    	},

        /**
         * Create a new location
         * @param location location
         * @return location saved
         */
		create: function(location) {
			validate(location)
			var url = entityURL;
			return $http.post(url, location);
    	},

        /**
         * Update location
         * @param location location
         * @return location saved
         */
    	update: function(location) {
			validate(location)
			var url = entityURL + '/' + location.locationid;
			return $http.put(url, location);
    	},

		/**
         * Delete location
         * @param locationid locationid
         */
    	delete: function(locationid) {
        	var url = entityURL + '/' + locationid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

