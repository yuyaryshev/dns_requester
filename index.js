const dns = require("dns");
const http = require('http');
const port = 3751

const requestHandler = (request, response) => {
    // console.log(request);
    const host = request.url.substr(1);
    function onIpResolved(error, ips) {
        response.end(JSON.stringify(error? {ok:false, error}:{ok:true, ips}))
    }
    dns.resolve4(host, onIpResolved);
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.error('Failed to start server', err)
    }
    console.log(`server is listening on ${port}`)
})