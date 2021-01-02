import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../models/song.model';
import { MusicAppService } from '../music-app.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() height: string = '550px';
  @Input() displayCount: number = 10;
  @Input() showCount = true;
  @Input() showHeader = true;
  @Input() isEditMode = false;
  @Input() showAddIcon = false;
  @Input() showDeleteIcon = false;
  @Input() showSearch = true;
  @Input() showPlayIcon = true;
  @Input() songs: Song[];
  @Output() addClicked: EventEmitter<any>;
  @Output() deleteClicked: EventEmitter<any>;
  searchString: string = '';
  filteredSongs: any[];
  subscription: Subscription;

  constructor(private musicAppService: MusicAppService) {
    this.addClicked = new EventEmitter();
    this.deleteClicked = new EventEmitter();
  }

  ngOnInit() {
    if (!this.songs) {
      this.subscription = this.musicAppService.getAllSongs().subscribe(songs => {
        this.songs = songs;
        this.filteredSongs = [...this.songs];
      });
    } else {
      this.filteredSongs = [...this.songs];
    }
    if (this.isEditMode) {
      this.showAddIcon = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.songs && !changes.songs.firstChange) {
      this.filteredSongs = changes.songs.currentValue;
      this.onSearchQueryChanged(this.searchString);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearchQueryChanged(searchQuery: string) {
    if (searchQuery === '') {
      this.filteredSongs = [...this.songs];
    } else {
      this.filteredSongs = this.songs.filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  }

  playSong(song: any) {
    this.musicAppService.playSong(song);
  }

}
