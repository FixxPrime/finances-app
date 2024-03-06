import { TestBed } from '@angular/core/testing';

import { MinioService } from './minio.service';

describe('MinioService', () => {
  let service: MinioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
