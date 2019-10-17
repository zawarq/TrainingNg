import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  get f() { return this.trainingFormGroup.controls; }

  get name() { return this.trainingFormGroup.get('name'); }
  get start() { return this.trainingFormGroup.get('start'); }
  get end() { return this.trainingFormGroup.get('end'); }

  addTraining() {

    if (this.trainingFormGroup.invalid) {
      return;
    }

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
    const diffTime = endDate.getTime() - startDate.getTime();
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return duration;
  }

  testFill() {
    this.fillForm("Sample Training", "2019-10-01", "2019-10-15");
  }
  
  emptyFill() {
    this.updateForm('', '', '');
  }

  fillForm(name: string, start: string, end: string) {
    this.trainingFormGroup = this.formBuilder.group({
      'name':  new FormControl(name, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      'start': new FormControl(start, [Validators.required, dateOrderValidator(start, end)]),
      'end':   new FormControl(end, [Validators.required, dateOrderValidator(start, end)])
    });
  }

  updateForm(name: string, start: string, end: string) {
    this.trainingFormGroup.controls['name'].setValue('');
    this.trainingFormGroup.controls['start'].setValue('');
    this.trainingFormGroup.controls['end'].setValue('');
  }
}

function dateOrderValidator(start: string, end: string): ValidatorFn {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  console.log(startDate);
  console.log(endDate);
  console.log(diffTime);
  return (control: AbstractControl): { [key: string]: any } | null => {
    return diffTime < 0 ? { 'dateOrder': { value: 'Start Date must not be greater than End Date' } } : null;
  };
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
