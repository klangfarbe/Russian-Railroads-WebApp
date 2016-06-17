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

    angular.module('rrrEmil').directive('rulesDe', function() {
        return {
            templateUrl: 'app/rules/rules_de.html'
        };
    })

    angular.module('rrrEmil').directive('rulesEn', function() {
        return {
            templateUrl: 'app/rules/rules_en.html'
        };
    })
})();
