'use strict';

/**
 * Controller for Salesorder
 **/
salesModule.controller('SalesorderCtrl', ['Salesorder',  'Paymentform', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLSales', function(Salesorder, Paymentform, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLSales) {
	 'Paymentform',     // edition mode
    $scope.mode = null;
    
	// list of salesorders
    $scope.salesorders = [];
	// salesorder to edit
    $scope.salesorder = null;

	// referencies entities
	$scope.items = {};
    // paymentforms
	$scope.items.paymentforms = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Paymentform.getAllAsListItems().then(
				function(success) {
        	        $scope.items.paymentforms = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh salesorders list
     */
    $scope.refreshSalesorderList = function() {
    	try {
			$scope.salesorders = [];
        	Salesorder.getAll().then(
				function(success) {
        	        $scope.salesorders = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh salesorder
     */
    $scope.refreshSalesorder = function(salesorderid) {
    	try {
        	$scope.salesorder = null;
	        Salesorder.get(salesorderid).then(
				function(success) {
        	        $scope.salesorder = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the salesorders list page
     */
    $scope.goToSalesorderList = function() {
        $scope.refreshSalesorderList();
        $location.path('/app/sales/salesorder');
    }
    /**
     * Go to the salesorder edit page
     */
    $scope.goToSalesorder = function(salesorderid) {
        $scope.refreshSalesorder(salesorderid);
        $location.path('/app/sales/salesorder/'+salesorderid);
    }

    // Actions

    /**
     * Save salesorder
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Salesorder.create;
			} else {
				save = Salesorder.update;
			}
			save($scope.salesorder).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.salesorder = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete salesorder
     */
    $scope.delete = function(salesorderid) {
	    try {
			MessageHandler.cleanMessage();
    	    Salesorder.delete(salesorderid).then(
				function(success) {
                	$scope.goToSalesorderList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.salesorder = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.salesorderid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSalesorder($routeParams.salesorderid);
    } else {
        // List page
        $scope.refreshSalesorderList();
    }
    
    
}]);
