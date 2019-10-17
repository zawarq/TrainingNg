import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const dateOrderValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startDate = new Date(control.controls['start'].value);
  const endDate = new Date(control.controls['end'].value);
  const diffTime = endDate.getTime() - startDate.getTime();
  return diffTime < 0 ? { 'dateOrder': true } : null;
}
