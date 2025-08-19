import { TestBed } from '@angular/core/testing';

import { SubstitutionsService } from './substitutions.service';

describe('SubstitutionsService', () => {
  let service: SubstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubstitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
