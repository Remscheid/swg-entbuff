import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BuffbuilderComponent } from './buffbuilder/buffbuilder.component';
import { AttributeComponent } from './buffbuilder/attribute/attribute.component';
import { AssignmentComponent } from './buffbuilder/assignment/assignment.component';
import { TouritemComponent } from './buffbuilder/touritem/touritem.component';


@NgModule({
  declarations: [
    AppComponent,
    BuffbuilderComponent,
    AttributeComponent,
    AssignmentComponent,
    TouritemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
