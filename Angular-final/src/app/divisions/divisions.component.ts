import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DivisionService } from '../Services/DivisionService';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {

  divisionDetails : any = [];
  division : any = [];
  add : boolean = false;
  isSuccess : boolean = false;
  
  ConForm : FormGroup
  constructor(private DivisionService : DivisionService,private router:Router,private http:HttpClient) {
    this.ConForm = new FormGroup({
      Name:new FormControl(null,[Validators.required])
    }
    )
   }
   get Name(){
    return this.ConForm.get("Name");
   }
  ngOnInit(): void {
    this.fetchDivisions();
  }
  fetchDivisions()
  {
    this.divisionDetails = this.DivisionService.getDivision().subscribe(data=>{
      this.divisionDetails = data;
      console.log(data);
    })
  }
  resp ?: string;
  Create()
  {
    console.log(this.isSuccess)
      this.Close4();
      console.log(this.isSuccess)
  }
  Close()
  {
    if(this.add)
    {
      this.add = false;
    }
    else
    this.add = true;
  }
  Close4()
  {
    if(this.isSuccess)
    {
      this.isSuccess = false;
    }
    else
    this.isSuccess = true;   
  } 
  View(index : number)
  {
    
  }
  Update(index : number)
  {
    
  }
  Delete(id:number)
  {
  }
}
