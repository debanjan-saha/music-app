import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicAppService } from './songs/music-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: Observable<any>;

  constructor(private musicAppService: MusicAppService) { }

  ngOnInit() {
    this.musicAppService.getUserDetails().subscribe((user: any) => this.user = user);
  }
}
