import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { Pagination } from '../../class/Pagination'
@Component({
  selector: 'app-slist',
  templateUrl: './slist.component.html',
  styleUrls: ['./slist.component.css']
})
export class SlistComponent implements OnInit {

  public pageForUser: Pagination;


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
  getAllUser() {
    //this.pageForUser.cur-1
    //after data
    // this.pageForUser.first=1;
    // this.pageForUser.cur=this.dataresp.data["currentpage"];
    // this.pageForUser.last=this.dataresp.data["pageCount"];

    var datatosend = {"pageNo":1};


    this.header.error = "";
    this.header.loader = true;
    this.header.dataService.getData(datatosend, "logins").subscribe(data => {
    },
    error => {
      this.handleError(error);
    });
    this.header.dataService.getMtdData(datatosend, "users/"+(this.pageForUser.cur-1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      this.header.loader = false;

    },
      error => {
        this.handleError(error);
      });
  }

  handleError(error: any) {
    this.header.loader = false;
    this.header.showError = false;
    console.log(error);
    this.header.showError = true;
    this.header.error = error;

    window.scroll(0, 0);
    setTimeout(() => {
      this.header.showError = false;

    }, 10000)


  }
}
