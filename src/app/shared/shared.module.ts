import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured/featured.component';



@NgModule({
  declarations: [FeaturedComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FeaturedComponent
  ]
})
export class SharedModule { }
