import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SafeHtmlPipe } from './shared/pipes/safe-html/safe-html.pipe';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
