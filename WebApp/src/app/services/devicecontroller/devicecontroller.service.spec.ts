import { TestBed } from '@angular/core/testing';

import { DeviceControllerService } from './devicecontroller.service';

describe('DeviceControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceControllerService = TestBed.get(DeviceControllerService);
    expect(service).toBeTruthy();
  });
});
