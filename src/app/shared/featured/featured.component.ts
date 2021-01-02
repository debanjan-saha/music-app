import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItem } from 'src/app/models/featured-item.model';

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
