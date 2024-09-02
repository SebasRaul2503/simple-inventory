import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../general/sidebar/sidebar.component';
import { SidebarService } from '../../services/extra/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router:Router) {}

  goLogin(){
    this.router.navigate(['login']);
  }

}
