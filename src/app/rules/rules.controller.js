(function() {
    'use strict';

    angular.module('rrrEmil').controller('RulesController', RulesController);

    /** @ngInject */
    function RulesController($location, $translate) {
        var vm = this;

        vm.home = function() {
            $location.path('/');
        }

        vm.isGerman = function() {
            return $translate.use() === 'de';
        }
    }
})();
