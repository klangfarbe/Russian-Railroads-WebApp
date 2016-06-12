(function() {
    'use strict';

    angular.module('rrrEmil').controller('MainController', MainController);

    /** @ngInject */
    function MainController(lodash) {
        var vm = this;

        var availableCards = [
            {id: 0, worker: 2, coins: 0},
            {id: 1, worker: 2, coins: 0},
            {id: 2, worker: 1, coins: 0},
            {id: 3, worker: 2, coins: 0},
            {id: 4, worker: 1, coins: 0},
            {id: 5, worker: 2, coins: 0},
            {id: 6, worker: 1, coins: 0},
            {id: 7, worker: 2, coins: 0},
            {id: 8, worker: 1, coins: 1},
            {id: 9, worker: 1, coins: 0},
            {id: 10, worker: 3, coins: 0},
            {id: 11, worker: 1, coins: 0},
            {id: 12, worker: 0, coins: 1},
            {id: 13, worker: 1, coins: 0},
            {id: 14, worker: 2, coins: 0},
            {id: 15, worker: 1, coins: 0}
        ];

        lodash.forEach(availableCards, function(item) {
            item.action = function() {
                return 'CARD_' + item.id;
            }
        })

        lodash.forEach(availableCards, function(item) {
            item.cost = function() {
                var x = 'COSTS';
                if(item.worker > 0) {
                    x += '_WORKER';
                }
                if(item.coins > 0) {
                    x += '_COINS';
                }
                return x;
            }
        })

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
