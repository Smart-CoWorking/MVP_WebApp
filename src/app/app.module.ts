import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CoworkingdashboardComponent } from './coworkingdashboard/coworkingdashboard.component';
import { CoworkformComponent } from './coworkform/coworkform.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { CoworkmenuComponent } from './common/coworkmenu/coworkmenu.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LeafletModule  } from '@asymmetrik/ngx-leaflet'

@NgModule({
  declarations: [
    AppComponent,
    CoworkingdashboardComponent,
    CoworkformComponent,
    BuildingViewComponent,
    CoworkmenuComponent,
    LocationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,AngularMaterialModule,
    ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,LeafletModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
