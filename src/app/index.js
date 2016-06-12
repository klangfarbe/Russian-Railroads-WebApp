(function() {
    'use strict';

    angular.module('rrrEmil', ['ngMaterial', 'ngLodash', 'pascalprecht.translate'])

    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('lime')
        .accentPalette('blue-grey')
        .warnPalette('deep-orange')
        .dark()
        ;
    })

    .config(function($translateProvider) {
        $translateProvider.translations('de', {
            APP_HEADLINE:   'Emil für Russian Railroads',
            NEW_ROUND:      'Neue Runde starten',
            PLAYER_ACTIONS: 'Spieleraktionen',
            EMIL_ACTIONS:   'Von Emil besetzte Aktionen',

            COSTS_COINS:   '{{coins}} Münze',
            COSTS_WORKER:   '{{worker}} Arbeiter',
            COSTS_WORKER_COINS: '{{worker}} Arbeiter und {{coins}} Münze',

            CARD_0: "3 schwarze Gleise",
            CARD_1: "3 silberne Gleise",
            CARD_2: "1 braunes Gleis",
            CARD_3: "2 braune Gleise",
            CARD_4: "1 holzfarbenes Gleis",
            CARD_5: "2 holzfarbene Gleise",
            CARD_6: "1 weißes Gleis",
            CARD_7: "2 weiße Gleise",
            CARD_8: "2 beliebige Gleise",
            CARD_9: "Nimm eine Lokomitive oder eine Fabrik",
            CARD_10: "Nimm eine Lokomitive und eine Fabrik",
            CARD_11: "Benutze den Ingenieur",
            CARD_12: "Den Ingenieur anwerben",
            CARD_13: "1 Schritt auf der Industrieleiste",
            CARD_14: "2 Schritte auf der Industrieleiste",
            CARD_15: "Nimm einen x2 Marker"
        });

        $translateProvider.translations('en', {
            APP_HEADLINE:   'Emil for Russian Railroads',
            NEW_ROUND:      'Start new round',
            PLAYER_ACTIONS: 'Actions used by player',
            EMIL_ACTIONS:   'Actions used by Emil',

            COSTS_COINS:   '{{coins}} coin',
            COSTS_WORKER:   '{{worker}} worker',
            COSTS_WORKER_COINS: '{{worker}} worker and {{coins}} coin',

            CARD_0: "3 black tracks",
            CARD_1: "3 silver tracks",
            CARD_2: "1 brown track",
            CARD_3: "2 brown tracks",
            CARD_4: "1 natural track",
            CARD_5: "2 natural tracks",
            CARD_6: "1 white track",
            CARD_7: "2 white tracks",
            CARD_8: "2 wildcard tracks",
            CARD_9: "Take either a locomotive or a factory",
            CARD_10: "Take a locomotive and a factory",
            CARD_11: "Use the public engineer",
            CARD_12: "Recruit the engineer",
            CARD_13: "1 move on industry track",
            CARD_14: "2 moves on industry track",
            CARD_15: "Take a 2x double marker"
        });

        $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
             'en*': 'en',
             'de*': 'de'
        });

        $translateProvider.determinePreferredLanguage();
        $translateProvider.useSanitizeValueStrategy('escape');
    })

    .run(function runBlock($log) {
        $log.debug('runBlock end');
    })
})();
