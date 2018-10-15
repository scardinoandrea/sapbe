import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getPeriod();
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
