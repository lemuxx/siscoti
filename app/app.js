//Incluye dependencias
const express = require('express');
const morgan = require('morgan');
const bodyParser =  require('body-parser');
//Inicializa express
const app = express();
//configuracion del puerto
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
//routes
require('./routes/clientRoutes')(app);
require('./routes/activityRoutes')(app);
require('./routes/phaseRoutes')(app);
require('./routes/proyectRoutes')(app);
require('./routes/activityProyectRoutes')(app);

app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
