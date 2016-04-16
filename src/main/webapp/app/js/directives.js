'use strict';

/* Directives */

var myAppDirectives = angular.module('UIFoundation.directives', []);

myAppDirectives.
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    }
  }]);
