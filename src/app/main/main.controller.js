(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, lodash) {
        var availableCards = [
            {id: 0, cost: "2 Worker", action: "3 black tracks"},
            {id: 1, cost: "2 Worker", action: "3 silver tracks"},
            {id: 2, cost: "1 Worker", action: "1 brown track"},
            {id: 3, cost: "2 Worker", action: "2 brown tracks"},
            {id: 4, cost: "1 Worker", action: "1 natural track"},
            {id: 5, cost: "2 Worker", action: "2 natural tracks"},
            {id: 6, cost: "1 Worker", action: "1 white track"},
            {id: 7, cost: "2 Worker", action: "2 white tracks"},
            {id: 8, cost: "1 Worker and 1 Coin", action: "2 wildcard tracks"},
            {id: 9, cost: "1 Worker", action: "Take either a locomotive or a factory"},
            {id: 10, cost: "3 Workers", action: "Take a locomotive and a factory"},
            {id: 11, cost: "See engineer", action: "Use the public engineer"},
            {id: 12, cost: "1 Coin", action: "Recruit the engineer"},
            {id: 13, cost: "1 Worker", action: "1 move on industry track"},
            {id: 14, cost: "2 Workers", action: "2 moves on industry track"},
            {id: 15, cost: "1 Worker", action: "Take a 2x double marker"}
        ];

        var playedCards = [
        ];

        $scope.drawCard = function() {
            var length = playedCards.length;
            do {
                var id = Math.floor((Math.random() * 100) + 1) % 16;
                if(!lodash.includes(playedCards, availableCards[id], 'id')) {
                    playedCards.push(availableCards[id]);
                }
            }
            while(playedCards.length <= 16 && playedCards.length == length)
        };

        $scope.newRound = function() {
            playedCards.length = 0;
        }

        $scope.getLast = function() {
            return lodash.last(playedCards);
        }

        $scope.getPlayedCards = function() {
            return lodash.slice(playedCards, 0, playedCards.length-1).reverse();
        }

        $scope.noCardsLeft = function() {
            return playedCards.length === 16;
        }

    }
})();
