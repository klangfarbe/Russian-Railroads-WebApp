(function() {
    'use strict';

    angular.module('rrrEmil').service('Game', Game);

    /** @ngInject */
    function Game(lodash) {
        var includeCoalModule = false;
        var drawnCard;
        var playedCards = [];
        var occupiedCards = [];
        var drawableCards = [];
        var workers = 6;
        var rounds = 6;
        var availableCards = [
            {id: 0, worker: 1, coins: 0}, // white
            {id: 1, worker: 2, coins: 0}, // white
            {id: 2, worker: 1, coins: 0}, // natural
            {id: 3, worker: 2, coins: 0}, // natural
            {id: 4, worker: 1, coins: 0}, // brown
            {id: 5, worker: 2, coins: 0}, // brown
            {id: 6, worker: 2, coins: 0}, // grey
            {id: 7, worker: 2, coins: 0}, // black track
            {id: 8, worker: 1, coins: 1},
            {id: 9, worker: 1, coins: 0},
            {id: 10, worker: 3, coins: 0}, //
            {id: 11, worker: 1, coins: 0}, // use engineer
            {id: 12, worker: 0, coins: 1}, // buy engineer
            {id: 13, worker: 1, coins: 0},
            {id: 14, worker: 2, coins: 0},
            {id: 15, worker: 1, coins: 0},
            {id: 16, worker: 1, coins: 0}
        ];

        // ---------------------------------------------------------------------
        // Service functions
        // ---------------------------------------------------------------------
        var vm = {};

        // The finite state machine. Possible states are:
        // 1. 'round-start'
        // 2. 'draw-card'
        // 3. 'wait-for-player'
        // 4. 'no-card-left'

        vm.fsm;
        vm.tracks;

        vm.calculateDrawableCards = function() {
            drawableCards = lodash.filter(availableCards, function(card) {
                var availableWorkers = workers - lodash.sumBy(playedCards, 'worker');
                if(availableWorkers == 0 || availableWorkers - card.worker < 0)
                    return false;
                if(vm.tracks == 'black' && card.id < 7)
                    return false;
                if(vm.tracks == 'grey' && card.id < 6)
                    return false;
                if(vm.tracks == 'brown' && card.id < 4)
                    return false;
                if(vm.tracks == 'natural' && card.id < 2)
                    return false;
                if(card.id == 16 && !includeCoalModule)
                    return false;
                if(lodash.includes(playedCards, card, 'id'))
                    return false;
                if(lodash.includes(occupiedCards, card, 'id'))
                    return false;
                return true;
            });
        }

        vm.init = function(_includeCoalModule) {
            workers = 6;
            rounds = _includeCoalModule ? 5 : 6;
            playedCards.length = 0;
            occupiedCards.length = 0;
            drawableCards.length = 0;
            includeCoalModule = _includeCoalModule;
            vm.tracks = 'black';
            vm.fsm = 'game-start';
        };

        vm.startGame = function() {
            vm.fsm = 'round-start';
        }

        vm.drawCard = function() {
            vm.calculateDrawableCards();
            drawnCard = lodash.sample(drawableCards);
            if(drawnCard) {
                vm.fsm = 'draw-card';
            } else {
                vm.fsm = 'no-card-left';
            }
        };

        vm.acceptCard = function() {
            if(drawnCard) {
                playedCards.push(drawnCard);
                vm.calculateDrawableCards();
                vm.fsm = 'wait-for-player';
            }
        }

        vm.rejectCard = function() {
            if(drawnCard) {
                occupiedCards.push(drawnCard);
                vm.drawCard();
            }
        }

        vm.playerTurnDone = function() {
            vm.drawCard();
        }

        vm.newRound = function() {
            rounds--;
            playedCards.length = 0;
            occupiedCards.length = 0;
            vm.fsm = 'round-start';
        }

        vm.startRound = function() {
            vm.drawCard();
        }

        vm.getLast = function() {
            return drawnCard;
        }

        vm.getPlayedCards = function() {
            return lodash.clone(playedCards).reverse();
        }

        vm.canDrawCards = function() {
            return vm.nrCards() > 0 && vm.getAvailableWorkers() > 0;
        }

        vm.nrCards = function() {
            return drawableCards.length;
        }

        vm.getOccupiedCards = function() {
            return lodash.clone(occupiedCards).reverse();
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

        vm.getWorkers = function() {
            return workers;
        }

        vm.setWorker = function(value) {
            if(value >= 6 && value <= 8)
                workers = value;
                vm.calculateDrawableCards();
        }

        vm.setEngineerCosts = function(worker, coins) {
            var card = lodash.find(availableCards, {'id':11});
            if(card) {
                card.worker = worker;
                card.coins = coins;
                vm.calculateDrawableCards();
            }
        }

        vm.getRound = function() {
            return (includeCoalModule ? 5 : 6) -  rounds + 1;
        }

        vm.getRounds = function() {
            return includeCoalModule ? 5 : 6;
        }

        vm.isLastRound = function() {
            return vm.nrCards() === 0 && vm.getRound() == vm.getRounds();
        }

        vm.hasMoreRounds = function() {
            return vm.nrCards() === 0 && vm.getRound() < vm.getRounds();
        }

        vm.removeFromOccupiedCards = function(item) {
            lodash.remove(occupiedCards, item, 'id');
            vm.drawCard();
        }

        vm.removeFromPlayedCards = function(item) {
            lodash.remove(playedCards, item, 'id');
            vm.drawCard();
        }

        // ---------------------------------------------------------------------
        // Initialize actions and costs for each card based on the worker and cost settings
        // ---------------------------------------------------------------------
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

        vm.init();

        return vm;
    }
})();
