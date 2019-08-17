import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loader: boolean = false;
  error: string;
  showError: boolean;
  constructor(public dataService: DataService, private route: ActivatedRoute,
    private router: Router) { }
  getDataService: DataService;
  ngOnInit() {
    this.loader = true;
    this.getDataService = this.dataService;


  }

  logout() {
    this.dataService.logout();
    location.reload(true);
  }

}
