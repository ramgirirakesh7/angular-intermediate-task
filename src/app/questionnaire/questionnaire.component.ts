import { Component, OnInit } from '@angular/core';
import questionnaire  from '../../assets/questionnaire.json';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent  {

  title = 'json-file-read-angular';
  public questionnaireList:{name:string, code:string}[] = questionnaire.item;
  value = ''
  dynamicForm: FormGroup;
  constructor() {
    
    
  }
  onSubmit(d) {
    this.value = JSON.stringify(questionnaire);
    return this.value;
  }
}
