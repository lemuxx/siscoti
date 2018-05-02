let synaptic = require('synaptic');
let sync = require('synchronize');
const functions = require("./functions.js");
let neuralNetworkModel = {};

let numberOfPhases, numberOfActivities;
let neuronOutput = new synaptic.Neuron;
neuronOutput.squash = synaptic.Neuron.squash.IDENTITY;
neuronOutput.bias = 0;
let neuronPhases = [], neuronActivities = [];

neuralNetworkModel.neuralNetwork = (neuralNetworkData, callback) => {
  sync.fiber(function() {
    numberOfPhases =  sync.await(functions.numberOfPhasesFunction(sync.defer()));
    numberOfPhases = numberOfPhases[0]['count(*)'];
    creationPhaseNeurons(numberOfPhases);

    numberOfActivities = sync.await(functions.numberOfActivitiesFunction(sync.defer()));
    creationActivityNeurons(numberOfActivities);
    activationActivityNeurons();
    activationPhaseNeurons();
    console.log(neuronOutput.activate());
    let n1 = new synaptic.Neuron;
    console.log(synaptic);
    //console.log(neuronActivities);
  });
};

function creationPhaseNeurons(numberOfPhases){
  let i = 0;
  while(i < numberOfPhases){
    neuronPhases.push(new synaptic.Neuron);
    neuronPhases[i].squash = synaptic.Neuron.squash.IDENTITY;
    neuronPhases[i].bias = 1;
    neuronPhases[i].project(neuronOutput);
    i++;
  }
}

function creationActivityNeurons(numberOfActivities){
  let i = 0;
  while(i < numberOfActivities.length){
    neuronActivities.push(new synaptic.Neuron);
    neuronActivities[i].squash = synaptic.Neuron.squash.IDENTITY;
    neuronActivities[i].bias = 1;
    neuronActivities[i].project(neuronPhases[numberOfActivities[i]['id_phase'] - 1]);
    i++;
  }
}
function activationActivityNeurons(){
  let i = 0;
  while(i < numberOfActivities.length){
    neuronActivities[i].project(neuronPhases[numberOfActivities[i]['id_phase'] - 1]).weight = 1; //Modificar
    neuronActivities[i].activate(2); //Modificar
    i++;
  }
}

function activationPhaseNeurons(){
  let i = 0;
  while (i < numberOfPhases) {
    neuronPhases[i].project(neuronOutput).weight = 1;
    neuronPhases[i].activate();
    neuronPhases[i];
    i++;
  }
}

module.exports = neuralNetworkModel;

/*
let n1 = new synaptic.Neuron;
let n2 = new synaptic.Neuron;
n1.squash = synaptic.Neuron.squash.IDENTITY;
n2.squash = synaptic.Neuron.squash.IDENTITY;
n1.activate(2);
n2.bias = 1;
n1.project(n2).weight = 4;
console.log(n2.activate());
*/
/*
Independiente
  -Fase
  -Actividad
  -Cliente
Nuevo proyecto
  -proyecto
    -Actividades
*/
