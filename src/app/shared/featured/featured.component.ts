import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() entityName: string;
  @Input() items: FeaturedItem[];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface FeaturedItem {
  title: string;
  subtitle?: string;
  thumbnail?: string;
  metadata?: any;
}
