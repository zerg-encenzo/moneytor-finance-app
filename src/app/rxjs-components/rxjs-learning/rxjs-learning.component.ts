import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.scss'],
})
export class RxjsLearningComponent  implements OnInit {
  
  agents: Observable<string> | undefined;

  constructor() { }

  ngOnInit() {

    this.agents = new Observable(
      function(observer){
        try {
          observer.next('Agent 1');
          observer.next('Agent 2');
          observer.next('Agent 3');
        }
        catch (error) {
          observer.error(error);
        }
      });

      this.agents.subscribe(data => {
        console.log(data);
      });
    }

    
  createObservable() {
    const observable = new Observable((subscriber) => {
      subscriber.next('Hello, Observable!');
      subscriber.next('This is a second message.');
    })
  }

}
