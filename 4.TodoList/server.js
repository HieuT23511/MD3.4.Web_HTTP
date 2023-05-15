const http = require('http');
const fs = require('fs');
const qs = require('qs')

let arrayListTodo = [];
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/todo.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const listOfWorks = qs.parse(data);
            arrayListTodo.push(listOfWorks);

            fs.readFile('./views/display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                for (let i = 0; i < arrayListTodo.length; i++) {
                    datahtml = datahtml.replace('<div id="result">', '<div id="result">' + "<p>" + arrayListTodo[i].todoList + "</p>");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});