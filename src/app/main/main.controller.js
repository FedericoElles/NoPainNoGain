(function() {
  'use strict';

  angular
    .module('npng')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('ReallyInstanceCtrl', ReallyInstanceCtrl)
    .controller('MainController', MainController)

    .directive('stopEvent', function () {
        return {
          restrict: 'A',
          link: function (scope, element, attr) {
            element.on(attr.stopEvent, function (e) {
              e.stopPropagation();
            });
          }
        };
      });

  /** @ngInject */
  function ModalInstanceCtrl($scope, $modalInstance, items) {
  
     $scope.ctrl = {
       amount: undefined,
       name: ''
     };
  
    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
  
    $scope.ok = function () {
      $modalInstance.close($scope.ctrl);
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

  /** @ngInject */
  function ReallyInstanceCtrl($scope, $modalInstance, gain, action) {
  
    var DICT = {
      'drop': {
        title: 'GOAL_DROP',
        caption: gain.name,
        question: 'GOAL_DROP_REALLY'
      },
      'gain' : {
        title: 'GOAL_SUCCEED',
        caption: gain.name,
        question: 'GOAL_SUCCEED_REALLY'
      }
    };
    
    $scope.title = DICT[action].title;
    $scope.caption = DICT[action].caption;
    $scope.question = DICT[action].question;    
  

    $scope.ok = function () {
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }


  /** @ngInject */
  function MainController($timeout, $modal, $log, $window, $translate, webDevTec, npng) {
    var vm = this;
      
    vm.ctrl = {
      painStaging: 0 //staging environment for pain
    };

    vm.npng = npng;
    vm.data = npng.data;

    var lang = $window.navigator.language || $window.navigator.userLanguage; 
    console.log("language detected: ", lang);
    $translate.use(lang.split('-')[0]);
    
    
    vm.open = function () {
    
      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });
  
      modalInstance.result.then(function (data) {
        npng.addGain(data.name, data.amount);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };



    vm.really = function (action, index, gain) {
    
      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'really.html',
        controller: 'ReallyInstanceCtrl',
        size: 'sm',
        resolve: {
          gain: function () {
            return gain;
          },
          action: function () {
            return action;
          }
        }
      });
  
      modalInstance.result.then(function () {
        switch (action){
          case 'drop':
            npng.dropGain(index);
            break;
          case 'gain':
            npng.earnGain(index);
            break;
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // vm.awesomeThings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1454567583632;

    // activate();

    // function activate() {
    //   getWebDevTec();
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }
    
    // npng.data.calendar.push({
    //   key: 201602,
    //   amount: 1
    // });    
    // console.log('npng> pain: ', npng.data.stats.current);
    // npng.addPain(12);
    // npng.addPain(1);
    // console.log('npng> pain: ', npng.data.stats.current);
    // npng.addGain('Lego 1', 10);
    // npng.addGain('Lego 2', 10);
    // npng.addGain('Lego 2', 10);    
    // console.log('npng> gains.current: ', npng.data.gains.current);
    // npng.addGain('Error', 10);
    // console.log('npng> gains.current: ', npng.data.gains.current);
    // npng.dropGain(0);
    // console.log('npng> gains.current: ', npng.data.gains.current);
    // npng.earnGain(0);
    // console.log('npng> gains.current / history: ', npng.data.gains.current,  npng.data.gains.history);
    // console.log('npng> pain/ total: ', npng.data.stats.current, npng.data.stats.total);    
    

    // console.log('npng> calendar: ', npng.data.calendar);    
    // function getWebDevTec() {
    //   vm.awesomeThings = webDevTec.getTec();

    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
  }
})();
