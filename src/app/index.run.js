(function() {
  'use strict';

  angular
    .module('rrrEmil')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
