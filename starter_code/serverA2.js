const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the url module so we can parse the web address of the request into readable parts

var fridge;
var items;

const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

const server = http.createServer(processRequest);// create the server object

server.listen(port, host, () => { // Bind the port and host to the server
  console.log("Server is running!");
});

 //http://localhost:8000/index.html
function processRequest(request, response){
	const urlObject = url.parse(request.url, true); // parses the URL into readable parts
	let queryObject = url.parse(request.url, true);
	if(request.method === "POST"){
		let data = "";

		request.on('data', chunk => {
			data += chunk.toString();
		});
		request.on('end', () => {
			queryObject = url.parse(data, true);
			if(parseInt(queryObject.query.pro) == 0){
				for(let k = 0; k<fridge.length;k++){
					if(k == parseInt(queryObject.query.fnum)){
						fridge[k].num_items_accepted = parseInt(queryObject.query.num_items);
						fridge[k].can_accept_items = parseInt(queryObject.query.can_accept);
						for(let i = 0; i<fridge[k].items.length; i++){
							if(fridge[k].items[i].name ==  queryObject.query.Iname){
								fridge[k].items[i].quantity = parseInt(queryObject.query.quantity);
							}
						}
					}
				}
	
				// write the new object to the students.json file to save the data
				// send the new data back to the client
				file.writeFile('comm-fridge-data.json', JSON.stringify(fridge), function (writeError) {
				  if (writeError){
					console.log("There was an error writing to the students.json file.");
					throw err;
				  }
				});
			}else{
				let newItem = {
					name: queryObject.query.valN,
					type: queryObject.query.valT,
					img: queryObject.query.valI
				};
				items.push(newItem);
				// write the new object to the students.json file to save the data
				// send the new data back to the client
				file.writeFile('comm-fridge-items.json', JSON.stringify(items), function (writeError) {
				  if (writeError){
					console.log("There was an error writing to the students.json file.");
					throw err;
				  }
				});
			}
			

		});
	  }

    else if(request.url == "/index.html"){
	  file.readFile('index.html','utf8',function(err, contents){
		if(err){
		  response.writeHead(500,{"Content-type": "text/html"});
		  response.end();
		  return;
		}
		response.writeHead(200,{"Content-type": "text/html"});
		response.end(contents);
	  });
	}

	else if(request.url == "/drop.html"){
		file.readFile('drop.html','utf8',function(err, contents){
		  if(err){
			response.writeHead(500,{"Content-type": "text/html"});
			response.end();
			return;
		  }
		  response.writeHead(200,{"Content-type": "text/html"});
		  response.end(contents);
		});
	  }

	  else if(request.url == "/view_pickup.html"){
		file.readFile('view_pickup.html','utf8',function(err, contents){
		  if(err){
			response.writeHead(500,{"Content-type": "text/html"});
			response.end();
			return;
		  }
		  response.writeHead(200,{"Content-type": "text/html"});
		  response.end(contents);
		});
	  }

	else if(request.url == "/css/comm-fridge.css"){
	  file.readFile('comm-fridge.css','utf8',function(err, contents){
		if(err){
		  response.writeHead(500,{"Content-type": "text/css"});
		  response.end();
		  return;
		}
		response.writeHead(200,{"Content-type": "text/css"});
		response.end(contents);
	  });
	}
  
	
	else if(request.url == "/js/comm-fridge.js"){
	  file.readFile('comm-fridge.js','utf8',function(err, contents){
		if(err){
		  response.writeHead(500,{"Content-type": "application/javascript"});
		  response.end();
		  return;
		}
		response.writeHead(200,{"Content-type": "application/javascript"});
		response.end(contents);
	  });
	}
  

	else if(request.url == "/js/comm-fridge-data.js"){
	  file.readFile('comm-fridge-data.js','utf8',function(err, contents){
		if(err){
		  response.writeHead(500,{"Content-type": "application/javascript"});
		  response.end();
		  return;
		}
		response.writeHead(200,{"Content-type": "application/javascript"});
		response.end(contents);
	  });
	}
  
	
	else if(request.url == "/js/comm-fridge-data.json"){
	  file.readFile('comm-fridge-data.json','utf8',function(err, contents){
		if(err){
		  response.writeHead(500,{"Content-type": "application/javascript"});
		  response.end();
		  return;
		}
		fridge = JSON.parse(contents);
		response.writeHead(200,{"Content-type": "application/javascript"});
		response.end(contents);
	  });
	}

    else if(request.url == "/js/comm-fridge-items.json"){
        file.readFile('comm-fridge-items.json','utf8',function(err, contents){
          if(err){
            response.writeHead(500,{"Content-type": "application/javascript"});
            response.end();
            return;
          }
		  items = JSON.parse(contents);
          response.writeHead(200,{"Content-type": "application/javascript"});
          response.end(contents);
        });
      }

	else if(request.url.indexOf(".jpeg") > -1){
		let location = request.url;
		location = location.substr(1);
        file.readFile(location,function(err, contents){
          if(err){
            response.writeHead(500,{"Content-type": "image/jpeg"});
            response.end();
            return;
          }
          response.writeHead(200,{"Content-type": "image/jpeg"});
          response.end(contents);
        });
      }

	  else if(request.url.indexOf(".svg") > -1){
		let location2 = request.url;
		location2 = location2.substr(1);
        file.readFile(location2,function(err, contents){
          if(err){
            response.writeHead(500,{"Content-type": "image/svg+xml"});
            response.end();
            return;
          }
          response.writeHead(200,{"Content-type": "image/svg+xml"});
          response.end(contents);
        });
    }
  }
  //http://localhost:8000/index.html