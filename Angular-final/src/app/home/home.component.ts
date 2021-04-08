import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  StudentButton()
  {
    this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{this.router.navigate(['students'])})
  }
  DivisionButton()
  {
    this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{this.router.navigate(['divisions'])})
  }
  ngOnInit(): void {
  }

}
