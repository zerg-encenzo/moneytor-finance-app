import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpenseAdditionInputModalComponent } from './expense-addition-input-modal.component';

describe('ExpenseAdditionInputModalComponent', () => {
  let component: ExpenseAdditionInputModalComponent;
  let fixture: ComponentFixture<ExpenseAdditionInputModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseAdditionInputModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseAdditionInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
