import * as moment from 'moment';
import { ViewmoreComponent } from './../viewmore/viewmore.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-escalate',
  templateUrl: './escalate.component.html',
  styleUrls: ['./escalate.component.css']
})
export class EscalateComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Country', 'Time_Left', 'Consultation_DateTime', 'Action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  arr: any;
  startTime: any;
  endTime: any;
  isExist: boolean = false;
  obj: any = {}
  constructor(public _dialog: MatDialog, private _http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this._http.get<any[]>(environment.url_esctTime).subscribe(obs => {
      obs.forEach(element => {
        if (element.date == moment().format("L")) {
          this.isExist = true;
          this.obj = element;
        }
      });
    });
    this.startTime = moment().format("L HH:mm:ss");

    this._http.get(environment.url_esc).subscribe((res) => {
      this.arr = res
      this.dataSource.data = this.arr;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {

    this.endTime = moment().format("L HH:mm:ss");
    let secondsSpent = moment(this.endTime, "L HH:mm:ss").diff(moment(this.startTime, "L HH:mm:ss"));
    secondsSpent /= 1000;
    if (this.isExist) {
      this.obj.seconds += secondsSpent;
      // console.log(this.obj.seconds);
      this._http.put(environment.url_esctTime + this.obj.id, this.obj).subscribe();
    }
    if (!this.isExist) {
      this.obj = {
        "date": moment().format("L"),
        "seconds": secondsSpent
      }
      this._http.post(environment.url_esctTime, this.obj).subscribe();
    }
  }



}
