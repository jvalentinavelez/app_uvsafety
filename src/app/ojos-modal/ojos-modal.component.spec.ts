import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OjosModalComponent } from './ojos-modal.component';

describe('OjosModalComponent', () => {
  let component: OjosModalComponent;
  let fixture: ComponentFixture<OjosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OjosModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OjosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
