import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { BrowsePhotosPageComponent } from './browse-photos-page/browse-photos-page.component';
import { RouteGuard } from './route.guard';
import { UploadPhotoPageComponent } from './upload-photo-page/upload-photo-page.component';

const routes: Routes = [{
  path: 'sign-in',
  component: SignInPageComponent,
}, {
  path: '',
  component: BrowsePhotosPageComponent,
  canActivate: [RouteGuard],
}, {
  path: 'upload-photo',
  component: UploadPhotoPageComponent,
  canActivate: [RouteGuard],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
