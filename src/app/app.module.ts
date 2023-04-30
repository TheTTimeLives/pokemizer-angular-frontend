import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeroImageComponent } from './hero/image/hero-image.component';
import { BackgroundComponent } from './basics/background/background.component';
import { CallToActionComponent } from './hero/call-to-action/call-to-action.component';
import { LoginRegisterComponent } from './basics/login-register/login-register.component';
import { HamburgerComponent } from './basics/hamburger/hamburger.component';
import { TestingRequestorButtonComponent } from './testing/testing-requestor-button/testing-requestor-button.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeroImageComponent,
    BackgroundComponent,
    CallToActionComponent,
    LoginRegisterComponent,
    HamburgerComponent,
    TestingRequestorButtonComponent,
    TestingPageComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
