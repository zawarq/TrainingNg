import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    formBuilder: FormBuilder,
    spinnerService: Ng4LoadingSpinnerService) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.formBuilder = formBuilder;
    this.spinner = spinnerService;

    this.trainingFormGroup = new FormGroup({
      name: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      duration: new FormControl()
    });
  }

  addTraining() {

    this.spinner.show();

    this.training = new Training(this.trainingFormGroup.value);
    
    return this.http.post(this.baseUrl + 'api/Training/Post', this.training).subscribe(result => {

      const startDate = new Date(this.training.start);
      const endDate = new Date(this.training.end);
      const diffTime = Math.abs(startDate.getTime() - endDate.getTime());
      const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      this.trainingFormGroup.controls['duration'].setValue(duration + ' days');
      this.spinner.hide();

    }, error => console.error(error));
  }

  testFill() {
    this.trainingFormGroup = this.formBuilder.group({
      //validation sample: 'email': ['', Validators.compose([Validators.required])]
      'name': ["Sample Training"],
      'start': ["2019-10-01"],
      'end': ["2019-10-15"],
      'duration': ''
    });
  }
}

export class Training {
  name: string;
  start: string;
  end: string;
  duration: number;

  public constructor(form: any) {
    this.name = form.name;
    this.start = form.start;
    this.end = form.end;
  }
}
