import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  }

  addTraining() {

    this.spinner.show();

    this.training = new Training(this.trainingFormGroup.value);
    
    return this.http.post(this.baseUrl + 'api/Training/Post', this.training).subscribe(() => {

      const duration = this.getDuration(this.training.start, this.training.end);
      this.toastr.successToastr('<p>Training record saved successfully.</p>The training will last <b>' + duration + '</b> days.', 'Success', { enableHTML: true });
      this.spinner.hide();
      this.emptyFill();

    }, error => {
      this.toastr.errorToastr('Error saving training Record', 'Error');
      console.error(error);
    });
  }

  getDuration(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return duration;
  }

  testFill() {
    this.trainingFormGroup = this.formBuilder.group({
      //validation sample: 'email': ['', Validators.compose([Validators.required])]
      'name': ["Sample Training"],
      'start': ["2019-10-01"],
      'end': ["2019-10-15"]
    });
  }

  emptyFill() {
    this.trainingFormGroup = this.formBuilder.group({
      'name': [""],
      'start': [""],
      'end': [""]
    });
  }
}

export class Training {
  name: string;
  start: string;
  end: string;

  public constructor(form: any) {
    this.name = form.name;
    this.start = form.start;
    this.end = form.end;
  }
}
