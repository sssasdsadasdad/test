var fs = require('fs');
var Koa = require('koa');
var app = new Koa();
const route = require('koa-route');
const mysql = require('mysql');
const {Readable} = require('stream');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '123456',
database : 'test'
});
connection.connect();
connection.query('SELECT * FROM user WHERE id=2', function (error, results, fields) {
if (error) throw error;
console.log('user info', results.affectedRows);
});
connection.end();
const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./down.html');
};
const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./about.html');
};
app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(main);
app.listen(3000);




