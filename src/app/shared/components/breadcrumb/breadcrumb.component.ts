import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === PRIMARY_OUTLET),
        map(route => this.createBreadcrumbs(route)),
        startWith(this.createBreadcrumbs(this.activatedRoute.root)), // Initial load
        takeUntil(this.destroy$)
      )
      .subscribe(breadcrumbs => {
        this.items = breadcrumbs.map(breadcrumb => ({
          label: breadcrumb.label,
          routerLink: breadcrumb.url
        }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = url ? `${url}/${routeURL}` : `/${routeURL}`;

      // Get label from route data or format from path
      const label = child.snapshot.data['breadcrumb'] || this.formatLabel(routeURL);

      if (routeURL && label) {
        const breadcrumb: Breadcrumb = {
          label: label,
          url: nextUrl
        };
        breadcrumbs.push(breadcrumb);
      }

      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }
    return breadcrumbs; // Should not happen normally with PRIMARY_OUTLET filter
  }

  private formatLabel(routeURL: string): string {
    // Simple formatting: capitalize first letter, replace dashes
    if (!routeURL) return '';
    return routeURL
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

