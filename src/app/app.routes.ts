// app.routes.ts - Configuração das rotas principais
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'partners',
        loadChildren: () => import('./modules/partners/partners.module').then(m => m.PartnersModule)
      },
      {
        path: 'drivers',
        loadChildren: () => import('./modules/drivers/drivers.module').then(m => m.DriversModule)
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./modules/vehicles/vehicles.module').then(m => m.VehiclesModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
