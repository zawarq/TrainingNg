import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { dateOrderValidator } from '../shared/date-order.directive';
import * as errorAssets from '../../assets/errors.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private training: Training;
  private http: HttpClient;
  private baseUrl: string;
  private trainingFormGroup: FormGroup;
  private formBuilder: FormBuilder;
  private spinner: Ng4LoadingSpinnerService;
  private toastr: ToastrManager;
  private formSubmitted: boolean;

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    formBuilder: FormBuilder,
    spinnerService: Ng4LoadingSpinnerService,
    toastrManager: ToastrManager) {

    this.http = http;
    this.baseUrl = baseUrl;
    this.formBuilder = formBuilder;
    this.spinner = spinnerService;
    this.toastr = toastrManager;

    this.trainingFormGroup = new FormGroup({
      name: new FormControl(),
      start: new FormControl(),
      end: new FormControl()
    });

    this.fillForm('', '', '');
  }

  get trainingForm() { return this.trainingFormGroup; }
  get controls() { return this.trainingFormGroup.controls; }

  get name() { return this.trainingFormGroup.get('name'); }
  get start() { return this.trainingFormGroup.get('start'); }
  get end() { return this.trainingFormGroup.get('end'); }
  get isFormSubmitted() { return this.formSubmitted; }
  get dateOrderError() { return errorAssets.dateOrder; }

  addTraining() {
    this.formSubmitted = true;
    if (this.trainingFormGroup.invalid) {
      return;
    }

    this.spinner.show();

    this.training = new Training(this.trainingFormGroup.value);

    return this.http.post(this.baseUrl + 'api/Training/Post', this.training).subscribe(() => {

      const duration = this.getDuration(this.training.start, this.training.end);
      this.toastr.successToastr('<p>Training record saved successfully.</p>The training will last <b>' + duration + '</b> days.', 'Success', { enableHTML: true });
      this.spinner.hide();
      this.formSubmitted = false;
      this.emptyFill();

    }, error => {
      this.toastr.errorToastr('Error saving training Record', 'Error');
      console.error(error);
    });
  }

  getDuration(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return duration;
  }

  testFill() {
    this.updateForm("Sample Training", "2019-10-01", "2019-10-15");
  }

  emptyFill() {
    this.updateForm('', '', '');
  }

  fillForm(name: string, start: string, end: string) {
    this.trainingFormGroup = this.formBuilder.group({
      'name': new FormControl(name, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      'start': new FormControl(start, [Validators.required]),
      'end': new FormControl(end, [Validators.required])
    },
      { validator: dateOrderValidator }
    );
  }

  updateForm(name: string, start: string, end: string) {
    this.trainingFormGroup.controls['name'].setValue(name);
    this.trainingFormGroup.controls['start'].setValue(start);
    this.trainingFormGroup.controls['end'].setValue(end);
  }
}

class Training {
  name: string;
  start: string;
  end: string;

  public constructor(form: any) {
    this.name = form.name;
    this.start = form.start;
    this.end = form.end;
  }
}
