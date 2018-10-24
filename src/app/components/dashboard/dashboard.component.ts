import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase,AngularFireObject,AngularFireList} from 'angularfire2/database'
import {AuthService} from '../../services/auth.service'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { query } from '@angular/core/src/render3/query';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NetworkService} from  '../../services/network.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  today = new Date();
  year1: any;
  year2: any;
  period: any;
  searchText: any;
  tutor: any = {email: "taco"};
  studentForm: FormGroup;
  tutorList: any=[];

  constructor(
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private fb: FormBuilder,
    private network : NetworkService) {
    
      this.studentForm = this.fb.group({
        name: ['', Validators.required ],
        type: ['', Validators.required ],
        personalId: ['',Validators.required],
        period: ['', Validators.required ],
        tutor_key: ['', Validators.required ],
        status: ['', Validators.required ]
      });
    }

  ngOnInit() {
    this.getPeriod();
    this.db.list('/users/', ref=> ref.orderByKey().equalTo(this.auth.userKey)).valueChanges().subscribe(data=>{
      console.log("Tutor",data[0]['email'])
      this.tutor = data[0];
      console.log("Tutor2",this.tutor.role)
    })
      this.students = []
        this.db.list('/students', ref => ref.orderByChild('tutor_key').equalTo(this.auth.userKey)).valueChanges().subscribe(students=>{
          this.students = [];
          students.forEach(data=>{
            let newStudent = {
              id: data['personalId'],
              name: data['name'],
              type: data['type'],
              tutor: data['tutor_name'],
              percentage: data['percentage']
            }
            console.log("Estudiante:",data)
            this.students.push(newStudent)
          })

        })

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
  }
  getPeriod(){
    if(this.today.getMonth()<=2){
      this.year1=this.today.getFullYear()-1;
      this.year2=this.today.getFullYear();
      this.period=2;
    }else if( this.today.getMonth()>2 && this.today.getMonth()<=5){
      this.year1=this.today.getFullYear()-1;
      this.year2=this.today.getFullYear();
      this.period=3;
    }else if( this.today.getMonth()>5 && this.today.getMonth()<=7){
      this.year1=this.today.getFullYear()-1;
      this.year2=this.today.getFullYear();
      this.period='I';
    }else if( this.today.getMonth()>7 && this.today.getMonth()<=11){
      this.year1=this.today.getFullYear();
      this.year2=this.today.getFullYear()+1;
      this.period=1;
    }
    this.year1=this.year1.toString().substr(-2);
    this.year2=this.year2.toString().substr(-2);
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
      return this.students;
    }
    if (this.searchText) {
      return this.filterIt(this.students, this.searchText.toLowerCase());
    }
  }

 

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  close(){
    console.log("closed")
  }

  async saveData(id){
    if(id== 'newStudent'){
      let newStudent = this.studentForm.value;
      newStudent['tutor_name'] = await this.getName(newStudent.tutor_key)
      console.log("student",newStudent) 
      this.db.list("/students/").push(newStudent);
    }
  }

  async getName(key){
    let tutor = await this.tutorList.filter(data=>{
      if(data.key==key) 
        return data
    });
    return tutor[0]["name"]
  }

  students=[
    {id: '26510233',
    name: 'Andrea Scardino',
    type: 'Académica',
    tutor: 'Anais Guillen',
    percentage: '100%'
    },
    {id: '22222',
    name: 'Pedro Perez',
    type: 'Artistica',
    tutor: 'Manuel Perez',
    percentage: '70%'
    },
    {id: 'prueba',
    name: 'prueba',
    type: 'prueba',
    tutor: 'prueba',
    percentage: 'prueba'
    },
    {id: 'prueba',
    name: 'prueba',
    type: 'prueba',
    tutor: 'prueba',
    percentage: 'prueba'
    },
    {id: 'prueba',
    name: 'prueba',
    type: 'prueba',
    tutor: 'prueba',
    percentage: 'prueba'
    },
    {id: 'prueba',
    name: 'prueba',
    type: 'prueba',
    tutor: 'prueba',
    percentage: 'prueba'
    },
    {id: 'prueba',
    name: 'prueba',
    type: 'prueba',
    tutor: 'prueba',
    percentage: 'prueba'
    }
  ]
}
