const neural = require('../models/neuralNetwork');

module.exports = function (app){
  app.post('/neuralnetwork', (req, res) => {
    const neuralNetworkData = {

    }
    neural.neuralNetwork(neuralNetworkData, (err, data) => {

    });
  });
}
