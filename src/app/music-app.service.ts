import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, noop, Observable, of, Subject, timer } from 'rxjs';
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
    this.initializePlaylists();
    this.playListsSubject = new BehaviorSubject(this.playlists);
    this.mediaPlayerSubject = new BehaviorSubject({ id: 1, title: 'Dance Basanti', artist: 'Keysha' });
    this.getAllSongs().subscribe(noop);
  }

  private initializePlaylists() {
    this.playlists = [
      { id: uuid.v4(), title: 'Friday Night Chill Hits', lastModifiedDate: new Date(), songs: [1, 2] },
      { id: uuid.v4(), title: 'Workout Hits 2020', lastModifiedDate: new Date(), songs: [3] },
      { id: uuid.v4(), title: 'Meditational Mix', lastModifiedDate: new Date(), songs: [1, 4, 5] }
    ];
    const playlists = localStorage.getItem('playlists');
    if (playlists !== null) {
      this.playlists = JSON.parse(playlists);
    }
  }

  playSong(song: Song) {
    console.debug('Playing ', song.title);
    this.mediaPlayerSubject.next({ id: song.id, title: song.title, artist: song.title.slice(0, 5) });
  }

  async playSongs(songIds: number[]) {
    let songs: any = localStorage.getItem('songs');
    if (songs !== null) {
      songs = JSON.parse(songs);
      for (let i = 0; i < songIds.length; i++) {
        const songDetails: Song = songs.find((song: any) => song.id === songIds[i]);
        if (i === 0) {
          this.playSong(songDetails)
        } else {
          timer(songDetails.durationInMillis).subscribe(_ => this.playSong(songDetails));
        }
      }
    }
  }

  listenForCurrentTrackChanges() {
    return this.mediaPlayerSubject.asObservable();
  }


  getAllSongs(): Observable<Song[]> {
    const songs = localStorage.getItem('songs');
    if (songs === null) {
      return this.http.get<Song[]>(`${BASE_URL}/photos`).pipe(
        map(songs => {
          return songs.map(song => {
            song.durationInMillis = Math.random() * 100000;
            return song;
          })
        }),
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
              subtitle: `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}M`
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
    // const user = localStorage.getItem('user');
    // if (user === null) {
    //   return this.http.get<any>('https://randomuser.me/api/').pipe(
    //     map(response => response.results[0]),
    //     retry(3),
    //     tap(user => localStorage.setItem('user', JSON.stringify(user)))
    //   );
    // } else {
    //   return of(JSON.parse(user));
    // }
    return of({
      name: {
        first: 'Debanjan',
        last: 'Saha'
      },
      email: 'debanjansaha1992@gmail.com',
      picture: {
        large: './assets/user-pic.jpg'
      }
    })
  }

  getAllPlaylists() {
    return this.playListsSubject.asObservable();
  }

  addPlaylist(title: string) {
    this.playlists.splice(0, 0, { id: uuid.v4(), title, songs: [], lastModifiedDate: new Date() });
    this.savePlaylist(this.playlists);
  }

  deletePlaylist(id: string) {
    this.playlists = this.playlists.filter(playlist => playlist.id !== id);
    this.savePlaylist(this.playlists);
  }

  renamePlaylist(id: string, name: string) {
    this.playlists = this.playlists.map(playlist => {
      if (playlist.id === id) {
        playlist.title = name;
        playlist.lastModifiedDate = new Date();
      }
      return playlist;
    });
    this.savePlaylist(this.playlists);
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
      this.savePlaylist(this.playlists);
      return true;
    } else {
      return false;
    }
  }

  removeSongFromPlaylist(playlistId: string, songId: any) {
    const index = this.playlists.findIndex(playlist => playlist.id === playlistId);
    if (index !== -1) {
      const songIndex = this.playlists[index].songs.findIndex(id => id === songId);
      if (songId !== -1) {
        this.playlists[index].songs.splice(songIndex, 1);
      }
      this.savePlaylist(this.playlists);
      return true;
    } else {
      return false;
    }
  }

  private savePlaylist(playlists: Playlist[]) {
    localStorage.setItem('playlists', JSON.stringify(playlists));
    this.playListsSubject.next(this.playlists);
  }
}


