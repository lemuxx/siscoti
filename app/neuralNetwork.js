let synaptic = require('synaptic');
let sync = require('synchronize');
const functions = require("./functions.js");

let numberOfPhases;
let neuronOutput = new synaptic.Neuron;
neuronOutput.squash = synaptic.Neuron.squash.IDENTITY;
neuronOutput.bias = 1;
let neuronPhases = [];


sync.fiber(function() {
  numberOfPhases =  sync.await(functions.numberOfPhasesFunction(sync.defer()));
  numberOfPhases = numberOfPhases[0]['count(*)'];
  neuronPhase(numberOfPhases);
  //console.log(neuronPhases);
  console.log(neuronOutput);s
});

function neuronPhase(numberOfPhases){
  let i = 0;
  while(i < numberOfPhases){
    neuronPhases.push(new synaptic.Neuron);
    neuronPhases[i].squash = synaptic.Neuron.squash.IDENTITY;
    neuronPhases[i].activate();
    neuronPhases[i].bias = 1;
    neuronPhases[i].project(neuronOutput);
    i++;
  }
}
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
