import { Component, OnInit, Output } from '@angular/core';
import questionnaire from '../../assets/questionnaire.json';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { shiftInitState } from '@angular/core/src/view';

@Component({
  selector: 'app-questionnaire1',
  templateUrl: './questionnaire1.component.html',
  styleUrls: ['./questionnaire1.component.css']
})
export class Questionnaire1Component implements OnInit {
  title = 'json-file-read-angular';
  public questionnaireList = questionnaire.item;
  public dynamicForm: FormGroup;
  output: string;
  group = {};
  Valid = true;
  Process = true;
  constructor(private fBuilder: FormBuilder) { this.output = ''; }

  ngOnInit() {
    //this.dynamicForm = this.createFormGroup(this.questionnaireList);
    this.createRootFormGroup(this.questionnaireList);
    this.dynamicForm = this.fBuilder.group(this.group);
  }

  createFormGroup(questinGroup) {
    let frmGroup = {};
    questinGroup.forEach(question => {
      if (question.type !== "group") {
        frmGroup[question.linkId] = new FormControl('', [Validators.required]);
      } else {
        let tempGroup = this.createFormGroup(question.item);
        frmGroup[question.linkId] = this.fBuilder.array([]);
        frmGroup[question.linkId].push(tempGroup);
        //console.log("temp", tempGroup);
        //frmGroup[question.linkId] = this.createFormGroup(question.item);
      }
    });
    //console.log("frmGroup",frmGroup)
    return this.fBuilder.group(frmGroup);
  }
  createRootFormGroup(questinGroup) {
    questinGroup.forEach(question => {
      if (question.type !== "group") {
        this.group[question.linkId] = new FormControl('', [Validators.required]);
      } else {
        this.createRootFormGroup(question.item);
      }
    });
  }

  onSubmit() {
    let output = questionnaire;
    this.checkAndSetAnswer(output.item);
    this.output = output;
    //console.log("Output", this.output)
  }

  checkAndSetAnswer(questinGroup) {
    questinGroup.forEach(question => {
      if (question.type !== "group") {
        const keyVal = this.dynamicForm.value[question.linkId];
        
        if (keyVal != null && typeof keyVal !== "undefined") {
          let answer;
          switch (question.type) {
            case "boolean": answer = {
              valueBoolean: keyVal
            }
              break;
            case "decimal": answer = {
              valueDecimal: keyVal
            }
              break;
            case "integer": answer = {
              valueInteger: keyVal
            }
              break;
            case "date": answer = {
              valueDate: keyVal
            }
              break;
            case "dateTime": answer = {
              valueDateTime: keyVal
            }
              break;
            case "time": answer = {
              valueTime: keyVal
            }
              break;
            case "string": answer = {
              valueString: keyVal
            }
              break;
            case "uri": answer = {
              valueUri: keyVal
            }
              break;
            case "Attachment": answer = {
              valueAttachment: keyVal
            }
              break;
            case "Coding": answer = {
              valueCoding: keyVal
            }
              break;
            case "Quantity": answer = {
              valueQuantity: keyVal
            }
              break;
            case "Reference(Any)":
              break;
            default: answer = {
              value: keyVal
            }
              break;
          }
          question.answer = answer;
        }
      } else {
        this.checkAndSetAnswer(question.item);
      }
    });
  }

  // public hasError = (controlName: string, errorName: string) => {
  //   return this.dynamicForm.controls[controlName].hasError(errorName);
  // }
}
