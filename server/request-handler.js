/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// request.on(‘data’, function(){
//   var body =''
//   body += request;
//
// }).on('end')
// var fs = require('fs');
//


// serve static files
// exports.handle_incoming_request(req, res) {
//   if (req.method === 'GET' && req.url.substring(0, 9) === '/somecontent/') {
//     serve_static_file(req.url.substing(9), res);
//   } else {
//     res.writeHead(404, {"Content-Type": "application/json"})
//   }
//
// }



var results = [];
exports.requestHandler = function(request, response) {
  // fs.readFile('client/index.html', function(err, data) {
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   response.write(data);
  //   response.end(JSON.stringify({results: results}));
  // }).listen(1137);
  // debugger;

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  console.log('get', {request})
  console.log('get', {response})

  if (request.method === 'POST') {
    var body = [];

    request.on('data', function(chunk) {

      console.log('Testing what chunk is', chunk);
      body.push(chunk);
    }).on('end', () => {
      console.log({Buffer, body});
      console.log('body.toString', body.toString());

      console.log('Hi, this is on end');
      body = Buffer.concat(body).toString();
      results.push(JSON.parse(body));


      console.log('testing what body is ', body);
      response.end();
      // at this point, `body` has the entire request body stored in it as a string
    });



    // var data = {
    //   from: 'request.method',
    //   method: 'POST',
    // };
    // var result = {
    //   username: 'Jono',
    //   message: 'Do my bidding!'
    // };
    // results.push(result);


    console.log('post', {request})
    console.log('post', {response})
    console.log(results)
    statusCode = 201;
  }

  else if (request.url !== '/classes/messages') {
    statusCode = 404;
  }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';







  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify({results: results}));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
