import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new Subject<User[]>();
  public users = this.userSubject.asObservable();

  private userList: User[] = [{id: 1, userName: 'usuario1.apellido1', mail: 'asd@asdsad.com', name: 'nombre1', lastName: 'apellido1', state: true },
  {id: 2, userName: 'usuario2.apellido2', mail: 'asd@asdsad.com', name: 'nombre2', lastName: 'apellido2', state: true },
  {id: 3, userName: 'usuario3.apellido3', mail: 'asd@asdsad.com', name: 'nombre3', lastName: 'apellido3', state: true },
  {id: 4, userName: 'usuario4.apellido4', mail: 'asd@asdsad.com', name: 'nombre4', lastName: 'apellido4', state: true },
  {id: 5, userName: 'usuario5.apellido5', mail: 'asd@asdsad.com', name: 'nombre5', lastName: 'apellido5', state: true },
  {id: 6, userName: 'usuario6.apellido6', mail: 'asd@asdsad.com', name: 'nombre6', lastName: 'apellido6', state: true },
  {id: 7, userName: 'usuario7.apellido7', mail: 'asd@asdsad.com', name: 'nombre7', lastName: 'apellido7', state: true },
  {id: 8, userName: 'usuario8.apellido8', mail: 'asd@asdsad.com', name: 'nombre8', lastName: 'apellido8', state: true },
  {id: 9, userName: 'usuario9.apellido9', mail: 'asd@asdsad.com', name: 'nombre9', lastName: 'apellido9', state: true },
  {id: 10, userName: 'usuario10.apellido10', mail: 'asd@asdsad.com', name: 'nombre10', lastName: 'apellido10', state: true },
  {id: 11, userName: 'usuario11.apellido11', mail: 'asd@asdsad.com', name: 'nombre11', lastName: 'apellido11', state: true },
  {id: 12, userName: 'usuario12.apellido12', mail: 'asd@asdsad.com', name: 'nombre12', lastName: 'apellido12', state: true },
  {id: 13, userName: 'usuario13.apellido13', mail: 'asd@asdsad.com', name: 'nombre13', lastName: 'apellido13', state: true },
  {id: 14, userName: 'usuario14.apellido14', mail: 'asd@asdsad.com', name: 'nombre14', lastName: 'apellido14', state: false },
];
  constructor(private http: HttpClient) { }

  getUsers(nameFilterValue?: string, emailFilterValue?: string, lastNameFilterValue?: string, stateFilterValue?: string) {
    let usersFiltered: User[] = this.userList;
    if(nameFilterValue || emailFilterValue || lastNameFilterValue || (stateFilterValue && parseInt(stateFilterValue) >= 0)) {
      usersFiltered = [];
      if(nameFilterValue) {
        usersFiltered.push(...this.userList.filter(user => user.name.indexOf(nameFilterValue) >= 0));
      }
      if(emailFilterValue) {
        usersFiltered.push(...this.userList.filter(user => user.mail.indexOf(emailFilterValue) >= 0));
      }
      if(lastNameFilterValue) {
        usersFiltered.push(...this.userList.filter(user => user.lastName.indexOf(lastNameFilterValue) >= 0));
      }
      if(stateFilterValue && parseInt(stateFilterValue) >= 0) {
        usersFiltered.push(...this.userList.filter(user => user.state === (parseInt(stateFilterValue) == 1)));
      }
    }
    this.userSubject.next(usersFiltered);
  }

  addUser(user: User):void{
    if (this.userList.length) {
      const lastIndex = this.userList.length - 1;
      user.id = this.userList[lastIndex].id + 1;
    } else {
      user.id = 1;
    }
    
    this.userList.push(user);
    this.userSubject.next(this.userList);
  }

  delUser(id:number):void{
      
    this.userList.forEach((usr, index) => {
      if(usr && usr.id === id){
        this.userList.splice(index, 1);
      }
    });
    this.userSubject.next(this.userList);
  }

  updateUser(user: User): void{
    this.userList.find((usr, index) => {
      if(usr.id === user.id){
        this.userList[index] = user;
      }
    });
    this.userSubject.next(this.userList);
  }
}
