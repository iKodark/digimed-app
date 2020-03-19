import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { UsersListService } from './services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(
    public usersListService: UsersListService
  ) { }

  ngOnInit(): void {

    this.usersListService.getUsers(8).subscribe((clients) => {
      
      console.log(clients);
    });;
  }

}