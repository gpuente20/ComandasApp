import { TestBed } from '@angular/core/testing';

import { ComandaserviceService } from './comandaservice.service';

describe('ComandaserviceService', () => {
  let service: ComandaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComandaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
