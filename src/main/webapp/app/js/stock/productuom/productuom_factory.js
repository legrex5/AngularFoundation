'use strict';

/**
 * Factory for Productuom
 */
stockModule.factory('Productuom', ['$http', 'restURLStock', function($http, restURLStock) {

	// REST Service URL to manage productuom
    var entityURL = restURLStock + '/productuom';
	
	/**
     * Validate productuom
     * @param productuom productuom
     * @throws validation exception
     */
	var validate = function (productuom) {
		var errors = [];
        if( productuom.productuomid == null || productuom.productuomid == '' ) {
			errors.push('productuom.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all productuoms as list items
         * @return all productuoms as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLStock + '/items/productuom');
    	},

        /**
         * Get all productuoms
         * @return all productuoms
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get productuom
         * @param productuomid productuomid
         * @return productuom
         */
    	get: function(productuomid) {
    	    var url = entityURL + '/' + productuomid;
        	return $http.get(url);
    	},

        /**
         * Create a new productuom
         * @param productuom productuom
         * @return productuom saved
         */
		create: function(productuom) {
			validate(productuom)
			var url = entityURL;
			return $http.post(url, productuom);
    	},

        /**
         * Update productuom
         * @param productuom productuom
         * @return productuom saved
         */
    	update: function(productuom) {
			validate(productuom)
			var url = entityURL + '/' + productuom.productuomid;
			return $http.put(url, productuom);
    	},

		/**
         * Delete productuom
         * @param productuomid productuomid
         */
    	delete: function(productuomid) {
        	var url = entityURL + '/' + productuomid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

