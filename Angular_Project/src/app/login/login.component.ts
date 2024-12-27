import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginDataModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone : false
})

export class LoginComponent implements OnInit 
{
  public lemail : string;
  public lpass : string;

  public data : any;

  loginForm!: FormGroup;
  loginDataCheck : loginDataModel = new loginDataModel;

  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router) 
  {
    this.lemail = "";
    this.lpass = "";
  }

  ngOnInit(): void 
  {
    this.loginForm = this.formbuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  public CheckCredential(checkemail : string, checkpassword : string)
  {
    this.loginDataCheck.email = checkemail;
    this.loginDataCheck.password = checkpassword;

    this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{

      const user = res.find((user: any)=>
        user.email === this.loginDataCheck.email && user.password === this.loginDataCheck.password
      );

      if(user)
      {
        alert("Marvellous" + ' logged in successfully');
          this._router.navigate(['/restaurent']);
          this.loginForm.reset();
      }

      else
      {
        alert("Please enter valid credentials. If you are a new user, please sign up first.");
        this.loginForm.reset();
      }
    });
  }

  logIn() 
  {
    // console.log(this.loginForm.value);
    //       alert("Marvellous" + ' logged in successfully');
    //       this._router.navigate(['/restaurent']);
    //       this.loginForm.reset();    
  }
}
