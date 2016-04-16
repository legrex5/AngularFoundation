'use strict';

/**
 * Controller for Returnsupplier
 **/
purchaseModule.controller('ReturnsupplierCtrl', ['Returnsupplier',  'Supplier', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Returnsupplier, Supplier, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Supplier',     // edition mode
    $scope.mode = null;
    
	// list of returnsuppliers
    $scope.returnsuppliers = [];
	// returnsupplier to edit
    $scope.returnsupplier = null;

	// referencies entities
	$scope.items = {};
    // suppliers
	$scope.items.suppliers = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Supplier.getAllAsListItems().then(
				function(success) {
        	        $scope.items.suppliers = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh returnsuppliers list
     */
    $scope.refreshReturnsupplierList = function() {
    	try {
			$scope.returnsuppliers = [];
        	Returnsupplier.getAll().then(
				function(success) {
        	        $scope.returnsuppliers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh returnsupplier
     */
    $scope.refreshReturnsupplier = function(returnsupplierid) {
    	try {
        	$scope.returnsupplier = null;
	        Returnsupplier.get(returnsupplierid).then(
				function(success) {
        	        $scope.returnsupplier = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the returnsuppliers list page
     */
    $scope.goToReturnsupplierList = function() {
        $scope.refreshReturnsupplierList();
        $location.path('/app/purchase/returnsupplier');
    }
    /**
     * Go to the returnsupplier edit page
     */
    $scope.goToReturnsupplier = function(returnsupplierid) {
        $scope.refreshReturnsupplier(returnsupplierid);
        $location.path('/app/purchase/returnsupplier/'+returnsupplierid);
    }

    // Actions

    /**
     * Save returnsupplier
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Returnsupplier.create;
			} else {
				save = Returnsupplier.update;
			}
			save($scope.returnsupplier).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.returnsupplier = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete returnsupplier
     */
    $scope.delete = function(returnsupplierid) {
	    try {
			MessageHandler.cleanMessage();
    	    Returnsupplier.delete(returnsupplierid).then(
				function(success) {
                	$scope.goToReturnsupplierList();
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
        $scope.returnsupplier = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.returnsupplierid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshReturnsupplier($routeParams.returnsupplierid);
    } else {
        // List page
        $scope.refreshReturnsupplierList();
    }
    
    
}]);
