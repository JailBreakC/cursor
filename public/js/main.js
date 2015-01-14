window.onload = function () {
    var mouseCoords = function (ev) {
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
    var listenMousemoving = function(socket) {
        document.onmousemove = function(e) {
            var coord = e ? mouseCoords(e) : mouseCoords(event);
            //console.log(event.clientX, event.clientY);
            socket.emit('move', coord);
        };

        socket.on('moving', function (data) {
            console.log('moving!');
            var ele = document.getElementById(data.id);
            if(!ele) {
                ele = document.createElement('span');
                ele.setAttribute('id', data.id);
                ele.setAttribute('class', 'cursor');
                document.getElementsByTagName('body')[0].appendChild(ele);
            }
            ele.style.left = data.coord.x + 'px';
            ele.style.top = data.coord.y + 'px';
        });

        socket.on('closed', function (id) {
            console.log('closed');
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
        });

    };
    var socket = io.connect();
    socket.on('connect', function () {
    });
    ping(socket, 'ping');
    listenMousemoving(socket);
};