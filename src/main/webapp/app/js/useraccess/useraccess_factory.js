'use strict';

/**
 * Factory for Useraccess
 */
useraccessModule.factory('Useraccess', ['$http', 'restURLUserAccess', function($http, restURLUserAccess) {

	// REST Service URL to manage useraccess
    var entityURL = restURLUserAccess + '/useraccess';
	
	/**
     * Validate useraccess
     * @param useraccess useraccess
     * @throws validation exception
     */
	var validate = function (useraccess) {
		var errors = [];
        if( useraccess.usercode == null || useraccess.usercode == '' ) {
			errors.push('useraccess.CODENOTDEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all useraccesss as list items
         * @return all useraccesss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLUserAccess + '/items/useraccess');
    	},

        /**
         * Get all useraccesss
         * @return all useraccesss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get useraccess
         * @param userid userid
         * @return useraccess
         */
    	get: function(userid) {
    	    var url = entityURL + '/' + userid;
        	return $http.get(url);
    	},

        /**
         * Create a new useraccess
         * @param useraccess useraccess
         * @return useraccess saved
         */
		create: function(useraccess) {
			validate(useraccess)
			var url = entityURL;
			return $http.post(url, useraccess);
    	},

        /**
         * Update useraccess
         * @param useraccess useraccess
         * @return useraccess saved
         */
    	update: function(useraccess) {
			validate(useraccess)
			var url = entityURL + '/' + useraccess.userid;
			return $http.put(url, useraccess);
    	},

		/**
         * Delete useraccess
         * @param userid userid
         */
    	delete: function(userid) {
        	var url = entityURL + '/' + userid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

