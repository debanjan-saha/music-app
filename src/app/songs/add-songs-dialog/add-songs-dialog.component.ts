import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist } from 'src/app/models/playlist.model';
import { MusicAppService } from '../music-app.service';

@Component({
  selector: 'app-add-songs-dialog',
  templateUrl: './add-songs-dialog.component.html',
  styleUrls: ['./add-songs-dialog.component.scss']
})
export class AddSongsDialogComponent implements OnInit {
  playlist: Playlist;
  songs: any[];
  searchString: string;

  constructor(
    public dialogRef: MatDialogRef<AddSongsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private musicAppService: MusicAppService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.playlist = this.data.playlist;
  }

  onDismiss() {
    this.dialogRef.close();
  }

  addSongToPlaylist(songId: any) {
    const isSuccess = this.musicAppService.addSongToPlaylist(this.playlist.id, songId);
    if (isSuccess) {
      this.snackBar.open(`added to ${this.playlist.title}`, undefined, { duration: 1000 });
    } else {
      this.snackBar.open(`failed to add to ${this.playlist.title}`, undefined, { duration: 1500 });
    }
  }

}
