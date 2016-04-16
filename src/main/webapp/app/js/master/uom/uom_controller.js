'use strict';

/**
 * Controller for Uom
 **/
masterModule.controller('UomCtrl', ['Uom',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Uom, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of uoms
    $scope.uoms = [];
	// uom to edit
    $scope.uom = null;

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
     * Refresh uoms list
     */
    $scope.refreshUomList = function() {
    	try {
			$scope.uoms = [];
        	Uom.getAll().then(
				function(success) {
        	        $scope.uoms = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh uom
     */
    $scope.refreshUom = function(uomid) {
    	try {
        	$scope.uom = null;
	        Uom.get(uomid).then(
				function(success) {
        	        $scope.uom = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the uoms list page
     */
    $scope.goToUomList = function() {
        $scope.refreshUomList();
        $location.path('/app/master/uom');
    }
    /**
     * Go to the uom edit page
     */
    $scope.goToUom = function(uomid) {
        $scope.refreshUom(uomid);
        $location.path('/app/master/uom/'+uomid);
    }

    // Actions

    /**
     * Save uom
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Uom.create;
			} else {
				save = Uom.update;
			}
			save($scope.uom).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.uom = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete uom
     */
    $scope.delete = function(uomid) {
	    try {
			MessageHandler.cleanMessage();
    	    Uom.delete(uomid).then(
				function(success) {
                	$scope.goToUomList();
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
        $scope.uom = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.uomid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshUom($stateParams.uomid);
    } else {
        // List page
        $scope.refreshUomList();
    }
    
    
}]);
