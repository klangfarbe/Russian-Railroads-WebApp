(function() {
    'use strict';

    angular.module('rrrEmil', ['ngMaterial', 'ngLodash'])

    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .run(function runBlock($log) {
        $log.debug('runBlock end');
    })

    .constant('moment', moment);
})();
