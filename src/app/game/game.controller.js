(function() {
    'use strict';

    var app = angular.module('rrrEmil');

    app.controller('GameController', GameController);

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

    app.directive('gameStart', function() {
        return {
            templateUrl: 'app/game/game.game-start.html'
        };
    })

    app.directive('roundStart', function() {
        return {
            templateUrl: 'app/game/game.round-start.html'
        };
    })

    app.directive('drawCard', function() {
        return {
            templateUrl: 'app/game/game.draw-card.html'
        };
    })

    app.directive('waitForPlayer', function() {
        return {
            templateUrl: 'app/game/game.wait-for-player.html'
        };
    })

    app.directive('noCardLeft', function() {
        return {
            templateUrl: 'app/game/game.no-card-left.html'
        };
    })
})();
