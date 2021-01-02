import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { noop, Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist.model';
import { AddSongsDialogComponent } from 'src/app/songs/add-songs-dialog/add-songs-dialog.component';
import { MusicAppService } from 'src/app/music-app.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit, OnDestroy {
  @Input() height: string = '550px';
  @Input() displayCount: number = 10;
  playlist: Playlist;
  songs: any[];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicAppService: MusicAppService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadSongsForPlaylist(params.get('uuid') as string);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadSongsForPlaylist(playlistId: string) {
    this.subscription = this.musicAppService.getAllPlaylists().subscribe(playlists => {
      if (!playlistId) {
        return;
      }
      this.playlist = playlists.find(playlist => playlist.id === playlistId) as Playlist;
      if (!this.playlist) {
        this.router.navigateByUrl('/playlists');
      } else if (Object.keys(this.playlist).length === 0) {
        noop;
      } else {
        this.songs = this.musicAppService.getSongsByIds(this.playlist.songs);
      }
    });
  }

  addSongs() {
    this.dialog.open(AddSongsDialogComponent,
      {
        width: '800px', height: '600px',
        data: { playlist: this.playlist }
      })
      .afterClosed().subscribe(result => {
        if (result) {
        }
      });
  }

  removeSongFromPlaylist(songId: number) {
    const isSuccess = this.musicAppService.removeSongFromPlaylist(this.playlist.id, songId);
    this.loadSongsForPlaylist(this.playlist.id);
    if (isSuccess) {
      this.snackBar.open(`removed song from ${this.playlist.title}`, undefined, { duration: 1000 });
    } else {
      this.snackBar.open(`failed to remove song from ${this.playlist.title}`, undefined, { duration: 1500 });
    }
  }

  shuffleSongs() {
    this.songs = this.songs.sort(this.randomSortFunc);
    this.songs = [...this.songs];
    this.musicAppService.playSongs(this.songs.map(song => song.id));
  }

  randomSortFunc() {
    const values = [-1, 0, 1];
    const randomInteger = Math.floor(Math.random() * 3)
    return values[randomInteger];
  }

}
