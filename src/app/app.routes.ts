// app.routes.ts - Configuração das rotas principais
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout/layout.component'; // Import the new LayoutComponent

export const routes: Routes = [
  {
    path: 'auth', // Routes for authentication (login, register, etc.)
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    // These routes should NOT use the main LayoutComponent
  },
  {
    path: '', // Parent route for authenticated sections using the new layout
    component: LayoutComponent, // Use LayoutComponent for this section
    canActivate: [AuthGuard],
    children: [
      {
        path: '', // Default route after login (e.g., dashboard)
        pathMatch: 'full',
        redirectTo: 'dashboard' // Redirect empty path to dashboard
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' } // Add breadcrumb data
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
        data: { breadcrumb: 'Calendário' }
      },
      {
        path: 'clients',
        loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule),
        data: { breadcrumb: 'Clientes' }
      },
      {
        path: 'events',
        loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule),
        data: { breadcrumb: 'Eventos' }
      },
      {
        path: 'sales',
        loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule),
        data: { breadcrumb: 'Vendas' }
      },
      {
        path: 'partners',
        loadChildren: () => import('./modules/partners/partners.module').then(m => m.PartnersModule),
        data: { breadcrumb: 'Parceiros' }
      },
      {
        path: 'drivers',
        loadChildren: () => import('./modules/drivers/drivers.module').then(m => m.DriversModule),
        data: { breadcrumb: 'Motoristas' }
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./modules/vehicles/vehicles.module').then(m => m.VehiclesModule),
        data: { breadcrumb: 'Veículos' }
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
        data: { breadcrumb: 'Relatórios' }
      },
      // Add routes for profile, settings, etc. if they exist or are needed
      // Example:
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
      //   data: { breadcrumb: 'Perfil' }
      // },
    ]
  },
  // Wildcard route: Redirects any unmatched URL to the default authenticated route (dashboard)
  // or to login if not authenticated (AuthGuard will handle redirection)
  { path: '**', redirectTo: '' }
];

