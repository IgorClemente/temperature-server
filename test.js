var sys   = require('sys'),
    spawn = require('child_process').spawn,
    dummy  = spawn('python', ['test.py']);

dummy.stdout.on('data', function(data) {
    sys.print(data.toString());
});
