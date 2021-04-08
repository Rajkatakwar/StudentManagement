import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { DivisionsComponent } from '../divisions/divisions.component';

@Injectable()
export class DivisionService{

    constructor(private http : HttpClient, private router: Router){

    }
    getDivision()
    {
        return this.http.get("https://localhost:44331/Division");
    }
}