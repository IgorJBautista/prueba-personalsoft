import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../modal/data/dialog.data';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  emailPattern: RegExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);

  constructor(public dialogRef: MatDialogRef<UserCreateComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {      
      this.userForm = this.formBuilder.group({
        id: [''],
        mail: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
        userName: ['', [Validators.required, Validators.minLength(20)]],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        state: [true, [Validators.required]]
      });
     }

  ngOnInit(): void {
    if (this.data.user && this.data.user.id) {
      if(this.data.viewMode) {
        this.userForm = new FormGroup({
          id: new FormControl({value: '', disabled: true}),
          mail: new FormControl({value: '', disabled: true}),
          userName: new FormControl({value: '', disabled: true}),
          name: new FormControl({value: '', disabled: true}),
          lastName: new FormControl({value: '', disabled: true}),
          state: new FormControl({value: '', disabled: true})
        });
      }
      this.userForm.patchValue(this.data.user);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {    
    if(this.data && this.data.user && this.data.user.id){
      this.userService.updateUser(this.userForm.value);
    } else {
      this.userService.addUser(this.userForm.value);
    }
    this.onClose();
  }

  errorHandling (control: string, error: string): boolean {
    return this.userForm.controls[control].hasError(error);
  }

}
