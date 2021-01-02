import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { MusicAppService } from './music-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private musicAppService: MusicAppService) { }

  ngOnInit() {
    this.musicAppService.getUserDetails().subscribe((user: User) => this.user = user);
  }
}
