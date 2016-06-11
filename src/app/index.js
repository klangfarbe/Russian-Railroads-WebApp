(function() {
    'use strict';

    angular.module('rrrEmil', ['ngMaterial', 'ngLodash'])

    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('lime')
        .accentPalette('blue-grey')
        .warnPalette('deep-orange')
        .dark()
        ;
    })

    .run(function runBlock($log) {
        $log.debug('runBlock end');
    })
})();
