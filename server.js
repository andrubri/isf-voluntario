const express = require('express');
const http = require('http')
const path = require('path');

const app = express();
const args = require('minimist')(process.argv.slice(2));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port =  args.port || process.env.PORT || 80;
console.log ("port", port)
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));