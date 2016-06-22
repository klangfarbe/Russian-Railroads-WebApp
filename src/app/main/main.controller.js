(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController($mdMedia, $location, $translate, Game) {
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

        vm.home = function() {
            $location.path('/');
        }

        vm.screenIsSmall = function() {
            return $mdMedia('xs');
        }
    }
})();
