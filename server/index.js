const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { ParseServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');
const path = require('path');

const DEV = process.env.NODE_ENV !== 'production';

//---- port ----//
const port = 1337;

// ------------------------------------------------------------------------- //
// ------------------------ envvars initialisation ------------------------- //
// ------------------------------------------------------------------------- //
let envFileName;
if (DEV) {
  envFileName = '.env.local';
} else {
  envFileName = '.env.prod';
} 

dotenv.config({ path: path.join(__dirname, envFileName) });

const init = () => {
  const DB_URL = process.env.DBURL;

  // ------------------------------------------------------------------------- //
  // ------------------------ parse server initialisation -------------------- //
  // ------------------------------------------------------------------------- //

  // //------------------------------- server ------------------------------- //
	// . used by CLoud Code
	// . it's always http. works with the https redirection (see below)
	const serverURL = 'http://localhost:' + port + '/parse';  
  const APP_NAME = 'Mika';

  const parseServerAPI = new ParseServer({
    databaseURI: DB_URL,
    cloud: path.resolve(__dirname, 'cloud/main.js'),
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL,
    appName: APP_NAME,
  });

  // ------------------------------- deshboard ------------------------------- //
  const dashboard = new ParseDashboard({
    apps: [
      {
        serverURL,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: APP_NAME,
      },
    ],
    users: [
      {
        user: process.env.DASHBOARD_USER,
        pass: process.env.DASHBOARD_PASSWORD,
        apps: [{ appId: process.env.APP_ID }],
      },
    ],
  });

  // ------------------------------------------------------------------------- //
  // ------------------------------- express app ----------------------------- //
  // ------------------------------------------------------------------------- //
  const app = express();

  //---------------------//
  //----- bodyParse -----//
  //---------------------//
  // IMPORTANT : it should be at the begin
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  //--------------------------//
	//---- https forwarding ----//
	//--------------------------//
	if (!DEV) {
		app.use(function (req, res, next) {
			if ((req.get('X-Forwarded-Proto') === 'http') && !req.get('X-Coovz-Key')) { // returns false it didn't go though the firewalls (eg: local call)
				res.redirect('https://' + req.get('Host') + req.url);
			} else {
				next();
			}
		});
	}

  //---------------------------------//
  //----- connectionMiddleware ------//
  //---------------------------------//
  const checkFromRestAPI = async (req, res, next) => {
    // NOTE : The token will be sent in all the following requests in the form of a Bearer Token
    try {
      const apiKey = req.get('X-Mika-Key');
      if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 403, message: 'Access denied.' })
      }

      next();
    } catch (e) {
      console.log(e.message);
      return res.status(400).json({ error: 400, message: 'Bad request' });
    }
  };

  // ---- parse in express ----//
  app.use('/parse', parseServerAPI);
  if (DEV) {
    app.use('/dashboard', dashboard);
  }

  //------------------------//
  //---- Error handling ----//
  //------------------------//
  app.use(function (err, req, res, next) {
    // Do logging and user-friendly error message display
    console.error(err);
    res.status(500).send(err.message);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Server listening at http://localhost:${port} as ${
        DEV ? 'development' : process.env.NODE_ENV
      }`,
    );
  });
}

init();