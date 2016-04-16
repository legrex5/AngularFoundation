'use strict';

/**
 * Controller for Salesorderdtl
 **/
salesModule.controller('SalesorderdtlCtrl', ['Salesorderdtl',  'Useraccess', 'Detailexpired', 'Productuom', 'Salesorder', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLSales', function(Salesorderdtl, Useraccess, Detailexpired, Productuom, Salesorder, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLSales) {
	 'Useraccess',  'Detailexpired',  'Productuom',  'Salesorder',     // edition mode
    $scope.mode = null;
    
	// list of salesorderdtls
    $scope.salesorderdtls = [];
	// salesorderdtl to edit
    $scope.salesorderdtl = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];
    // detailexpireds
	$scope.items.detailexpireds = [];
    // productuoms
	$scope.items.productuoms = [];
    // salesorders
	$scope.items.salesorders = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
		Detailexpired.getAllAsListItems().then(
				function(success) {
        	        $scope.items.detailexpireds = success.data;
            	}, 
	            MessageHandler.manageError);
		Productuom.getAllAsListItems().then(
				function(success) {
        	        $scope.items.productuoms = success.data;
            	}, 
	            MessageHandler.manageError);
		Salesorder.getAllAsListItems().then(
				function(success) {
        	        $scope.items.salesorders = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh salesorderdtls list
     */
    $scope.refreshSalesorderdtlList = function() {
    	try {
			$scope.salesorderdtls = [];
        	Salesorderdtl.getAll().then(
				function(success) {
        	        $scope.salesorderdtls = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh salesorderdtl
     */
    $scope.refreshSalesorderdtl = function(salesorderdtlid) {
    	try {
        	$scope.salesorderdtl = null;
	        Salesorderdtl.get(salesorderdtlid).then(
				function(success) {
        	        $scope.salesorderdtl = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the salesorderdtls list page
     */
    $scope.goToSalesorderdtlList = function() {
        $scope.refreshSalesorderdtlList();
        $location.path('/app/sales/salesorderdtl');
    }
    /**
     * Go to the salesorderdtl edit page
     */
    $scope.goToSalesorderdtl = function(salesorderdtlid) {
        $scope.refreshSalesorderdtl(salesorderdtlid);
        $location.path('/app/sales/salesorderdtl/'+salesorderdtlid);
    }

    // Actions

    /**
     * Save salesorderdtl
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Salesorderdtl.create;
			} else {
				save = Salesorderdtl.update;
			}
			save($scope.salesorderdtl).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.salesorderdtl = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete salesorderdtl
     */
    $scope.delete = function(salesorderdtlid) {
	    try {
			MessageHandler.cleanMessage();
    	    Salesorderdtl.delete(salesorderdtlid).then(
				function(success) {
                	$scope.goToSalesorderdtlList();
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
        $scope.salesorderdtl = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.salesorderdtlid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSalesorderdtl($routeParams.salesorderdtlid);
    } else {
        // List page
        $scope.refreshSalesorderdtlList();
    }
    
    
}]);
