import { TestBed } from '@angular/core/testing';

import { PromiseToObservableService } from './promise-to-observable.service';

describe('PromiseToObservableService', () => {
  let service: PromiseToObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromiseToObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
