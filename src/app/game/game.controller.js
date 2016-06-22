(function() {
    'use strict';

    angular.module('rrrEmil').controller('GameController', GameController);

    /** @ngInject */
    function GameController($scope, $location, lodash, Game) {
        var vm = this;
        vm.data = Game;
        vm.workers = "6";

        vm.hasMoreRounds = function() {
            vm.points = {points: Game.getWorkers() == 6 ? 50 : 150};
            return Game.hasMoreRounds()
        }

        $scope.$watch(
            function() {
                return Game.tracks;
            },
            function() {
                Game.calculateDrawableCards();
                if(!Game.getLast())
                    Game.drawCard();
            }
        );

        $scope.$watch(
            function() {
                return vm.workers;
            },
            function() {
                Game.setWorker(lodash.parseInt(vm.workers));
            }
        );
    }
})();
