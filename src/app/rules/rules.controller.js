(function() {
    'use strict';

    angular.module('rrrEmil').controller('RulesController', RulesController);

    /** @ngInject */
    function RulesController() {
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
