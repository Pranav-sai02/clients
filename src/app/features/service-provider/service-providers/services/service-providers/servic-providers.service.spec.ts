import { TestBed } from '@angular/core/testing';

import { ServicProvidersService } from './servic-providers.service';

describe('ServicProvidersService', () => {
  let service: ServicProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
