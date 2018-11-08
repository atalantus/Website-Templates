import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public accountService: AccountService) {
  }

  ngOnInit() {
  }

}
