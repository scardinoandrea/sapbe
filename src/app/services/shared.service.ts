import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  currentUser = new EventEmitter<any>();

  constructor() { }
}
