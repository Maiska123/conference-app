/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SidenavService } from './sidenav-details.service';

describe('Service: SidenavDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
