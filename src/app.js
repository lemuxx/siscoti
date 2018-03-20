//Incluye dependencias
const express = require('express');
const morgan = require('morgan');
const bodyParser =  require('body-parser');

//Inicializa express
const app = express();

//configurackion del puerto
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
require('./routes/clientRoutes')(app);

app.listen(app.get('port'), () => {
	console.log('server on port 3000');
});
