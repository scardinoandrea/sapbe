import { Injectable } from '@angular/core';
import {Layer,Network,Architecture,Trainer,Neuron} from 'synaptic'
import {AngularFireDatabase,AngularFireObject,AngularFireList} from 'angularfire2/database'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({

    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImR1bW15QGV4YW1wbGUuY29tIiwidXNlcklEIjoiNWE4NzNiYmRiN2NiOTczZmNjMTA3NmEzIiwicGFzc3dvcmQiOiIkMmEkMTAkVFowRFdaSFUuNUdEVkNUS2dkYkVYZXNvam5sYzI4eU5pekt4WmlFd3Q1WktVNVg5TEUweDYiLCJwcm92aWRlciI6IkVtYWlsIiwiaWF0IjoxNTE4ODk1NzY1LCJleHAiOjE1MTg5Mzg5NjV9.Y70sCGgA1-DVCPondhu-L1u9RsmpId84zOASAX-V6vY'
})
}
class Item {
  input: Array<number>;
  output: Array<number>;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  inputLayer:Layer;
  hiddenLayer:Layer;
  outputLayer:Layer;
  network: Network;
  learningRate: number = 0.3;
  achitecture: Architecture;
  tranier: Trainer;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { 
  
    this.db.list('models').valueChanges().subscribe(architecture=>{
        console.log("arquitecture",architecture[0]);
        this.network = Network.fromJSON(architecture[0]);
        let result = this.network.activate([0,1,0,0,1,0,0]);
        console.log("Result:",result)
    })
    //this.network.fromJSON()
    //this.network = Network.fromJSON(exported);
  }

  trainingSet=
  [
  {input: [0,0,0,0] , output: [1]},
  ]

  trainingSet2=
  [
  {input: [0,0,0,0,0,1,0,0,0,0] , output: [1]},
  {input: [0,0,0,0,0,1,0,0,0,0] , output: [1]},
  {input: [1,0,0,0,0,0,0,0,1,0] , output: [1]},
  {input: [1,1,0,0,0,0,0,1,1,0] , output: [1]},
  
  {input: [1,1,1,0,0,0,1,0,1,1] , output: [1]},
  {input: [0,1,0,1,0,0,1,0,1,0] , output: [1]},
  {input: [1,1,0,1,0,0,0,0,1,1] , output: [1]},
  
  {input: [1,1,0,0,0,0,0,1,1,0] , output: [1]},
  {input: [0,1,0,0,0,0,1,0,1,0] , output: [1]},
  {input: [0,1,1,0,1,0,0,1,0,1] , output: [1]},
  {input: [0,1,0,0,0,0,0,0,1,0] , output: [1]},
  
  {input: [1,1,0,1,1,0,1,0,1,0] , output: [1]},
  {input: [0,1,0,0,1,0,0,0,1,0] , output: [1]},
  {input: [0,0,0,0,1,1,1,0,1,0] , output: [1]},
  
  {input: [0,0,1,0,1,1,1,0,1,0] , output: [1]},
  {input: [0,1,0,1,0,0,1,0,1,1] , output: [1]},
  {input: [0,0,0,0,0,1,0,0,0,0] , output: [1]},
  {input: [1,1,0,1,0,0,1,1,1,0] , output: [1]},
  
  {input: [0,0,0,0,0,1,1,0,1,0] , output: [1]},
  {input: [0,1,0,0,0,0,0,0,1,0] , output: [1]},
  {input: [1,1,1,0,0,0,1,0,1,0] , output: [1]},
  {input: [1,0,1,0,0,1,0,0,1,0] , output: [1]},
  {input: [1,1,0,0,0,0,0,0,1,0] , output: [1]},
  {input: [1,0,1,0,0,1,1,1,1,0] , output: [1]},
  {input: [0,1,0,0,1,0,1,1,1,0] , output: [1]},
  
  {input: [0,1,0,0,0,0,0,0,1,1] , output: [1]},
  {input: [1,0,0,0,0,1,0,1,1,1] , output: [1]},
  {input: [1,1,0,0,0,0,0,1,1,0] , output: [1]},
  
  {input: [1,1,0,1,1,0,0,1,1,0] , output: [1]},
  {input: [1,0,1,0,0,1,1,1,1,0] , output: [1]},
  {input: [0,1,0,0,0,0,0,0,1,1] , output: [0]},
  {input: [0,0,0,0,0,1,1,0,1,0] , output: [0]},
  {input: [0,1,0,0,1,0,0,0,1,0] , output: [0]},
  
  {input: [1,1,0,1,0,0,0,0,1,0] , output: [0]},
  {input: [0,1,0,0,0,0,0,0,1,0] , output: [0]},
  {input: [1,0,0,0,1,1,0,0,1,0] , output: [0]}
  ]
  
