'use strict';

/**
 * Controller for Supplier
 **/
masterModule.controller('SupplierCtrl', ['Supplier',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Supplier, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of suppliers
    $scope.suppliers = [];
	// supplier to edit
    $scope.supplier = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh suppliers list
     */
    $scope.refreshSupplierList = function() {
    	try {
			$scope.suppliers = [];
        	Supplier.getAll().then(
				function(success) {
        	        $scope.suppliers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh supplier
     */
    $scope.refreshSupplier = function(supplierid) {
    	try {
        	$scope.supplier = null;
	        Supplier.get(supplierid).then(
				function(success) {
        	        $scope.supplier = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the suppliers list page
     */
    $scope.goToSupplierList = function() {
        $scope.refreshSupplierList();
        $location.path('/app/master/supplier');
    }
    /**
     * Go to the supplier edit page
     */
    $scope.goToSupplier = function(supplierid) {
        $scope.refreshSupplier(supplierid);
        $location.path('/app/master/supplier/'+supplierid);
    }

    // Actions

    /**
     * Save supplier
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Supplier.create;
			} else {
				save = Supplier.update;
			}
			save($scope.supplier).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.supplier = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete supplier
     */
    $scope.delete = function(supplierid) {
	    try {
			MessageHandler.cleanMessage();
    	    Supplier.delete(supplierid).then(
				function(success) {
                	$scope.goToSupplierList();
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
        $scope.supplier = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.supplierid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSupplier($stateParams.supplierid);
    } else {
        // List page
        $scope.refreshSupplierList();
    }
    
    
}]);
