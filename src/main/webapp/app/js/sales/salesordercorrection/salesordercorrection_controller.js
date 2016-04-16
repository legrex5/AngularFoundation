'use strict';

/**
 * Controller for Salesordercorrection
 **/
salesModule.controller('SalesordercorrectionCtrl', ['Salesordercorrection',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLSales', function(Salesordercorrection, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLSales) {
	    // edition mode
    $scope.mode = null;
    
	// list of salesordercorrections
    $scope.salesordercorrections = [];
	// salesordercorrection to edit
    $scope.salesordercorrection = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh salesordercorrections list
     */
    $scope.refreshSalesordercorrectionList = function() {
    	try {
			$scope.salesordercorrections = [];
        	Salesordercorrection.getAll().then(
				function(success) {
        	        $scope.salesordercorrections = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh salesordercorrection
     */
    $scope.refreshSalesordercorrection = function(salesordercorrectionid) {
    	try {
        	$scope.salesordercorrection = null;
	        Salesordercorrection.get(salesordercorrectionid).then(
				function(success) {
        	        $scope.salesordercorrection = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the salesordercorrections list page
     */
    $scope.goToSalesordercorrectionList = function() {
        $scope.refreshSalesordercorrectionList();
        $location.path('/app/sales/salesordercorrection');
    }
    /**
     * Go to the salesordercorrection edit page
     */
    $scope.goToSalesordercorrection = function(salesordercorrectionid) {
        $scope.refreshSalesordercorrection(salesordercorrectionid);
        $location.path('/app/sales/salesordercorrection/'+salesordercorrectionid);
    }

    // Actions

    /**
     * Save salesordercorrection
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Salesordercorrection.create;
			} else {
				save = Salesordercorrection.update;
			}
			save($scope.salesordercorrection).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.salesordercorrection = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete salesordercorrection
     */
    $scope.delete = function(salesordercorrectionid) {
	    try {
			MessageHandler.cleanMessage();
    	    Salesordercorrection.delete(salesordercorrectionid).then(
				function(success) {
                	$scope.goToSalesordercorrectionList();
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
        $scope.salesordercorrection = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.salesordercorrectionid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSalesordercorrection($routeParams.salesordercorrectionid);
    } else {
        // List page
        $scope.refreshSalesordercorrectionList();
    }
    
    
}]);
