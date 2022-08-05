import { TestBed } from '@angular/core/testing';

import { SmartpalnningService } from './smartpalnning.service';

describe('SmartpalnningService', () => {
  let service: SmartpalnningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartpalnningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
