import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Questionnaire1Component } from './questionnaire1.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
class Helper {
  private fixture: ComponentFixture<Questionnaire1Component>;
  constructor(fixture: ComponentFixture<Questionnaire1Component>) {
    this.fixture = fixture;
  }
  getElement(tagName: string): DebugElement[] {
    const el = this.fixture.debugElement.queryAll(By.css(tagName));
    return el;
  }
  getCount(tagName: string): Number {
    const el = this.fixture.debugElement.queryAll(By.css(tagName));
    return el.length;
  }
  isExist(tagName: string): boolean {
    const el = this.fixture.debugElement.queryAll(By.css(tagName));
    return el.length > 0;
  }
}
describe('Questionnaire1Component', () => {
  let component: Questionnaire1Component;
  let fixture: ComponentFixture<Questionnaire1Component>;
  let mockAssignmentService: any;
  let helper: Helper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questionnaire1Component ],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(Questionnaire1Component);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    let errorResponse;
    fixture = TestBed.createComponent(Questionnaire1Component);
    component = fixture.componentInstance;
    helper = new Helper(fixture);
    fixture.detectChanges();
     errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call  onSubmit', (() => {
    component.onSubmit();
    IsResponseLoaded(() => {
      expect(component.Valid).toHaveBeenCalled();
    }
    );
  }));

  it('should call  Create RootFormGroup', (() => {
    component.createRootFormGroup(component.questionnaireList);
    IsResponseLoaded(() => {
      expect(component.Valid).toHaveBeenCalled();
    }
    );
  }));

  it('should call  Create FormGroup', (() => {
    component.createFormGroup(component.questionnaireList);
    IsResponseLoaded(() => {
      expect(component.Valid).toHaveBeenCalled();
    }
    );
  }));
 

  // it('should hasError Value', (() => {
  //   component.hasError('','');
    
  // }));

  // it('should checkAndSetAnswer without data', (() => {
  //   component.checkAndSetAnswer({ question: [] });
  //   IsResponseLoaded(() => {
  //     expect(component.Valid).toHaveBeenCalled();
  //   }
  //   );
  // }));

  // it('should checkAndSetAnswer', (() => {
  //   component.checkAndSetAnswer(null);
  //   IsResponseLoaded(() => {
  //     expect(component.Valid).toHaveBeenCalled();
  //   }
  //   );
  // }));

  function IsResponseLoaded(callback) {
    if (component.Process) {
      setTimeout(() => {
        IsResponseLoaded(callback);
      }
        , 100);
    }
    else {
      callback();
    }}

});
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}