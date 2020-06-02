import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UvinfoPage } from './uvinfo.page';

describe('UvinfoPage', () => {
  let component: UvinfoPage;
  let fixture: ComponentFixture<UvinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UvinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UvinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
