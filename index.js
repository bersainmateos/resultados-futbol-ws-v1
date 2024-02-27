const WebSocket = require('ws');
const http = require('http');
const axios = require('axios'); 

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-resultados-futbol-v1.onrender.com/resultados');
      ws.send(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error al obtener datos de la API:', error.message);
    }
  };

  fetchData();

  const intervalId = setInterval(fetchData, 10000);

  ws.on('close', () => {
    console.log('Cliente desconectado');
    clearInterval(intervalId);
  });
});

server.listen(10000 , () => {
  console.log('Servidor WebSocket escuchando en el puerto 10000');
});
