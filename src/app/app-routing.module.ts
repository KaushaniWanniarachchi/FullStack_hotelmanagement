import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ReserveAddComponent } from './reserve-add/reserve-add.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'dashboard'
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  { 
    path: 'hostel-detail', 
    pathMatch:'full',
    component: HostelDetailComponent 
  },
  { 
    path: 'feedback', 
    pathMatch:'full',
    component: FeedbackComponent 
  },
  { 
    path: 'gallery', 
    pathMatch:'full',
    component: GalleryComponent 
  },
  { 
    path: 'reserved', 
    pathMatch:'full',
    component: ReserveViewComponent 
  },
  { 
    path: 'contactUs', 
    pathMatch:'full',
    component: ContactUsComponent 
  },
  { 
    path: 'profile', 
    pathMatch:'full',
    component: ProfileComponent 
  },
  {
    path:'reserve',
    pathMatch:'full',
    component: ReserveAddComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
