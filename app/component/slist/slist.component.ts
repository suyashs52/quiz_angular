import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { Pagination } from '../../class/Pagination'
import { User } from '../../class/User'
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-slist',
  templateUrl: './slist.component.html',
  styleUrls: ['./slist.component.css']
}) 
export class SlistComponent implements OnInit {

  public pageForUser: Pagination;
  public user: User[] = [];
  modalHeader: string;
  modalpasssword: string;

  @ViewChild(HeaderComponent) header: HeaderComponent;
  constructor() { }

  ngOnInit() {
    this.initPagination();
    console.log(this.header.loader);
    this.getAllUser();
     
  }
  initPagination() {
    this.pageForUser = new Pagination();
    this.pageForUser.first = 1;
    this.pageForUser.cur = 1;
    this.pageForUser.last = 5;
    this.pageForUser.range = 5;
    this.pageForUser.callbackfunc = "pageForUserFn";
  }
  pageForUserFn(index: number, val: string) {
    switch (val) {
      case 'p': this.pageForUser.getPrev();
        this.getAllUser();
        break;
      case 'n': this.pageForUser.getNext();
        this.getAllUser();
        break;
      case 'm': this.pageForUser.getCurrent(index);
        this.getAllUser();
        break;
    }
  }

  userdetails(event) {

    let dom: any = document.querySelectorAll('a.nav-item');
    console.log(dom);
    
    for (let d = 0; d < dom.length; d++) {
      console.log(d);

      dom[d].className = "nav-item nav-link";
    }
    event.target.class = "nav-item nav-link active";
    this.getAllUser();

  }
  saveUser:User;
  edituserDetail(user: User) {
    this.modalHeader = "Edit " + user.name;
    console.log(user);
    this.saveUser=user;
   
    
  }
  saveuserDetail(){
    var date= formatDate(new Date(),'yyyy-MM-dd','en');
    var datatosend = {
      "id":this.saveUser.id,
      "username":  this.saveUser.username,
      "name":  this.saveUser.name,
      "credential": this.modalpasssword,
      "password": "Passwd@123",
      "phone":  this.saveUser.phone,
      "role":  this.saveUser.role,
      "createDate":date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.header.dataService.getData(datatosend, "updateuser").subscribe((resp) => {
      //loader=false
      this.header.handleSuccess("save successfully.");
    },
    error => {
      if(error=="OK"){
        this.header.handleSuccess("password changed successfully.");
      }else{
        this.header.handleError(error);
      }
    
      console.log(error);
      
    
    });
    this.modalpasssword="";
  }

  questionList(event) {
    let dom: any = document.querySelectorAll('a.nav-item');
    for (let d = 0; d < dom.length; d++) {
      console.log(d);

      dom[d].className = "nav-item nav-link";
    }
    event.target.class = "nav-item nav-link active";
    console.log(event.target);

  }

  getAllUser() {
    //this.pageForUser.cur-1
    //after data


    var datatosend = { "pageNo": 1 };


    this.header.error = "";
    this.header.loader = true;
    // this.header.dataService.getData(datatosend, "logins").subscribe(data => {
    // },
    // error => {
    //   this.handleError(error);
    // });
    this.header.dataService.getMtdData(datatosend, "users/" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      this.pageForUser.first = 1;
      this.pageForUser.cur = data["page"];
      this.pageForUser.last = data["count"];
      this.user = data["content"];
      console.log(this.user);

      this.header.loader = false;

    },
      error => {
        this.header.handleError(error);
        
      });
  }

}
