import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class StudentService{

    constructor(private http : HttpClient, private router: Router){

    }
    getStudentDetails()
    {
        return this.http.get("https://localhost:44331/Student");
    }
    getStudent(index : number)
    {
        return this.http.get("https://localhost:44331/Student/"+index)
    }
}