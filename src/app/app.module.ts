import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
