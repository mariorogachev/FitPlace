import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdialogComponent } from './blog-dialog.component';

describe('BlogdialogComponent', () => {
  let component: BlogdialogComponent;
  let fixture: ComponentFixture<BlogdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
