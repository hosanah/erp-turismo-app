import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, RouterModule } from '@angular/router';
// Removed: import { BreadcrumbModule } from 'primeng/breadcrumb';
// Removed: import { MenuItem } from 'primeng/api';
import { filter, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar'; // Added
import { MatIconModule } from '@angular/material/icon'; // Added
import { MatButtonModule } from '@angular/material/button'; // Added for potential icon button

// Interface remains similar, but doesn't need to extend PrimeNG MenuItem
interface BreadcrumbItem {
  label?: string;
  icon?: string; // Use string for Material Icon name
  routerLink?: string;
  // route?: string; // This property wasn't used, can be removed if not needed
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule, 
    // Removed: BreadcrumbModule, 
    RouterModule, 
    MatToolbarModule, // Added
    MatIconModule, // Added
    MatButtonModule // Added
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: BreadcrumbItem[] = [];
  home: BreadcrumbItem = { icon: 'home', routerLink: '/dashboard' }; // Changed icon to Material name
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      startWith(null) // Trigger initial breadcrumb build
    ).subscribe(() => {
      this.items = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (!routeURL && !child.snapshot.data['breadcrumb']) {
        // Skip routes without url segments and breadcrumb data unless it's the root
        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
      
      const nextUrl = url ? `${url}/${routeURL}` : `/${routeURL}`;

      // Get breadcrumb label from route data or format the URL segment
      const label = child.snapshot.data['breadcrumb'] || this.formatUrlSegment(routeURL);

      if (label) {
        const breadcrumb: BreadcrumbItem = {
          label: label,
          routerLink: nextUrl
        };
        // Add icon if defined in route data (optional)
        if (child.snapshot.data['breadcrumbIcon']) {
          breadcrumb.icon = child.snapshot.data['breadcrumbIcon'];
        }
        breadcrumbs.push(breadcrumb);
      }

      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }
    return breadcrumbs; // Should not happen normally with PRIMARY_OUTLET logic
  }

  private formatUrlSegment(segment: string): string {
    if (!segment) return '';
    // Simple formatting: capitalize first letter, replace dashes
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  }
}