  validationSet = 
  [
  {input: [0,0,0,1,1,0,0,0,1,1] , output: [0]},
  {input: [1,1,0,0,0,0,0,0,1,0] , output: [0]},
  {input: [1,1,0,1,0,0,1,1,1,1] , output: [1]},
  {input: [0,1,1,0,1,0,0,0,1,0] , output: [1]},
  {input: [0,1,0,0,1,0,1,0,1,0] , output: [1]},
  {input: [1,1,0,0,1,0,0,1,1,0] , output: [1]},
  {input: [1,0,0,0,0,1,0,0,1,1] , output: [1]},
  {input: [0,1,1,1,0,0,0,0,0,0] , output: [1]},
  {input: [0,1,1,0,0,0,0,0,0,1] , output: [1]}
  ]
//ftp://puceftp.puce.edu.ec/Facultades/CienciasEducacion/Maestria/CienciasEducacion/Econom%C3%ADa%20de%20la%20Educaci%C3%B3n/Molera_Caballero.pdf
//https://scielo.conicyt.cl/scielo.php?script=sci_arttext&pid=S0718-33052016000400015
  entrenar(){
    console.log("Begin Training")
    for(let i=0;i<20000;i++){
      this.trainingSet.forEach(item=>{
        this.network.activate(item.input);
        this.network.propagate(this.learningRate,item.output);
      })
    }
    console.log("End Training")

    console.log("Informe de Entrenamiento");
    console.log("[0,0]")
    console.log(this.network.activate([0,0])); 
    //-> [0.015020775950893527]
    console.log("[0,1]")
    console.log(this.network.activate([0,1]));
    //->[0.9815816381088985]
    console.log("[1,0]")
    console.log(this.network.activate([1,0]));
    //-> [0.9871822457132193]
    console.log("[1,1]")
    console.log(this.network.activate([1,1]));
    //-> [0.012950087641929467]

  }

  create(config){

    this.inputLayer = new Layer(config.input);
    this.hiddenLayer = new Layer(config.hidden);
    this.outputLayer = new Layer(config.output)
    this.inputLayer.project(this.hiddenLayer);
    this.hiddenLayer.project(this.outputLayer);
    this.inputLayer.set({
      squash: Neuron.squash.TANH
    })
    this.hiddenLayer.set({
      squash: Neuron.squash.TANH
    })

    this.network = new Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer],
      output: this.outputLayer
    })
  }

 async entrenar2(){
    let trainer = new Trainer(this.network)
    console.log("Training ...");
    let training = await trainer.train(this.trainingSet2,{
      rate: 0.4,
      iterations: 5000,
      error: .05,
      shuffle: true,
      log: 10,
      cost: Trainer.cost.MSE 
    });
    console.log("Training:",training)
    return training;
  }

  async entrenar3(config){
    let trainer = new Trainer(this.network)
    console.log(config,"Training ...");
    let training = await trainer.train(this.trainingSet,{
      rate: config.learning_rate,
      iterations: config.iterations,
      error: config.error,
      shuffle: true,
      log: 10,
      cost: Trainer.cost.MSE 
    });

    console.log("Training:",training)
    return training;
  }

  evaluate(inputs){
    return this.network.activate(inputs);
  }

  evaluate2(inputs){  
    this.validationSet.forEach((item:Item) => {
      console.log("----------------------------------------")
      console.log("Input: "+item.input);
      console.log("Expected Output: "+item.output);
      let result = this.network.activate(item.input);
      console.log("Network Output "+result)
      console.log("----------------------------------------")
    });
  }


  export(){
    console.log("Export",JSON.stringify(this.network.toJSON()));
  }

  async predict(input){
    //let input = "0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    return new Promise( (resolve, reject) => {
      this.http.get(`https://pythonsvm.herokuapp.com?name=${input}`,httpOptions)
      .toPromise().then( (percentage) => {
        resolve(percentage);
      })
    });
  }

}
