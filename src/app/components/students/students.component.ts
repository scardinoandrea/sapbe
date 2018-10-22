import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  searchText: any;
  lastPercentage: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

  open(content) {
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
