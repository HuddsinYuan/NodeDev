/**
 * Created by Jonassen on 16/2/4.
 */

//var spawn = require('child_process').spawn,
//    pwd = spawn('pwd');
//
//pwd.stdout.on('data', function (data) {
//    console.log('stdout: ' + data);
//});
//
//pwd.stderr.on('data', function (data) {
//    console.log('stderr: ', + data);
//});
//
//pwd.on('exit', function (code) {
//    console.log('child_process exited with code ' + code);
//});

var exec = require('child_process').exec,
    child;

child = exec('ls', function (error, stdout, stderr) {
    if (error == null) {
        console.log('stdout: ' + stdout);
    }
});