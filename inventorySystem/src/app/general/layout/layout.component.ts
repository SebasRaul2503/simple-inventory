import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../services/extra/sidebar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  isSidebarClosed = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarClosed$.subscribe(
      (isClosed) => (this.isSidebarClosed = isClosed)
    );
  }
}
