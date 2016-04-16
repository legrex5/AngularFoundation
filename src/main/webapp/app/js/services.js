'use strict';

/* Services */

var myAppServices = angular.module('UIFoundation.rest', ['ngResource', 'ngCookies']);

// Demonstrate how to register services
// In this case it is a simple value service.
myAppServices.value('version', '0.1');

// Base URL for REST Services on the Spring MVC webapp
myAppServices.value('restURLMaster', 'http://localhost:7070/GeneralFoundation/rest');
myAppServices.value('restURLUserAccess', 'http://localhost:7070/GeneralFoundation/rest');
myAppServices.value('restURLSales', 'http://localhost:7070/GeneralFoundation/rest');
myAppServices.value('restURLPurchase', 'http://localhost:7070/GeneralFoundation/rest');
myAppServices.value('restURLStock', 'http://localhost:7070/GeneralFoundation/rest');
