import { Component, OnInit } from '@angular/core';
import { MusicAppService } from '../songs/music-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredArtists: any[];
  songs: any[];

  constructor(
    private musicAppService: MusicAppService
  ) { }

  ngOnInit(): void {
    this.musicAppService.getFeaturedArtists().subscribe(artists => {
      this.featuredArtists = artists;
    });
    this.musicAppService.getAllSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

}
