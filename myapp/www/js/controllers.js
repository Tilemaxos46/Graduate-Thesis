angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $interval) {
    $interval(function(){
      $http.get("http://83.212.101.230:8000/status-json.xsl").then(function(response)
      {
        $scope.stats = response.data;
        $scope.online = typeof $scope.stats.icestats.source == "undefined" ? false : true;
      })
    }, 2000)
 })

.controller('ChatsCtrl', function($scope, socket) {
  // Messsage data.
  $scope.data={
    username: "",
    message: ""
  };

  // Username
  $scope.username_bool=false;

  // Message list.
  $scope.items = [
   {name: 'auto message', message:'Welcome to Pirate Parrot Radio'}
  ]

  // Save username.
  $scope.save=function(){
    if($scope.data.username != ""){
      $scope.username_bool=true;
    }
  }

  // Send message.
  $scope.send=function(){
    // Send message.
    socket.emit("message", {name: $scope.data.username, message: $scope.data.message});
    // Clean message textbox.
    $scope.data.message="";
  }

  // Waiting for server response.
  socket.on('message', function (data) {
          // Add new message to list.
          $scope.items.push({name: data.name, message: data.message});
      });
})
