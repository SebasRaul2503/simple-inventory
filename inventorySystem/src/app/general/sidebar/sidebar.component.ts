import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/extra/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isSidebarClosed = false;

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.sidebarService.isSidebarClosed$.subscribe(
      (isClosed) => (this.isSidebarClosed = isClosed)
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  //routes methods
  goInventory(){
    this.router.navigate(['inventory']);
  }

  goDashboard(){
    this.router.navigate(['dashboard']);
  }

  goReports(){
    this.router.navigate(['reports']);
  }

  goUsers(){
    this.router.navigate(['users']);
  }

  goConfig(){
    this.router.navigate(['configuration']);
  }

  goHistory(){
    this.router.navigate(['history']);
  }

}
