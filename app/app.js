//Incluye dependencias
const express = require('express');
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const cors = require('./cors');
//Inicializa express
const app = express();
//configuracion del puerto
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors.permission)
//routes
require('./routes/clientRoutes')(app);
require('./routes/activityRoutes')(app);
require('./routes/phaseRoutes')(app);
require('./routes/projectRoutes')(app);
require('./routes/activityProjectRoutes')(app);
require('./routes/neuralNetworkRoutes')(app);
require('./routes/userRoutes')(app);

app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
