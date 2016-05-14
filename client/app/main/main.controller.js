'use strict';

angular.module('daraApp')
    .controller('MainController', function($scope, $location, $stateParams, algolia) {

        $scope.myInterval = 3000;


        var query = $location.$$path.substring(1);

        var client = algolia.Client('UM9GX4AKRT', 'ea47ccace4e5c89432326883cac9ae68');
        var index = client.initIndex('packages');
        $scope.content = {};

        index.search(query)
            .then(function searchSuccess(content) {
                $scope.content = content.hits[0];
                var date = timeConverter($scope.content.checkin_date);
                $scope.content.checkin_date = date
                $scope.content.expiration_date = timeConverter($scope.content.expiration_date);
                console.log($scope.content)
            }, function searchFailure(err) {
                console.log(err, 'erro');
            });

        function timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          console.log(date, 'date')
          var time = date + ' ' + month + ' ' + year;
          return time;
        }
    });
