(function() {
  'use strict';

  angular
    .module('npng')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
