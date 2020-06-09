import { TestBed } from '@angular/core/testing';

import { GetDEMService } from './get-dem.service';

describe('GetDEMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDEMService = TestBed.get(GetDEMService);
    expect(service).toBeTruthy();
  });
});
