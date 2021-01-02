import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { MusicAppService } from '../music-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredArtists: any[];
  songs: any[];

  subscription: Subscription;

  constructor(
    private musicAppService: MusicAppService
  ) { }

  ngOnInit(): void {
    this.subscription = forkJoin([this.musicAppService.getFeaturedArtists(), this.musicAppService.getAllSongs()]).subscribe(response => {
      this.featuredArtists = response[0];
      this.songs = response[1];
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
