import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MusicAppService } from '../songs/music-app.service';
import { CreateEditPlaylistDialogComponent } from './create-edit-playlist-dialog/create-edit-playlist-dialog.component';
import * as moment from 'moment';
import { Playlist } from '../models/playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() height: string = '550px';
  @Input() displayCount: number = 10;
  playlists: Playlist[];

  constructor(
    private dialog: MatDialog,
    private musicAppService: MusicAppService
  ) {
    this.playlists = [];
  }

  ngOnInit(): void {
    this.musicAppService.getAllPlaylists().subscribe(playlists => {
      playlists.sort(playlist => {
        if (moment(playlist.lastModifiedDate).isBefore(moment(playlist.lastModifiedDate))) {
          return -1;
        } else if (moment(playlist.lastModifiedDate).isAfter(moment(playlist.lastModifiedDate))) {
          return 1;
        } else {
          return 0;
        }
      });
      this.playlists = [...playlists];
    });
  }

  addNewPlaylist(): void {
    this.dialog.open(CreateEditPlaylistDialogComponent, {})
      .afterClosed().subscribe(result => {
        if (result) {
          this.musicAppService.addPlaylist(result.title);
        }
      });
  }

  deletePlaylist(uuid: string) {
    this.musicAppService.deletePlaylist(uuid);
  }

  editPlaylist(playlist: any) {
    this.dialog.open(CreateEditPlaylistDialogComponent, {
      data: {
        playlist,
        mode: 'edit'
      }
    })
      .afterClosed().subscribe(result => {
        if (result) {
          this.musicAppService.renamePlaylist(result.id, result.title);
        }
      });
  }

}
