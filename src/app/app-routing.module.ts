import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'testing', component: TestingPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
