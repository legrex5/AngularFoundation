'use strict';

/**
 * Controller for Accountbank
 **/
purchaseModule.controller('PurchaseAccountbankCtrl', ['Accountbank',  'Salesorder', 'Useraccess', 'Bank', 'Supplier', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Accountbank, Salesorder, Useraccess, Bank, Supplier, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Salesorder',  'Useraccess',  'Bank',  'Supplier',     // edition mode
    $scope.mode = null;
    
	// list of accountbanks
    $scope.accountbanks = [];
	// accountbank to edit
    $scope.accountbank = null;

	// referencies entities
	$scope.items = {};
    // salesorders
	$scope.items.salesorders = [];
    // useraccesss
	$scope.items.useraccesss = [];
    // banks
	$scope.items.banks = [];
    // suppliers
	$scope.items.suppliers = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Salesorder.getAllAsListItems().then(
				function(success) {
        	        $scope.items.salesorders = success.data;
            	}, 
	            MessageHandler.manageError);
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
		Bank.getAllAsListItems().then(
				function(success) {
        	        $scope.items.banks = success.data;
            	}, 
	            MessageHandler.manageError);
		Supplier.getAllAsListItems().then(
				function(success) {
        	        $scope.items.suppliers = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh accountbanks list
     */
    $scope.refreshAccountbankList = function() {
    	try {
			$scope.accountbanks = [];
        	Accountbank.getAll().then(
				function(success) {
        	        $scope.accountbanks = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh accountbank
     */
    $scope.refreshAccountbank = function(accountbankid) {
    	try {
        	$scope.accountbank = null;
	        Accountbank.get(accountbankid).then(
				function(success) {
        	        $scope.accountbank = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the accountbanks list page
     */
    $scope.goToAccountbankList = function() {
        $scope.refreshAccountbankList();
        $location.path('/app/purchase/accountbank');
    }
    /**
     * Go to the accountbank edit page
     */
    $scope.goToAccountbank = function(accountbankid) {
        $scope.refreshAccountbank(accountbankid);
        $location.path('/app/purchase/accountbank/'+accountbankid);
    }

    // Actions

    /**
     * Save accountbank
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Accountbank.create;
			} else {
				save = Accountbank.update;
			}
			save($scope.accountbank).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.accountbank = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete accountbank
     */
    $scope.delete = function(accountbankid) {
	    try {
			MessageHandler.cleanMessage();
    	    Accountbank.delete(accountbankid).then(
				function(success) {
                	$scope.goToAccountbankList();
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
        $scope.accountbank = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.accountbankid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAccountbank($routeParams.accountbankid);
    } else {
        // List page
        $scope.refreshAccountbankList();
    }
    
    
}]);
