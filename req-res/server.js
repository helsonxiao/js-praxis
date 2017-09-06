var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

var root = path.resolve(process.argv[2] || './static')

console.log('Static root dir: ' + root)

var server = http.createServer((request, response) => {
    var pathname = url.parse(request.url).pathname
    var filepath = path.join(root, pathname)
    fs.stat(filepath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            fs.readdir(filepath, (err, files) => {
                if (err) {
                    fail(request, response)
                    console.log('Wrong dir operation!')
                } else if (files.includes('index.html')) {
                    filepath = path.join(filepath, 'index.html')
                    success(filepath, request, response)
                } else if (files.includes('default.html')) {
                    filepath = path.join(filepath, 'default.html')
                    success(filepath, request, response)
                }
            })
        } else if (!err && stats.isFile()) {
            success(filepath, request, response)
        } else {
            fail(request, response)
        }
    })
})

function success(filepath, request, response) {
    console.log('200' + request.url)
    response.writeHead(200)
    fs.createReadStream(filepath).pipe(response)
}

function fail(request, response) {
    console.log('404 ' + request.url)
    response.writeHead(404)
    response.end('404 Not Found')
}

server.listen(8080)

console.log('Server is running at localhost:8080...')