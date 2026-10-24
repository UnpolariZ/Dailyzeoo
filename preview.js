import {createServer} from './server.js';
createServer().listen(4173,'0.0.0.0',()=>console.log('Local: http://localhost:4173'));
