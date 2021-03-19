import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {
  Subscription: string;
  Submitted: string;
  Last_Update: string;
  gender: string;
  Age: number;
  Name: string;
  Consult_Type: string;
  Email: String
  DOB: string;
  Skin_Type: string;
  Secondary_Concern: string;
  Patient_Report: string;
  Medical_Condition: string;
  Current_Medicines: string;
  Allergies: string;
  Previous: string;
  constructor(public dailogref: MatDialogRef<ViewmoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _route: Router) { }

  ngOnInit(): void {
    this.Subscription = this.data.Subscription;
    this.Submitted = this.data.Submitted;
    this.Last_Update = this.data.Last_Update;
    this.gender = this.data.gender;
    this.Consult_Type = this.data.Consult_Type;
    this.Name = this.data.Name;
    this.DOB = this.data.DOB;
    this.Age = this.data.Age;
    this.Email = this.data.Email;
    this.Skin_Type = this.data.Skin_Type;
    this.Secondary_Concern = this.data.Secondary_Concern;
    this.Patient_Report = this.data.Patient_Report;
    this.Patient_Report = this.data.Patient_Report;
    this.Previous = this.data.Previous;
    this.Medical_Condition = this.data.Medical_Condition;
    this.Current_Medicines = this.data.Current_Medicines;
    this.Allergies = this.data.Allergies;
  }
  onCancelClick() {
    this.dailogref.close();
  }
  onEscalate() {



    //console.log(Escalate);
    // if (Data.splice(this.data.Id - 1, 1)) {
    //   console.log(Data);
    //   // localStorage.setItem('Data', JSON.stringify(Data));
    //   localStorage.setItem('Escalate', JSON.stringify(Escalate));
    //   // console.log(Escalate);

    let Data: any[] = JSON.parse(localStorage.getItem('Data'));
    let Escalate: any[] = JSON.parse(localStorage.getItem('Escalate'));;

    Escalate.push(Data[this.data.Id - 1]);
    if (Data.splice(this.data.Id - 1, 1)) {
      //   console.log(Data);
      localStorage.setItem('Escalate', JSON.stringify(Escalate));
    }
    // console.log(Escalate);
    this.dailogref.close();
  }
}
