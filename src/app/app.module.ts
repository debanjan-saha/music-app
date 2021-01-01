import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CreateEditPlaylistDialogComponent } from './playlists/create-edit-playlist-dialog/create-edit-playlist-dialog.component';
import { FormsModule } from '@angular/forms';
import { PlaylistDetailsComponent } from './playlists/playlist-details/playlist-details.component';
import { AddSongsDialogComponent } from './songs/add-songs-dialog/add-songs-dialog.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    HomeComponent,
    PlaylistsComponent,
    SidebarComponent,
    CreateEditPlaylistDialogComponent,
    PlaylistDetailsComponent,
    AddSongsDialogComponent,
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ScrollingModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
