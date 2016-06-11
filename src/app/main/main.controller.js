(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController(lodash) {
        var vm = this;

        var availableCards = [
            {id: 0, worker: 2, cost: "2 Worker", action: "3 black tracks"},
            {id: 1, worker: 2, cost: "2 Worker", action: "3 silver tracks"},
            {id: 2, worker: 1, cost: "1 Worker", action: "1 brown track"},
            {id: 3, worker: 2, cost: "2 Worker", action: "2 brown tracks"},
            {id: 4, worker: 1, cost: "1 Worker", action: "1 natural track"},
            {id: 5, worker: 2, cost: "2 Worker", action: "2 natural tracks"},
            {id: 6, worker: 1, cost: "1 Worker", action: "1 white track"},
            {id: 7, worker: 2, cost: "2 Worker", action: "2 white tracks"},
            {id: 8, worker: 1, cost: "1 Worker and 1 Coin", action: "2 wildcard tracks"},
            {id: 9, worker: 1, cost: "1 Worker", action: "Take either a locomotive or a factory"},
            {id: 10, worker: 3, cost: "3 Workers", action: "Take a locomotive and a factory"},
            {id: 11, worker: 1, cost: "1 Worker", action: "Use the public engineer"},
            {id: 12, worker: 0, cost: "1 Coin", action: "Recruit the engineer"},
            {id: 13, worker: 1, cost: "1 Worker", action: "1 move on industry track"},
            {id: 14, worker: 2, cost: "2 Workers", action: "2 moves on industry track"},
            {id: 15, worker: 1, cost: "1 Worker", action: "Take a 2x double marker"}
        ];

        var playedCards = [];
        var occupiedCards = [];
        var drawableCards = [];

        var calculateDrawableCards = function() {
            drawableCards = lodash.filter(availableCards, function(card) {
                if(vm.getAvailableWorkers() == 0)
                    return false;
                if(vm.getAvailableWorkers() - card.worker < 0)
                    return false;
                if(lodash.includes(playedCards, card, 'id'))
                    return false;
                if(lodash.includes(occupiedCards, card, 'id'))
                    return false;
                return true;
            });
        }

        var workers = 6;
        vm.fabOpen = false;

        vm.drawCard = function() {
            var card = lodash.sample(drawableCards);
            if(card)
                playedCards.push(card);
                calculateDrawableCards();
        };

        vm.redrawCard = function() {
            if(playedCards.length > 0)
                playedCards.length--;
                vm.drawCard();
        }

        vm.rejectCard = function() {
            if(playedCards.length > 0)
                var card = lodash.last(playedCards);
                if(card && !lodash.includes(occupiedCards, card, 'id')) {
                    occupiedCards.push(card);
                    vm.redrawCard();
                }
        }

        vm.newRound = function() {
            playedCards.length = 0;
            occupiedCards.length = 0;
            calculateDrawableCards();
            vm.drawCard();
        }

        vm.getLast = function() {
            return lodash.last(playedCards);
        }

        vm.getPlayedCards = function() {
            return lodash.slice(playedCards, 0, playedCards.length - 1).reverse();
        }

        vm.canDrawCards = function() {
            return vm.nrCards() > 0 && vm.getAvailableWorkers() > 0;
        }

        vm.nrCards = function() {
            return drawableCards.length;
        }

        vm.getOccupiedCards = function() {
            return occupiedCards;
        }

        vm.getAvailableWorkers = function() {
            return workers - lodash.sumBy(playedCards, 'worker');
        }

        vm.getPoints = function() {
            if(workers == 8) {
                return "150+";
            }
            else if(workers == 7) {
                return "50+";
            }
            else if(workers == 6) {
                return "< 50";
            }
        }

        vm.setWorkers = function(v) {
            workers = v;
            calculateDrawableCards()
        }

        vm.getAllWorkers = function() {
            return workers;
        }

        vm.removeCardFromPlayerStack = function(item) {
            lodash.remove(occupiedCards, item, 'id');
            calculateDrawableCards();
        }
    }
})();
