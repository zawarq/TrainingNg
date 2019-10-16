import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.formBuilder = formBuilder;

    this.trainingFormGroup = new FormGroup({
      name: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      duration: new FormControl()
    });
  }

  addTraining() {
    
    this.training = new Training(this.trainingFormGroup.value);
    
    return this.http.post<number>(this.baseUrl + 'api/Training/Post', this.training).subscribe(result => {
      console.log(result);

      this.trainingFormGroup.controls['duration'].setValue(result + ' days');
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
