import { TestBed } from '@angular/core/testing';

import { BlackOfferService } from './black-offer.service';

describe('BlackOfferService', () => {
  let service: BlackOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
