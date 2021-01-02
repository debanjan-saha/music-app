import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, noop, Observable, of, Subject } from 'rxjs';
import { map, retry, shareReplay, tap } from 'rxjs/operators';
import { Playlist } from './models/playlist.model';
import * as uuid from 'uuid';
import { Song } from './models/song.model';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

@Injectable({ providedIn: 'root' })
export class MusicAppService {
  private playlists: Playlist[];
  public playListsSubject: BehaviorSubject<Playlist[]>;
  public mediaPlayerSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.playlists = [
      { id: uuid.v4(), title: 'Friday Night Chill Hits', lastModifiedDate: new Date(), songs: [1, 2] },
      { id: uuid.v4(), title: 'Workout Hits 2020', lastModifiedDate: new Date(), songs: [3] },
      { id: uuid.v4(), title: 'Meditational Mix', lastModifiedDate: new Date(), songs: [1, 4, 5] }
    ];
    const playlists = localStorage.getItem('playlists');
    if (playlists !== null) {
      this.playlists = JSON.parse(playlists);
    }
    this.playListsSubject = new BehaviorSubject(this.playlists);
    this.mediaPlayerSubject = new BehaviorSubject({ id: 1, title: 'Dance Basanti', artist: 'Keysha' });
    this.getAllSongs().subscribe(noop);
  }

  playSong(song: any) {
    this.mediaPlayerSubject.next({ id: song.id, title: song.title, artist: song.title.slice(0, 5)});
  }

  listenForCurrentTrackChanges() {
    return this.mediaPlayerSubject.asObservable();
  }


  getAllSongs(): Observable<Song[]> {
    const songs = localStorage.getItem('songs');
    if (songs === null) {
      return this.http.get<Song[]>(`${BASE_URL}/photos`).pipe(
        tap(songs => localStorage.setItem('songs', JSON.stringify(songs))),
        shareReplay()
      );
    } else {
      return of(JSON.parse(songs));
    }
  }

  getFeaturedArtists(): Observable<any[]> {
    const artists = localStorage.getItem('artists');
    if (artists === null) {
      return this.http.get<any>(`${BASE_URL}/users`).pipe(
        map((artists: any[]) => {
          return artists.map(artist => {
            return {
              title: artist.name,
              subtitle: '5.6M'
            }
          })
        }),
        tap(artists => localStorage.setItem('artists', JSON.stringify(artists)))
      );
    } else {
      return of(JSON.parse(artists));
    }
  }

  getUserDetails() {
    const user = localStorage.getItem('user');
    if (user === null) {
      return this.http.get<any>('https://randomuser.me/api/').pipe(
        map(response => response.results[0]),
        retry(3),
        tap(user => localStorage.setItem('user', JSON.stringify(user)))
      );
    } else {
      return of(JSON.parse(user));
    }
  }

  getAllPlaylists() {
    return this.playListsSubject.asObservable();
  }

  addPlaylist(title: string) {
    this.playlists.splice(0, 0, { id: uuid.v4(), title, songs: [], lastModifiedDate: new Date() });
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
    this.playListsSubject.next(this.playlists);
  }

  deletePlaylist(id: string) {
    this.playlists = this.playlists.filter(playlist => playlist.id !== id);
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
    this.playListsSubject.next(this.playlists);
  }

  renamePlaylist(id: string, name: string) {
    this.playlists = this.playlists.map(playlist => {
      if (playlist.id === id) {
        playlist.title = name;
        playlist.lastModifiedDate = new Date();
      }
      return playlist;
    });
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }

  getSongsByIds(uuids: number[]) {
    const songs = localStorage.getItem('songs');
    if (songs !== null) {
      return JSON.parse(songs).filter((song: any) => uuids.includes(song.id));
    }
  }

  addSongToPlaylist(playlistId: string, song: any) {
    const index = this.playlists.findIndex(playlist => playlist.id === playlistId);
    if (index !== -1) {
      if (this.playlists[index].songs.includes(song.id)) {
        return false;
      }
      this.playlists[index].songs.push(song.id);
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
      this.playListsSubject.next(this.playlists);
      return true;
    } else {
      return false;
    }
  }

  removeSongFromPlaylist(playlistId: string, songId: any) {
    const index = this.playlists.findIndex(playlist => playlist.id === playlistId);
    if (index !== -1) {
      this.playlists[index].songs.splice(index, 1);
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
      return true;
    } else {
      return false;
    }
  }
}


