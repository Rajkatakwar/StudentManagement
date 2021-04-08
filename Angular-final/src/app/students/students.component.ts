import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../models/Student';
import { StudentService } from '../Services/StudentService';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  model = new Student();
  stu = new Student()
  student : any = {};
  student1 : any = [];
  add : boolean = false
  add1 : boolean = false;
  add2 : boolean = false;
  add3 : boolean = false;
  current : number = 0;
  ConForm : FormGroup;
  id : number = 0;
  name : string = "";
  fullname : string = "";
  rollNumber : number = 0;
  attendance : number = 0;
  divisionId : string = "";
  standard : string = "";
  gpa : number = 0;
  dateOfBirth : Date | undefined;
  isActive : boolean = false;
  divisionDetails : any ={}
  standardDetails : any = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  attendanceDetails : any = ["Compliant","Non-compliant"];
  isPress : boolean = true;
  isSuccess : boolean = false;
  status : string = "";

  constructor(private fb: FormBuilder,private StudentService : StudentService,private router:Router,private http:HttpClient) {
    this.ConForm = this.fb.group({
      rollNumber:new FormControl(null,[Validators.required]),
      fullname:new FormControl(null,[Validators.required, Validators.pattern('[A-Za-z ]+')]),
      attendance:new FormControl(null,[Validators.required]),
      divisionId:new FormControl(null,[Validators.required]),
      standard:new FormControl(null,[Validators.required]),
      gpa:new FormControl(null,[Validators.required]),
      dateOfBirth:new FormControl(null,[Validators.required]),
      isActive:new FormControl(null)
    }, {validators: [this.checkGPA]},
    );
   }
   get registerFormControl() {
    return this.ConForm.controls;
  }
  checkGPA(group : FormGroup)
  {
    let x = group.get('gpa').value;
    return (x <= 10 && x >= 0) ? null :{notUp: true};
  }
  ngOnInit(): void {
    this.isSuccess = false;
    this.fetchDetails();
    this.fetchDivisions();
  }
  fetchDivisions()
  {
    this.divisionDetails = this.http.get("https://localhost:44331/Division").subscribe(data=>{
      this.divisionDetails = data;
      console.log(data);
    })
  }
  fetchDetails()
  {
    this.student = this.StudentService.getStudentDetails().subscribe(data=>{
      this.student = data;
      console.log(data);
    })
  }
  fetchStudent()
  {
    this.student1 = this.StudentService.getStudent(this.current).subscribe(data=>{
      this.student1 = data;
      console.log(this.student1);   
    })
    
  }
  resp ?: string;
  Create()
  {
    this.student1 = {};
    console.log("heree");
      this.student1.RollNumber = +this.ConForm.value.rollNumber;
      this.student1.Fullname = this.ConForm.value.fullname;
      if(this.ConForm.value.attendance=="Compliant")
      this.student1.Attendance = 1;
      else
      this.student1.Attendance = 0;
      for(let i=0;i<this.divisionDetails.length;i++)
      {
        if(this.ConForm.value.divisionId == this.divisionDetails[i].name)
        this.student1.DivisionId = this.divisionDetails[i].id
      }
      this.student1.Standard = this.ConForm.value.standard;
      this.student1.Gpa = +this.ConForm.value.gpa.toFixed(2);
      this.student1.DateOfBirth = this.ConForm.value.dateOfBirth;
      if(this.ConForm.value.isActive)
      this.student1.IsActive = true;
      else
      this.student1.IsActive = false;
      console.log(JSON.stringify(this.student1));
      var res = this.http.post("https://localhost:44331/student",this.student1).subscribe(res => {this.resp = res.toString();
  },err=>{console.log(err)})
  this.fetchDetails()
  
  this.student1 = {}
  this.add = false;
  this.status = "Created";
  this.isSuccess = true;
  this.isPress = false;
  }
  Startdelay()
  {
    setTimeout(() => 
      {
          this.router.navigate(['/']);
      },
    2000);
  }
  View(index : number)
  {
    this.Close1()
    this.current = index;
    this.fetchStudent()
  }
  fetchStudentforEdit()
  {
    this.student1 = this.StudentService.getStudent(this.current).subscribe(data=>{
      this.student1 = data;
      console.log(this.student1);  
      this.editUpdate();   
    })    
  }
  Update(index : number)
  {
    this.Close2()
    this.current = index;
    this.fetchStudentforEdit()     
  }
  atten : string = ""
  dname : string = ""
  editUpdate()
  {
    
    if(this.student1[0].attendance==1)
       this.atten = "Compliant"
    else
       this.atten = "Non-compliant"
    for(let i=0;i<this.divisionDetails.length;i++)
    {
      if(this.divisionDetails[i].id == this.student1[0].divisionId)
      {
        this.dname = this.divisionDetails[i].name
        console.log(this.dname)
      }
    }

    this.ConForm.patchValue({
      rollNumber : this.student1[0].rollNumber,
      fullname : this.student1[0].fullname,
      attendance : this.atten,
      divisionId : this.dname,
      standard : this.student1[0].standard,
      gpa : this.student1[0].gpa,
      dateOfBirth : this.formatDate(this.student1[0].dateOfBirth),
      isActive : this.student1[0].isActive
    })
    
    console.log(this.standard);
  }
  UpdateConfirm2(form:NgForm)
  {
    console.log(form.value)
  }
  UpdateConfirm()
  {
    this.student1 = {};
    console.log("heree");
      this.student1.Id = this.current; 
      this.student1.RollNumber = +this.ConForm.value.rollNumber;
      this.student1.Fullname = this.ConForm.value.fullname;
      if(this.ConForm.value.attendance=="Compliant")
      this.student1.Attendance = 1;
      else
      this.student1.Attendance = 0;
      for(let i=0;i<this.divisionDetails.length;i++)
      {
        if(this.ConForm.value.divisionId == this.divisionDetails[i].name)
        this.student1.DivisionId = this.divisionDetails[i].id
      }
      this.student1.Standard = this.ConForm.value.standard;
      this.student1.Gpa = +this.ConForm.value.gpa.toFixed(2);
      this.student1.DateOfBirth = this.ConForm.value.dateOfBirth;
      if(this.ConForm.value.isActive)
      this.student1.IsActive = true;
      else
      this.student1.IsActive = false;
      console.log(JSON.stringify(this.student1));
    var res = this.http.post("https://localhost:44331/student/edit",this.student1).subscribe(res => {this.resp = res.toString();
    this.ngOnInit();
    this.add2 = false;
    this.status = "Updated";
    this.isSuccess = true;
    this.isPress =false;
  },err=>{console.log(err)})
  }
  clear()
    {
      this.ConForm.patchValue({
        rollNumber : "",
        fullname : "",
        attendance : "",
        divisionId : "",
        standard : "",
        gpa : "",
        dateOfBirth : "",
        isActive : ""
      })
    }
  Delete(index:number)
  {
    this.Close3();
    this.current = index;
    this.student1 = {}
    this.fetchStudent();
  }
  DeleteConfirm()
  {
    console.log(this.student1[0].id);
    var res = this.http.post("https://localhost:44331/student/delete",this.current).subscribe(res => {this.resp = res.toString();
  },err=>{console.log(err)})
  this.router.navigateByUrl('/students',{skipLocationChange:true}).then(()=>{this.router.navigate(['students'])
  }) 
  this.fetchDetails();
  this.add3 = false;
  this.status = "Deleted";
  this.isSuccess = true;
  this.isPress = false;
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
  Close1()
  {
    if(this.add1)
    {
      this.add1 = false;
    }
    else
    this.add1 = true;   
  }
  Close2()
  {
    if(this.add2)
    {
      this.add2 = false;
      this.clear();
    }
    else
    this.add2 = true;   
  }
  Close3()
  {
    if(this.add3)
    {
      this.add3 = false;
    }
    else
    this.add3 = true;   
  }
  private formatDate(date:Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  AlphaOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 67 || charCode > 92) || (charCode < 97 || charCode > 112))) {
      return false;
    }
    return true;
   
  }
  change()
  {
    this.isSuccess=false;
    this.isPress = true;
  }
}
