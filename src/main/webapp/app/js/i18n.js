'use strict';

// Declare app level module which depends on filters, and services
var i18n = angular.module('i18n', [
   'ngRoute'
  ,'pascalprecht.translate'
  ,'tmh.dynamicLocale'
]);

/**
 * Main configuration
 */
i18n.config(['$translateProvider', 'tmhDynamicLocaleProvider', function($translateProvider, tmhDynamicLocaleProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'app/i18n/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.useLocalStorage();

  tmhDynamicLocaleProvider.localeLocationPattern("app/lib/angular/i18n/angular-locale_{{locale}}.js");
  tmhDynamicLocaleProvider.useStorage('$cookieStore');
}]);

/**
 * Controller for I18N
 */
i18n.controller('TranslateCtrl', ['$scope', '$translate', '$route', 'tmhDynamicLocale', function ($scope, $translate, $route, tmhDynamicLocale) {
  $scope.changeLanguage = function (key) {
    $translate.uses(key);
    tmhDynamicLocale.set(key);
    $route.reload(false);
  }
}]);
