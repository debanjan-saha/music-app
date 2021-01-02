import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FeaturedItem } from 'src/app/models/featured-item.model';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() entityName: string;
  @Input() items: FeaturedItem[];
  displayedItems: FeaturedItem[];

  constructor() { }

  ngOnInit(): void {
    this.displayedItems = [...this.items];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    if (width > 600 && width < 1200) {
      this.displayedItems = [...this.items.slice(0,3)];
    } else if (width < 600) {
      this.displayedItems = [...this.items.slice(0,1)];
    }
    else if (width > 100) {
      this.displayedItems = [...this.items.slice(0,6)];
    }
  }
}
