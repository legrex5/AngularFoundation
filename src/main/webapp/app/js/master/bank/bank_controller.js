'use strict';

/**
 * Controller for Bank
 **/
masterModule.controller('BankCtrl', [
                                     'Bank',  
                                     'Useraccess', 
                                     '$scope', 
                                     '$stateParams', 
                                     '$http', 
                                     '$location', 
                                     '$cookies', 
                                     'MessageHandler', 
                                     'restURLMaster',
                                     'ngTableParams',
                                     'ngTableDataServiceBank',
                                     function(
                                    		 Bank, 
                                    		 Useraccess, 
                                    		 $scope, 
                                    		 $stateParams, 
                                    		 $http, 
                                    		 $location, 
                                    		 $cookies, 
                                    		 MessageHandler, 
                                    		 restURLMaster,
                                    		 ngTableParams,
                                    		 ngTableDataServiceBank) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of banks
    $scope.banks = [];
	// bank to edit
    $scope.bank = null;

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
     * Refresh banks list
     */
    $scope.refreshBankList = function() {
    	try {
			$scope.banks = [];
        	Bank.getAll().then(
				function(success) {
        	        $scope.banks = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh bank
     */
    $scope.refreshBank = function(bankid) {
    	try {
        	$scope.bank = null;
	        Bank.get(bankid).then(
				function(success) {
        	        $scope.bank = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the banks list page
     */
    $scope.goToBankList = function() {
        $scope.refreshBankList();
        $location.path('/app/master/bank');
    }
    /**
     * Go to the bank edit page
     */
    $scope.goToBank = function(bankid) {
        $scope.refreshBank(bankid);
        $location.path('/app/master/bank/'+bankid);
    }

    // Actions

    /**
     * Save bank
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Bank.create;
			} else {
				save = Bank.update;
			}
			save($scope.bank).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.bank = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete bank
     */
    $scope.delete = function(bankid) {
	    try {
			MessageHandler.cleanMessage();
    	    Bank.delete(bankid).then(
				function(success) {
                	$scope.goToBankList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    $scope.listBank = new ngTableParams({
		page : 1,
		count : 5,
		filter : {
			bankname : '',
			bankdescription : ''
		}
	}, {
		total : 0,
		counts : [],
		getData : function($defer, params) {
		    ngTableDataServiceBank.getDataOPD($defer, params,
					$scope.userinfo.kodeDokter, 'A');
		}
	});
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.bank = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.bankid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBank($stateParams.bankid);
    } else {
        // List page
        $scope.refreshBankList();
    }
    
    
}]);
