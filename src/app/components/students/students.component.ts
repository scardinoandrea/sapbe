import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import {AngularFireDatabase,AngularFireObject,AngularFireList} from 'angularfire2/database'
import {Observable, concat} from 'rxjs'
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NetworkService} from '../../services/network.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  searchText: any;
  searchTextModel: any;
  item:any;
  year1: any;
  year2: any;
  period: any;
  months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  tutor: any = {email: "none"};
  lastPercentage: any;
  student: any;
  studentKey: any;
  noteForm: FormGroup;
  modelForm: FormGroup;
  statusForm: FormGroup;
  reassignForm: FormGroup;
  currentAnnotation: any;
  tutorList: any=[]
  currentModel: any;
  currentInputs: Array<String> = [
    'Es ordenado y organizado',
    'Sus clases son de calidad',
    'Tiene apoyo de profesores',
    'Elabora guías de estudios',
    'Siente amor por su carrera',
    'Tiene dificultades con las materias',
    'Es planificado',
    'Tiene una buena relación social',
    'Tiene fuerza de voluntad',
    'Repasa y mantiene las materias al día',
    'Ha sufrido de estrés',
    'Es dedicado',
    'Tiene problemas económicos',
    'Interactua en clases'
  ];
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private auth: AuthService,
    public userService: UserService,
    private networkService: NetworkService,
    private fb: FormBuilder) { 
      this.noteForm = this.fb.group({
        date: ['', Validators.required ],
        type: ['', Validators.required ],
        content: ['',Validators.required],
      });
      let formControls ={}
      this.currentInputs.forEach(input=>{
        formControls[input.toString()] = [false, Validators.required ];
      })
      this.modelForm = this.fb.group(formControls);
      this.statusForm = this.fb.group({
        status: ['', Validators.required ],
      })
      this.reassignForm = this.fb.group({
        tutor_key: ['', Validators.required ],
      });
    }

  ngOnInit() {
    let id = Number(this.route.snapshot.params.id)
    this.db.list('/users/', ref=> ref.orderByKey().equalTo(this.auth.userKey)).valueChanges().subscribe(data=>{
      console.log("Tutor",data[0]['email'])
      this.tutor = data[0];
      //this.tutor.role = this.tutor.role.toString()
      console.log("Tutor2",this.tutor.role)
    })
    console.log("ID:",id)
    this.db.list("/users/").snapshotChanges().subscribe(data=>{
      data.map(c=>{
        let tutor:any = c.payload.val();
        this.tutorList.push({
          key: c.payload.key,
          name: tutor.username
        })
        console.log("datos,",this.tutorList)
      })
    })
    this.db.list("/students/", ref=> ref.orderByChild("personalId").equalTo(id)).snapshotChanges().subscribe(data=>{
      data.map(c=>{
        this.student = c.payload.val();
        this.studentKey = c.payload.key;
        this.annotations =[];
        this.model =[];
        this.db.list("/students/"+this.studentKey+"/notes").valueChanges().subscribe(data=>{
          this.annotations =[]; 
          data.forEach((note:any)=>{
              this.annotations.push(note);
            })
        })

        this.db.list("/students/"+this.studentKey+"/results").valueChanges().subscribe(data=>{
          this.model = [];
          data.forEach((result:any)=>{
            this.model.push(result)
            this.lastPercentage=result.percentage *100;
            console.log(this.lastPercentage);
          })

      })
      })
    })
  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].toString().toLowerCase().includes(searchKey.toLowerCase());
      });
    });
  }

  isAdmin(){
    return this.tutor? this.tutor.role.toString()=="admin": false;
  }
  search() {
    if (!this.searchText) {
      return this.annotations;
    }
    if (this.searchText) {
      return this.filterIt(this.annotations, this.searchText.toLowerCase());
    }
  }

  searchModel() {
    if (!this.searchTextModel) {
      return this.model;
    }
    if (this.searchTextModel) {
      return this.filterIt(this.model, this.searchTextModel.toLowerCase());
    }
  }

  getPeriod(date){
    if(parseInt(date.substring(5, 7))<=3){
      this.year1=parseInt(date.substr(2,4))-1;
      this.year2=parseInt(date.substr(2,4));
      this.period=2;
    }else if( parseInt(date.substring(5, 7))>3 && parseInt(date.substring(5, 7))<=6){
      this.year1=parseInt(date.substr(2,4))-1;
      this.year2=parseInt(date.substr(2,4));
      this.period=3;
    }else if( parseInt(date.substring(5, 7))>6 && parseInt(date.substring(5, 7))<=8){
      this.year1=parseInt(date.substr(2,4))-1;
      this.year2=parseInt(date.substr(2,4));
      this.period='I';
    }else if( parseInt(date.substring(5, 7))>8 && parseInt(date.substring(5, 7))<=12){
      this.year1=parseInt(date.substr(2,4));
      this.year2=parseInt(date.substr(2,4))+1;
      this.period=1;
    }
    return (""+this.year1+this.year2+'-'+this.period)
  }

  async saveNote(id){
    if(id== 'newNote'){
      let newNote = this.noteForm.value;
       console.log("nota",newNote) 
      this.db.list("/students/"+this.studentKey+"/notes/").push(newNote);
    }
  }

  async saveModelResult(id){
    if(id== 'newModelResult'){
      let newNote = this.modelForm.value;
      let characteristics="";
        console.log("model",newNote)
        let newArray=[];
        await this.currentInputs.forEach(input=>{
          if(newNote[input.toString()]){
            newArray.push(1);
            console.log("-->",input.toString())
            characteristics=characteristics.concat(input.toString()+",")
          }else{
            newArray.push(0);
          }
        }) 
        console.log("Array: "+newArray)
        console.log("Characteristic: "+characteristics)
        console.log("Resultado",this.networkService.evaluate(newArray));
        let result ={
          date: new Date().getFullYear()+"-"+ this.months[new Date().getMonth()]+"-"+ new Date().getDate() ,
          characteristics: characteristics,
          percentage: this.networkService.evaluate(newArray)[0]
        }
      this.db.list("/students/"+this.studentKey+"/results/").push(result);
      let lastPercentage = {
        percentage: result.percentage
      };
      this.db.list('/students/').update(this.studentKey,lastPercentage)
 
    }
  }

  updateStatus(id){
    var updates = [];
    console.log("Status",this.statusForm.value)
    this.db.list('/students/').update(this.studentKey,this.statusForm.value)
  }

  updateTutor(id){
    var updates = [];
    let tutor = this.tutorList.filter(tutor=>{
      if(tutor.key==this.reassignForm.value.tutor_key){
        return tutor;
      }
    })
    var newTutor = {
      tutor_key: this.reassignForm.value.tutor_key,
      tutor_name: tutor[0].name
    }
    console.log("Tutor_Key",this.reassignForm.value)
    this.db.list('/students/').update(this.studentKey,newTutor)
  }


  close(){
    this.modalService.dismissAll()
  }

  open(content,item,type) {
    if(type=='seeAnnotation'){
      console.log("Entre")
      this.currentAnnotation = item;
    }else if(type=='addAnnotation'){
      console.log("Add")
    }else if(type=='seeModel'){
      this.currentModel =item;
    }
    if(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  annotations=[
    {date: '20-01-2018',
    type: 'Correo',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Cita',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Correo',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Acuerdo',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Correo',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Reunion grupal',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
    {date: '20-01-2018',
    type: 'Correo',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    period: '1718-1'
    },
  ]

  model=[
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '70%',
    period: '1718-1'
    },
    {date: '20-01-2018',
    characteristics: 'caracteristica1, caracteristica2, caracteristica3',
    percentage: '100%',
    period: '1819-1'
    },
  ]
}
