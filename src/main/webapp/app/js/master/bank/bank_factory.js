'use strict';

/**
 * Factory for Bank
 */
masterModule.factory('Bank', ['$http', 'restURLMaster', function($http, restURLMaster) {

	// REST Service URL to manage bank
    var entityURL = restURLMaster + '/bank';
	
	/**
     * Validate bank
     * @param bank bank
     * @throws validation exception
     */
	var validate = function (bank) {
		var errors = [];
        if( bank.bankname == null || bank.bankname == '' ) {
			errors.push('master.bank.ID.NOT.DEFINED');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all banks as list items
         * @return all banks as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURLMaster + '/items/bank');
    	},

        /**
         * Get all banks
         * @return all banks
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get bank
         * @param bankid bankid
         * @return bank
         */
    	get: function(bankid) {
    	    var url = entityURL + '/' + bankid;
        	return $http.get(url);
    	},

        /**
         * Create a new bank
         * @param bank bank
         * @return bank saved
         */
		create: function(bank) {
			validate(bank)
			var url = entityURL;
			return $http.post(url, bank);
    	},

        /**
         * Update bank
         * @param bank bank
         * @return bank saved
         */
    	update: function(bank) {
			validate(bank)
			var url = entityURL + '/' + bank.bankid;
			return $http.put(url, bank);
    	},

		/**
         * Delete bank
         * @param bankid bankid
         */
    	delete: function(bankid) {
        	var url = entityURL + '/' + bankid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

masterModule.service('ngTableDataServiceBank', ['$resource', '$filter','restURLMaster', function ($resource, $filter,restURLMaster) {

    var tableData = {
        cache: null,
        getListBank: function ($defer, params, kodeDokter, shift) {
            var api = $resource(restURLMaster + '/bank', {}, {
                queryPage: {method: 'GET', isArray: false}
            });
            if(! tableData.cache){
            	if(api){
            		api.get(function (data) {
                        tableData.cache = data;
                        filterdata($defer, params);
                    });
            	}
            }else{
            	filterdata($defer, params);
            }


            function filterdata($defer, params) {
                var from = (params.page() - 1) * params.count();
                var to = params.page() * params.count();
                var filteredData = params.filter() ? $filter('filter')(tableData.cache.result, params.filter()) : tableData.cache.result;
                var resultData = filteredData.slice(from, to);

                params.total(tableData.cache.total);
                $defer.resolve(resultData);
            }
        }
    };
    return tableData;
}])

