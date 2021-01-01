import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPlaylistDialogComponent } from './create-edit-playlist-dialog.component';

describe('CreateEditPlaylistDialogComponent', () => {
  let component: CreateEditPlaylistDialogComponent;
  let fixture: ComponentFixture<CreateEditPlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPlaylistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
