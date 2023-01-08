import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CoworkingdashboardComponent } from './coworkingdashboard/coworkingdashboard.component';
import { CoworkformComponent } from './coworkform/coworkform.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { CoworkmenuComponent } from './common/coworkmenu/coworkmenu.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  declarations: [
    AppComponent,
    CoworkingdashboardComponent,
    CoworkformComponent,
    BuildingViewComponent,
    CoworkmenuComponent
  ],
  imports: [
    BrowserModule, MatToolbarModule,
    AppRoutingModule,
    NgImageSliderModule,SelectDropDownModule,
    FontAwesomeModule,MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
