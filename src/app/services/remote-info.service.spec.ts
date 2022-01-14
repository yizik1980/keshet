import { TestBed } from '@angular/core/testing';

import { RemoteInfoService } from './remote-info.service';

describe('RemoteInfoService', () => {
  let service: RemoteInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
