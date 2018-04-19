let synaptic = require('synaptic');
let sync = require('synchronize');
const functions = require("./functions.js");

let numberOfPhases;
let neuronOutput = new synaptic.Neuron;
let neuronPhases = [];
console.log(neuronOutput);


sync.fiber(function() {
  numberOfPhases =  sync.await(functions.numberOfPhasesFunction(sync.defer()));
  numberOfPhases = numberOfPhases[0]['count(*)'];
  console.log(numberOfPhases);
  neuronPhase(numberOfPhases);
  console.log(neuronPhases);
});




function neuronPhase(numberOfPhases){
  let i = 0;
  while(i < numberOfPhases){
    neuronPhases.push(new synaptic.Neuron);
    neuronPhases[0].project(neuronOutput);
    i++;
  }
}
