import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MusicAppService } from '../music-app.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  song: any;
  isPlaying: boolean;
  subscription: Subscription;

  constructor(
    private musicAppService: MusicAppService
  ) {
    this.isPlaying = true;
  }

  ngOnInit(): void {
    this.subscription = this.musicAppService.listenForCurrentTrackChanges()
      .pipe(tap(() => this.isPlaying = true))
      .subscribe(song => this.song = { ...song });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
