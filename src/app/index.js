(function() {
    'use strict';

    angular.module('rrrEmil', ['ngRoute', 'ngMaterial', 'ngLodash', 'pascalprecht.translate'])

    .constant('CONFIG', {

    })

    .config(function($logProvider) {
        $logProvider.debugEnabled(false);
    })

    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('lime')
            .accentPalette('blue-grey')
            .warnPalette('deep-orange')
            .dark();
    })

    .config(function($translateProvider) {
        $translateProvider.translations('de', {
            PERMISSION: 'Mit Genehmigung vom Hans im Glück Verlag',
            APP_HEADLINE: 'Solo-Variante - Emil will spielen',
            START_ROUND: 'Runde',
            NEW_ROUND: 'Nächste Runde',
            NEW_GAME: 'Neues Spiel',
            END_GAME: 'Spiel beendet',
            POINTS: 'Hast du mindestens {{points}} Punkte?',
            RULES: 'Regeln',
            BLOCKED_ACTIONS: 'Felder die Emil nicht belegen konnte',
            EMIL_ACTIONS: 'Von Emil belegte Felder',
            EMIL_PASSES: 'Emil hat gepasst',
            CAN_TAKE_ACTION: 'Kann Emil die Aktion ausführen?',
            REJECT_ACTION: 'Nein',
            ACCEPT_ACTION: 'Ja',

            COAL_MODULE: 'Verwende das Kohle-Modul',
            TRACKS_AVAILABLE: 'Verfügbare Gleise',

            COSTS_COINS: '{{coins}} Münze',
            COSTS_WORKER: '{{worker}} Arbeiter',
            COSTS_WORKER_COINS: '{{worker}} Arbeiter und {{coins}} Münze',

            CARD_0: "1 weißes Gleis",
            CARD_1: "2 weiße Gleise",
            CARD_2: "1 holzfarbenes Gleis",
            CARD_3: "2 holzfarbene Gleise",
            CARD_4: "1 braunes Gleis",
            CARD_5: "2 braune Gleise",
            CARD_6: "3 graue Gleise",
            CARD_7: "3 schwarze Gleise",

            CARD_8: "2 beliebige Gleise",
            CARD_9: "Nimm eine Lok oder eine Fabrik",
            CARD_10: "Nimm eine Lok und eine Fabrik",
            CARD_11: "Benutze den Ingenieur",
            CARD_12: "Den Ingenieur anwerben",
            CARD_13: "1 Schritt auf der Industrieleiste",
            CARD_14: "2 Schritte auf der Industrieleiste",
            CARD_15: "Nimm einen x2 Marker",
            CARD_16: "Nimm eine Kohle"
        });

        $translateProvider.translations('en', {
            PERMISSION: 'With permission of Hans im Glück Verlag',
            APP_HEADLINE: 'Solo-Variant - Emil wants to play',
            START_ROUND: 'Round',
            NEW_ROUND: 'Next round',
            NEW_GAME: 'New game',
            END_GAME: 'Game finished',
            POINTS: 'Have you reached {{points}} points?',
            RULES: 'Rules',
            BLOCKED_ACTIONS: 'Actions Emil could not take',
            EMIL_ACTIONS: 'Actions Emil took',
            EMIL_PASSES: 'Emil has passed',
            CAN_TAKE_ACTION: 'Can Emil take the action?',
            REJECT_ACTION: 'No',
            ACCEPT_ACTION: 'Yes',

            COAL_MODULE: 'Include coal-module',
            TRACKS_AVAILABLE: 'Usable tracks',

            COSTS_COINS: '{{coins}} coin',
            COSTS_WORKER: '{{worker}} worker',
            COSTS_WORKER_COINS: '{{worker}} worker and {{coins}} coin',

            CARD_0: "1 white track",
            CARD_1: "2 white tracks",
            CARD_2: "1 natural track",
            CARD_3: "2 natural tracks",
            CARD_4: "1 brown track",
            CARD_5: "2 brown tracks",
            CARD_6: "3 grey tracks",
            CARD_7: "3 black tracks",

            CARD_8: "2 wildcard tracks",
            CARD_9: "Take a locomotive or a factory",
            CARD_10: "Take a locomotive and a factory",
            CARD_11: "Use the public engineer",
            CARD_12: "Recruit the engineer",
            CARD_13: "1 move on industry track",
            CARD_14: "2 moves on industry track",
            CARD_15: "Take a 2x double marker",
            CARD_16: "Take a coal"
        });

        $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
            'en*': 'en',
            'de*': 'de'
        });

        $translateProvider.preferredLanguage('de');
        // $translateProvider.determinePreferredLanguage();
        $translateProvider.useSanitizeValueStrategy('escape');
    })

    .config(function($locationProvider) {
         $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html'
            })
            .when('/game', {
                templateUrl: 'app/game/game.html',
                controller: 'GameController',
                controllerAs: 'game'
            })
            .when('/rules', {
                templateUrl: 'app/rules/rules.html',
                controller: 'RulesController',
                controllerAs: 'rules'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(function($mdIconProvider) {
        $mdIconProvider
            .icon('track:black', 'assets/black.svg')
            .icon('track:brown', 'assets/brown.svg')
            .icon('track:grey', 'assets/grey.svg')
            .icon('track:natural', 'assets/natural.svg')
            .icon('track:white', 'assets/white.svg');
    })

    .run(function runBlock($log) {
        $log.debug('runBlock end');
    })
})();
