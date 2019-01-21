//https://github.com/tkorakas/chat-application/blob/master/server/app/js/services/socket.srv.js

angular.module('starter.services', [])
.factory('socket', function ($rootScope) {
    var socket = io('83.212.101.230:3000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
