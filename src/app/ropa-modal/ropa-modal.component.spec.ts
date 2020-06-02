import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RopaModalComponent } from './ropa-modal.component';

describe('RopaModalComponent', () => {
  let component: RopaModalComponent;
  let fixture: ComponentFixture<RopaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RopaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RopaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
