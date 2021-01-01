import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MusicAppService } from '../songs/music-app.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  song: any;
  isPlaying: boolean;

  constructor(
    private musicAppService: MusicAppService
  ) {
    this.isPlaying = true;
  }

  ngOnInit(): void {
    this.musicAppService.listenForCurrentTrackChanges()
      .pipe(tap(() => this.isPlaying = true))
      .subscribe(song => this.song = { ...song });
  }

}
