(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController($location, $translate, Game) {
        var vm = this;

        vm.includeCoalModule = false;
        vm.newGame = function() {
            Game.init(vm.includeCoalModule)
            $location.path('/game');
        }

        vm.switchLanguage = function(key) {
            $translate.use(key)
        }

        vm.showRules = function() {
            $location.path('/rules');
        }
    }
})();
