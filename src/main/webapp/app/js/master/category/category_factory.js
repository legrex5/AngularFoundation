'use strict';

/**
 * Factory for Category
 */
masterModule.factory('Category', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage category
    var entityURL = restURLMaster + '/category';
	
	/**
     * Validate category
     * @param category category
     * @throws validation exception
     */
	var validate = function (category) {
		var errors = [];
        if( category.categorycode == null || category.categorycode == '' ) {
			errors.push('master.category.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all categorys as list items
         * @return all categorys as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/category');
    	},

        /**
         * Get all categorys
         * @return all categorys
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get category
         * @param categoryid categoryid
         * @return category
         */
    	get: function(categoryid) {
    	    var url = entityURL + '/' + categoryid;
        	return $http.get(url);
    	},

        /**
         * Create a new category
         * @param category category
         * @return category saved
         */
		create: function(category) {
			validate(category)
			var url = entityURL;
			return $http.post(url, category);
    	},

        /**
         * Update category
         * @param category category
         * @return category saved
         */
    	update: function(category) {
			validate(category);
			var url = entityURL + '/' + category.categoryid;
			return $http.put(url, category);
    	},

		/**
         * Delete category
         * @param categoryid categoryid
         */
    	delete: function(categoryid) {
        	var url = entityURL + '/' + categoryid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

