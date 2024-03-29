import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DetailsViewComponent } from '../layout/details-view/details-view.component';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public isOpen() {
    return this.sidenav.opened;
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
