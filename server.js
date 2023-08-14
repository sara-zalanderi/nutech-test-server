const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: true });
const port = process.env.PORT || 3001;
const allow = ["http://localhost:3000"];

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  //   res.header("Access-Control-Allow-Origin", allow);
  //   res.header("Access-Control-Allow-Headers", "*");
  next();
});
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: "accept, content-type",
};
server.use(cors(corsOptions));
server.use(router);

server.listen(port);
