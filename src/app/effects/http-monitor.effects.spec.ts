import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HttpMonitorEffects } from './http-monitor.effects';

describe('HttpMonitorEffects', () => {
  let actions$: Observable<any>;
  let effects: HttpMonitorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpMonitorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(HttpMonitorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
