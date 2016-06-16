(function() {
    'use strict';

    angular.module('rrrEmil').controller('GameController', GameController);

    /** @ngInject */
    function GameController($scope, $location, lodash, Game) {
        var vm = this;
        vm.data = Game;
        vm.pointChange = false;
        vm.fabOpen = false;

        vm.hasMoreRounds = function() {
            vm.points = {points: Game.getWorkers() == 6 ? 50 : 150};
            return Game.hasMoreRounds()
        }

        vm.home = function() {
            $location.path('/');
        }

        $scope.$watch(
            function() {
                return Game.tracks;
            },
            function() {
                Game.calculateDrawableCards()
                if(!Game.getLast())
                    Game.drawCard();
            })
    }
})();
