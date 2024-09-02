import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/extra/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isSidebarClosed = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarClosed$.subscribe(
      (isClosed) => (this.isSidebarClosed = isClosed)
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
