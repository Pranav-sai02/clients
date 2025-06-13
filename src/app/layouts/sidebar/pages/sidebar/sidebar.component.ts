import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../models/Sidebar';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  groupedMenu: { [section: string]: Sidebar[] } = {};
  topLevelMenuItems: Sidebar[] = [];

  // Custom display order of sections
  sectionOrder: string[] = [
    'Call Centre',
    'Configuration',
    'Company',
    'Rating Questions',
    'Client',
    'Services',
    'Transport',
    'Admin',
    'Import',
    'Reports',
    'Sms',
    'Security',
    'General', // Fallback
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.getMenuItems().subscribe({
      next: (items) => {
        const activeItems = items.filter((item) => item.IsActive);

        this.topLevelMenuItems = activeItems.filter(
          (item) => item.MenuPath === 'Home' || item.MenuPath === 'DashBoard'
        );

        const groupableItems = activeItems
          .filter(
            (item) =>
              item.MenuPath.includes('/') &&
              !this.topLevelMenuItems.includes(item)
          )
          .sort((a, b) => a.MenuId - b.MenuId);

        this.groupedMenu = this.groupBySection(groupableItems);
      },
      error: (err) => {
        console.error('Error fetching sidebar menu items:', err);
      },
    });
  }

  private groupBySection(items: Sidebar[]): { [section: string]: Sidebar[] } {
    const grouped: { [section: string]: Sidebar[] } = {};
    items.forEach((item) => {
      const pathParts = item.MenuPath.split('/');
      const section = pathParts.length > 1 ? pathParts[0] : 'General';
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(item);
    });

    // Sort each section's items by menuId
    Object.keys(grouped).forEach((section) => {
      grouped[section].sort((a, b) => a.MenuId - b.MenuId);
    });

    return grouped;
  }
}
