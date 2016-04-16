'use strict';

/**
 * Factory for Uom
 */
masterModule.factory('Uom', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage uom
    var entityURL = restURLMaster + '/uom';
	
	/**
     * Validate uom
     * @param uom uom
     * @throws validation exception
     */
	var validate = function (uom) {
		var errors = [];
        if( uom.uomcode == null || uom.uomcode == '' ) {
			errors.push('master.uom.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all uoms as list items
         * @return all uoms as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/uom');
    	},

        /**
         * Get all uoms
         * @return all uoms
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get uom
         * @param uomid uomid
         * @return uom
         */
    	get: function(uomid) {
    	    var url = entityURL + '/' + uomid;
        	return $http.get(url);
    	},

        /**
         * Create a new uom
         * @param uom uom
         * @return uom saved
         */
		create: function(uom) {
			validate(uom)
			var url = entityURL;
			return $http.post(url, uom);
    	},

        /**
         * Update uom
         * @param uom uom
         * @return uom saved
         */
    	update: function(uom) {
			validate(uom)
			var url = entityURL + '/' + uom.uomid;
			return $http.put(url, uom);
    	},

		/**
         * Delete uom
         * @param uomid uomid
         */
    	delete: function(uomid) {
        	var url = entityURL + '/' + uomid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

