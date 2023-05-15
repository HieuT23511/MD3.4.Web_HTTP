const http = require('http');
const fs = require('fs');
const qs = require('qs')

let arrayListTodo = [];
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/calculator.html', function (err, data) {
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
            const calculate = qs.parse(data);
            const result = eval(calculate.firstNumber+calculate.operator+calculate.secondNumber)

            fs.readFile('./views/calculator.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('result', result);
                datahtml = datahtml.replace('name="firstNumber"',`name="firstNumber"`+ `value=`+`${calculate.firstNumber}`)
                datahtml = datahtml.replace('name="secondNumber"',`name="secondNumber"`+ `value=`+`${calculate.secondNumber}`)

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