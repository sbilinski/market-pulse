var marketPulseServices = angular.module('marketPulseServices', ['ngResource']);

marketPulseServices.factory('Trade', ['$resource',
    function($resource) {
        return $resource('/api/trades', {}, {
            create: {method:'POST', params:{}}
        });
    }]);

marketPulseServices.factory('ExchangeStats', ['$websocket',
    function($websocket) {
        var dataStream = $websocket('ws://' + location.host + '/ws/exchange-stats');
        var statistics = {};

        dataStream.onOpen(function() {
           dataStream.send(JSON.stringify({ action: 'get' }));
        });

        dataStream.onMessage(function(message) {
            var exchange = JSON.parse(message.data);
            var key = exchange.from + '-' + exchange.to;
            statistics[key] = exchange;
        });

        var methods = {
            collection: statistics
        };

        return methods;
    }]);