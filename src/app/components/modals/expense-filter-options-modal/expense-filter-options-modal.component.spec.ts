import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpenseFilterOptionsModalComponent } from './expense-filter-options-modal.component';

describe('ExpenseFilterOptionsModalComponent', () => {
  let component: ExpenseFilterOptionsModalComponent;
  let fixture: ComponentFixture<ExpenseFilterOptionsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseFilterOptionsModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseFilterOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
