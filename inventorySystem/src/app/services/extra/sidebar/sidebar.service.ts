import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarClosed = new BehaviorSubject<boolean>(false);
  isSidebarClosed$ = this.sidebarClosed.asObservable();

  toggleSidebar() {
    this.sidebarClosed.next(!this.sidebarClosed.value);
  }
}
