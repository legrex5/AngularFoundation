'use strict';

/**
 * Controller for Type
 **/
masterModule.controller('TypeCtrl', ['Type',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Type, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of types
    $scope.types = [];
	// type to edit
    $scope.type = null;

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
     * Refresh types list
     */
    $scope.refreshTypeList = function() {
    	try {
			$scope.types = [];
        	Type.getAll().then(
				function(success) {
        	        $scope.types = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh type
     */
    $scope.refreshType = function(typeid) {
    	try {
        	$scope.type = null;
	        Type.get(typeid).then(
				function(success) {
        	        $scope.type = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the types list page
     */
    $scope.goToTypeList = function() {
        $scope.refreshTypeList();
        $location.path('/app/master/type');
    }
    /**
     * Go to the type edit page
     */
    $scope.goToType = function(typeid) {
        $scope.refreshType(typeid);
        $location.path('/app/master/type/'+typeid);
    }

    // Actions

    /**
     * Save type
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Type.create;
			} else {
				save = Type.update;
			}
			save($scope.type).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.type = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete type
     */
    $scope.delete = function(typeid) {
	    try {
			MessageHandler.cleanMessage();
    	    Type.delete(typeid).then(
				function(success) {
                	$scope.goToTypeList();
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
        $scope.type = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.typeid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshType($stateParams.typeid);
    } else {
        // List page
        $scope.refreshTypeList();
    }
    
    
}]);
