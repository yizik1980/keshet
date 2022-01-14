import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { failureAction } from './actions/error.action';
import { ErrorState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showApp: boolean;
  constructor(private store: Store<ErrorState>) {
    this.showApp = false;
  }
  ngOnInit(): void {
    this.showApp = navigator.onLine;
    if (!navigator.onLine) {
      this.store.dispatch(failureAction({ error: 'Your are Working OffLine' }));
    }
  }
}
