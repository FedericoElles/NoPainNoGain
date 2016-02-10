/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('npng')
    .constant('moment', moment)
    .value('duScrollOffset', 60);
})();
