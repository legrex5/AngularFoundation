'use strict';

/**
 * Controller for Paymentform
 **/
masterModule.controller('PaymentformCtrl', ['Paymentform',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Paymentform, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of paymentforms
    $scope.paymentforms = [];
	// paymentform to edit
    $scope.paymentform = null;

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
     * Refresh paymentforms list
     */
    $scope.refreshPaymentformList = function() {
    	try {
			$scope.paymentforms = [];
        	Paymentform.getAll().then(
				function(success) {
        	        $scope.paymentforms = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh paymentform
     */
    $scope.refreshPaymentform = function(paymentformid) {
    	try {
        	$scope.paymentform = null;
	        Paymentform.get(paymentformid).then(
				function(success) {
        	        $scope.paymentform = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the paymentforms list page
     */
    $scope.goToPaymentformList = function() {
        $scope.refreshPaymentformList();
        $location.path('/app/master/paymentform');
    }
    /**
     * Go to the paymentform edit page
     */
    $scope.goToPaymentform = function(paymentformid) {
        $scope.refreshPaymentform(paymentformid);
        $location.path('/app/master/paymentform/'+paymentformid);
    }

    // Actions

    /**
     * Save paymentform
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Paymentform.create;
			} else {
				save = Paymentform.update;
			}
			save($scope.paymentform).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.paymentform = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete paymentform
     */
    $scope.delete = function(paymentformid) {
	    try {
			MessageHandler.cleanMessage();
    	    Paymentform.delete(paymentformid).then(
				function(success) {
                	$scope.goToPaymentformList();
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
        $scope.paymentform = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.paymentformid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPaymentform($stateParams.paymentformid);
    } else {
        // List page
        $scope.refreshPaymentformList();
    }
    
    
}]);
