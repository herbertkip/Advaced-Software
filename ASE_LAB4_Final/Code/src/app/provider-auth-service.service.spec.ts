import { TestBed } from '@angular/core/testing';

import { ProviderAuthServiceService } from './provider-auth-service.service';

describe('ProviderAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderAuthServiceService = TestBed.get(ProviderAuthServiceService);
    expect(service).toBeTruthy();
  });
});
