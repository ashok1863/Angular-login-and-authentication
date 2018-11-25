
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { Global } from '../Shared/global';
import { DBOperation } from '../Shared/enum';
import { IUser} from '../Models/user.model';
import { FormBuilder, Validators   } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import {NgbModal, ModalDismissReasons,} from '@ng-bootstrap/ng-bootstrap';

import {NgForm} from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';

@Component({   
    selector:'user-list',
    templateUrl: '/user.component.html',
    providers: [UserService]

})
export class UserComponent implements OnInit {

    @ViewChild('userTemplate') userTemplate: TemplateRef<any>;

    indLoading: boolean = false;
    users: IUser[];
    user: IUser;
    msg: string;
  //  @ViewChild('modal') modal: BsModalComponent ;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    constructor(private fb: FormBuilder,private _userService: UserService,private modalService: NgbModal) { 
        
    }

    ngOnInit(): void {
        //  this.userFrm = new FormGroup({
        //     Id: new FormControl(),
        //     FirstName:new FormControl(),
        //     LastName:new FormControl(),
        //     Gender:new FormControl()
        // });
        this.userFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: [''],
            Gender: ['', Validators.required]
        });
        this.LoadUsers();
    }


    LoadUsers(): void {
        this.indLoading = true;
        this._userService.get(Global.baseuri)
            .subscribe(users => { this.users = users; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addUser(content) {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
       

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
    }
    // addTemplateUser() {
 
    //     return this.userTemplate;
    // }
    deleteUser(content,id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
           

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
    }
    editUser(content,id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
       
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
    }
    onSubmit(userFrm: NgForm) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._userService.post(Global.baseuri, userFrm.value).subscribe(
                    data => {
                        if (data == 1) {
                            this.msg = "Data successfully inserted.";
                            this.LoadUsers();
                        } else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                       // this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.baseuri, userFrm.value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                       // this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._userService.put(Global.baseuri, userFrm.value.Id, userFrm.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                       // this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
        }
    }




    SetControlsState(isEnable: boolean) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
    closeResult: string;
    
     
    
    //   open(content) {
    //     this.modalService.open(content).result.then((result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    //   }
    
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
}