import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-edit-playlist-dialog',
  templateUrl: './create-edit-playlist-dialog.component.html',
  styleUrls: ['./create-edit-playlist-dialog.component.scss']
})
export class CreateEditPlaylistDialogComponent implements OnInit {
  headerTitle: string = 'Create New Playlist';
  playlistName: string = '';
  constructor(public dialogRef: MatDialogRef<CreateEditPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data && this.data.mode === 'edit') {
      this.headerTitle = 'Edit Playlist';
      this.playlistName = this.data.playlist.title;
    }
  }

  onDismiss() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.playlistName.trim().length === 0) {
      this.snackBar.open('Playlist name cannot be empty', 'Dismiss', { duration: 3000 });
    } else {
      if (this.data && this.data.mode === 'edit') {
        this.dialogRef.close({ id: this.data.playlist.id, title: this.playlistName });
      } else {
        this.dialogRef.close({ title: this.playlistName });
      }
    }
  }

}
