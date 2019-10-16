import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public training: Training;
  public http: HttpClient;
  public baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  addTraining(f: NgForm) {
    
    this.training = new Training(f.value);
    
    return this.http.post<number>(this.baseUrl + 'api/Training/Post', this.training).subscribe(result => {
      console.log(result);
      this.training.duration = result;
    }, error => console.error(error));
  }

  testFill(f: NgForm) {
    this.training.name = 'Sample Training';
  }
}

export class Training {
  name: string;
  start: string;
  end: string;
  duration: number;

  public constructor(init?: Partial<Training>) {
    console.log(init);
    Object.assign(this, init);
  }
}
