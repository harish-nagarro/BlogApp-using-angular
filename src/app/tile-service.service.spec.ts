import { TestBed, inject } from '@angular/core/testing';

import { TileServiceService } from './tile-service.service';

describe('TileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TileServiceService]
    });
  });

  it('should be created', inject([TileServiceService], (service: TileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
