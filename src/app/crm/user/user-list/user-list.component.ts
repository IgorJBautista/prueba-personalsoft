import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { User } from '../../model/user';
import { UserService } from '../../user.service';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  
  subscription: Subscription;
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['userName', 'mail', 'name', 'lastName', 'state', 'actions'];

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 
  constructor(private userService: UserService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.subscription = this.userService.users.subscribe(
      (user: User[]) => {
        this.dataSource = new MatTableDataSource(user);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.userService.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addUser():void {
    const dialogRef = this.dialog.open(UserCreateComponent, {width: '50%', data: {viewMode: false}});
  }

  updateUser(user: User):void {
    const dialogRef = this.dialog.open(UserCreateComponent, {width: '50%', data: {user, viewMode: false }});
  }
  
  viewUser(user: User):void {
    const dialogRef = this.dialog.open(UserCreateComponent, {width: '50%', data: {user, viewMode: true}});
  }

  delUser(user: User){  
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(parseInt(result) === 1) {
        this.userService.delUser(user.id)
      }
    }).unsubscribe();
  }

  applyFilters(userNameFilter: HTMLInputElement, emailFilter: HTMLInputElement, nameFilter: HTMLInputElement, lastNameFilter: HTMLInputElement, stateFilter: MatSelect) {
    const nameFilterValue = userNameFilter.value;
    const emailFilterValue = emailFilter.value;
    const lastNameFilterValue = lastNameFilter.value;
    const stateFilterValue = stateFilter.value;
    this.userService.getUsers(nameFilterValue, emailFilterValue, lastNameFilterValue, stateFilterValue);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
