(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController($location, Game) {
        var vm = this;

        vm.includeCoalModule = false;
        vm.newGame = function() {
            Game.init(vm.includeCoalModule)
            $location.path('/game');
        }
    }
})();
