'use strict';

angular.module('daraApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:country/:city/:packageName',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
