import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import {AngularFireDatabase,AngularFireObject,AngularFireList} from 'angularfire2/database'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NetworkService} from '../../services/network.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  searchText: any;
  lastPercentage: any;
  student: any;
  studentKey: any;
  noteForm: FormGroup;
  modelForm: FormGroup;
  statusForm: FormGroup;
  currentAnnotation: any;
  currentInputs: Array<String> = ['Es ordenado y organizado','Sus clases son de calidad','Tiene apoyo de profesores','Elabora guías de estudios','Siente pasión por su carrera','Tiene dificultades con las materias','Es planificado']
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
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
    }

  ngOnInit() {
    let id = Number(this.route.snapshot.params.id)
    console.log("ID:",id)
    // this.db.list("/students/", ref=> ref.orderByChild("personalId").equalTo(id)).valueChanges().subscribe(student=>{
    //   this.student = student[0];
    //   console.log("student",student)
    // })
    this.db.list("/students/", ref=> ref.orderByChild("personalId").equalTo(id)).snapshotChanges().subscribe(data=>{
      data.map(c=>{
        this.student = c.payload.val();
        this.studentKey = c.payload.key;
        this.annotations =[];
        
        this.db.list("/students/"+this.studentKey+"/notes").valueChanges().subscribe(data=>{
            data.forEach((note:any)=>{
              this.annotations.push(note);
            })
        })
      })
    })

    this.lastPercentage=this.model[this.model.length - 1].percentage;
    console.log(this.model[this.model.length - 1]);
  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].toString().toLowerCase().includes(searchKey.toLowerCase());
      });
    });
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
    if (!this.searchText) {
      return this.model;
    }
    if (this.searchText) {
      return this.filterIt(this.model, this.searchText.toLowerCase());
    }
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
            characteristics.concat(input.toString()+",")
          }else{
            newArray.push(0);
          }
        }) 
        console.log("Array: "+newArray)
        console.log("Characteristic: "+characteristics)
        console.log("Resultado",this.networkService.evaluate(newArray));
        let result ={
          date: new Date(),
          characteristics: characteristics,
          result: this.networkService.evaluate(newArray)
        }
     // this.db.list("/students/"+this.studentKey+"/results/").push(result);
    }
  }

  updateStatus(id){
    var updates = [];
    console.log("Status",this.statusForm.value)
    this.db.list('/students/').update(this.studentKey,this.statusForm.value)
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
