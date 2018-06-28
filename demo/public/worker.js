const connections = [];
onconnect = function(e) {
  const port = e.ports[0];
  connections.push(port);
  port.onmessage = function(e) {
    connections.forEach(function(conn) {
      if (conn !== port) {
        conn.postMessage(e.data);
      }
    });
  };
};