import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { filter, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface BreadcrumbItem extends MenuItem {
  route?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: BreadcrumbItem[] = [];
  home: BreadcrumbItem = { icon: 'pi pi-home', routerLink: '/dashboard' }; // Adjust home route if needed
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

