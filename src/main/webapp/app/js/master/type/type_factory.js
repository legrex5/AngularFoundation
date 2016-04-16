'use strict';

/**
 * Factory for Type
 */
masterModule.factory('Type', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage type
    var entityURL = restURLMaster + '/type';
	
	/**
     * Validate type
     * @param type type
     * @throws validation exception
     */
	var validate = function (type) {
		var errors = [];
        if( type.typecode == null || type.typecode == '' ) {
			errors.push('master.type.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all types as list items
         * @return all types as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/type');
    	},

        /**
         * Get all types
         * @return all types
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get type
         * @param typeid typeid
         * @return type
         */
    	get: function(typeid) {
    	    var url = entityURL + '/' + typeid;
        	return $http.get(url);
    	},

        /**
         * Create a new type
         * @param type type
         * @return type saved
         */
		create: function(type) {
			validate(type)
			var url = entityURL;
			return $http.post(url, type);
    	},

        /**
         * Update type
         * @param type type
         * @return type saved
         */
    	update: function(type) {
			validate(type)
			var url = entityURL + '/' + type.typeid;
			return $http.put(url, type);
    	},

		/**
         * Delete type
         * @param typeid typeid
         */
    	delete: function(typeid) {
        	var url = entityURL + '/' + typeid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

