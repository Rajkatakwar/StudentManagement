import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DivisionsComponent } from './divisions/divisions.component';
import { StudentsComponent } from './students/students.component';
import { DivisionService } from './Services/DivisionService';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './Services/StudentService';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    DivisionsComponent,
    StudentsComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DivisionService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
