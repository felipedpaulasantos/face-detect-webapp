import { TestBed } from '@angular/core/testing';

import { CustomSnackBarService } from './custom-snack-bar.service';

describe('CustomSnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomSnackBarService = TestBed.get(CustomSnackBarService);
    expect(service).toBeTruthy();
  });
});
