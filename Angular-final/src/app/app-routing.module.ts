import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisionsComponent } from './divisions/divisions.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"students",component:StudentsComponent},
  {path:"divisions",component:DivisionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
