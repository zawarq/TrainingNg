import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public training: Training;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.post<Training>(baseUrl + 'api/Training/Add', this.training).subscribe(result => {
      this.training.duration = result;
    }, error => console.error(error));
  }
}

interface Training {
  name: string;
  start: string;
  end: string;
  duration: number;
}
