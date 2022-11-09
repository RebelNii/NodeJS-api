const http = require("http");

const fs = require("fs");

const fss = require("fs").promises;

const path = require("path");

//require func created in log file
const LogEvents = require("./logEvents");

//instantiate event core module into const
const eventEmitter = require("events"); //common core module

//create a class the inherits core event module props
class MyEventEmitter extends eventEmitter {}

//create new instance on class inheritance
const emit = new MyEventEmitter();

emit.on("myLogs", (msg, fileName) => LogEvents(msg,fileName));

const port = process.env.PORT || 3050;

let serveFunc = async (filepath, contentType, response) => {
    try{
        const rawData = await fss.readFile(filepath,
            !contentType.includes("image") ? 'utf-8' : ''
        )
        const data = contentType === "application/json" ? JSON.parse(rawData) : rawData
        console.log(contentType)
        response.writeHead(
            filepath.includes("404.html") ? 404 : 200, 
            {"Content-Type": contentType});
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    }catch(err){
        console.log(err);
        emit.emit("myLogs", `${err.name}\t${err.message}`, 'errorsLog.txt');
        response.statusCode = 500;//server error
        response.end();
    }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emit.emit("myLogs", `${req.url}\t${req.method}`, 'requestLog.txt');
//   let urlpath;

  // if(req.url === '/' || req.url === 'index.html'){
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'text/html')
  //     urlpath = path.join(__dirname, 'views', 'index.html')
  //     fs.readFile(urlpath,'utf-8',(err,data)=>{
  //         res.end(data)
  //     })
  // }

  //use extention type to set contentType value
  const ext = path.extname(req.url);
  let contentType;

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
      break;
  }

  let filepath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //this makes .html not required in browser
  if (!ext && req.url.slice(-1) != "/") filepath += ".html";

  const fileExist = fs.existsSync(filepath);

  if (fileExist) {
    //serve browser
    serveFunc(filepath,contentType,res)
  } else {
    console.log(path.parse(filepath));
    switch (path.parse(filepath).base) {
      case "old-page.html":
        res.writeHead(301, {'Location': '/newP.html'})
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, {'Location': '/'})
        res.end();
        break;
      default:
        serveFunc(path.join(__dirname, "views", "404.html"),"text/html",res)
        break;
    }
  }
});

//listener an event
// emit.on("myLogs", (msg) => LogEvents(msg));

// //we dnt need the timeout but oh well
// emit.emit("myLogs", "\n I did it");

// setTimeout(()=>{
//     emit.emit("myLogs", "\n I did it")
// }, 2000)

server.listen(port, () => {
  console.log(`Server: ${port}`);
});
