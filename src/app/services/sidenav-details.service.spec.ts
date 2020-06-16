/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidenavDetailsService } from './sidenav-details.service';

describe('Service: SidenavDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavDetailsService]
    });
  });

  it('should ...', inject([SidenavDetailsService], (service: SidenavDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
