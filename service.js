var Service = require('node-windows').Service;
// Create a new service object
var svc = new Service({
     name:'Report Server',
     description: 'The service to serve reports on the web.',
     script: 'C:\\Users\\Chinmay\\Desktop\\reports_server\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.on('install', () => {
	   svc.start();
});

svc.install();