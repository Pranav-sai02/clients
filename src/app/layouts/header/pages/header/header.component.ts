import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentDateTime: string = '';
  currentPage: string = '';
  currentDateOnly: string = '';
  showDropdown: boolean = false;

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  setCurrentDateTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const dateOnlyOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    this.currentDateTime = now.toLocaleDateString('en-US', options);
    this.currentDateOnly = now.toLocaleDateString('en-US', dateOnlyOptions);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    console.log('Dropdown toggled:', this.showDropdown);
  }

  logout() {
    console.log('Logging out...');
    this.showDropdown = false;

    // Clear any stored session or token (if applicable)
    localStorage.clear(); // or sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  ngOnInit(): void {
    this.setCurrentDateTime();
    this.updateBreadcrumb();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb(): void {
    let route = this.activatedRoute.root;
    let breadcrumb = '';

    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data['breadcrumb']) {
        breadcrumb = route.snapshot.data['breadcrumb'];
      }
    }

    this.currentPage = breadcrumb || 'Dashboard / Home';
  }

  confirmLogout(event: MouseEvent): void {
    event.stopPropagation(); // prevent other click events

    const confirmed = window.confirm('Are you sure you want to logout?');

    if (confirmed) {
      this.logout();
    } else {
      // Do nothing
      console.log('Logout cancelled');
    }
  }
}
