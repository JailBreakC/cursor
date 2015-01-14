window.ping = function(socket, eleID) {
    socket.emit('ping', 'pinging', function(date) {
        console.log(date);
    });
    console.log('connected');
    var date = new Date();
    socket.on('ping', function(data) {
        var ping = new Date() - date;
        var ele = document.getElementById(eleID);
        ele.innerText = ping;
        setTimeout(function () {
            socket.emit('ping', 'pinging', function(date) {
                //console.log(date);
            });
            date = new Date();
        }, 1000);
    });
};