import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

// Shared Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    UserMenuComponent,
    BreadcrumbComponent,
    LoadingComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // PrimeNG
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    BreadcrumbModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToolbarModule
  ],
  exports: [
    // Components
    NavbarComponent,
    SidebarComponent,
    UserMenuComponent,
    BreadcrumbComponent,
    LoadingComponent,
    MainLayoutComponent,
    // PrimeNG Modules (optional, if needed directly in other modules)
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    BreadcrumbModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToolbarModule
  ]
})
export class SharedModule { }

