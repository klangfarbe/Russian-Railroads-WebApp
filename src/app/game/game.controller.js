(function() {
    'use strict';

    angular.module('rrrEmil')

    .controller('GameController', GameController)


    .directive('gameStart', function() {
        return {
            templateUrl: 'app/game/game.game-start.html'
        };
    })

    .directive('roundStart', function() {
        return {
            templateUrl: 'app/game/game.round-start.html'
        };
    })

    .directive('drawCard', function() {
        return {
            templateUrl: 'app/game/game.draw-card.html'
        };
    })

    .directive('waitForPlayer', function() {
        return {
            templateUrl: 'app/game/game.wait-for-player.html'
        };
    })

    .directive('noCardLeft', function() {
        return {
            templateUrl: 'app/game/game.no-card-left.html'
        };
    });

    /** @ngInject */
    function GameController($scope, $location, lodash, Game) {
        var vm = this;
        vm.data = Game;
        vm.workers = "6";
        vm.engineer = "1,0";

        vm.hasMoreRounds = function() {
            vm.points = {points: Game.getWorkers() == 6 ? 50 : 150};
            return Game.hasMoreRounds()
        }

        vm.isState = function(state) {
            return Game.fsm === state;
        }

        $scope.$watch(
            function() {
                return Game.tracks;
            },
            function() {
                Game.calculateDrawableCards();
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

        $scope.$watch(
            function() {
                return vm.engineer;
            },
            function() {
                var costs = vm.engineer.split(',');
                Game.setEngineerCosts(lodash.parseInt(costs[0]), lodash.parseInt(costs[1]));
            }
        );
    }
})();
