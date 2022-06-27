import { TestBed } from '@angular/core/testing';

import { MyIndexedDbDataService } from './my-indexed-db-data-service.service';

describe('MyIndexedDbDataService', () => {
  let service: MyIndexedDbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyIndexedDbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
