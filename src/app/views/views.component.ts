import { ViewmoreComponent } from './../viewmore/viewmore.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})

export class ViewsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['Name', 'Country', 'Time_Left', 'Consultation_DateTime', 'Action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  arr: any;
  // d: Date; e: Date;
  interval;
  // timeLeft: number = 0;
  timeCount: number = 0;
  dueTime: any[] = [];
  currTime: any[] = [];
  timeLeft: any[] = [];
  startTime: any;
  endTime: any;
  isExist: boolean = false;
  obj: any = {}
  constructor(protected _http: HttpClient, public _dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    // this.interval = setInterval(() => {
    //   this.timeLeft++;
    // }, 1000)
    // this.d = new Date();

    this._http.get<any[]>(environment.url_time).subscribe(obs => {
      obs.forEach(element => {
        if (element.date == moment().format("L")) {
          this.isExist = true;
          this.obj = element;
        }
      });
    });
    this.startTime = moment().format("L HH:mm:ss");
    this._http.get(environment.url).subscribe((res1: any[]) => {
      // console.log(res1);
      this.dataSource.data = res1;
      res1.forEach(i => {
        this.currTime.push(moment().format("H"));
        this.dueTime.push(moment(i.Consultation_DateTime).add(8, 'hour').format("H"));
        // console.log(this.dueTime,this.currTime);

      });

      for (let j = 0; j < this.currTime.length; j++) {

        Number.parseInt(this.currTime[j]);
        Number.parseInt(this.dueTime[j]);
        this.timeLeft.push(this.currTime[j] - this.dueTime[j]);
        this.dataSource.data[j].Time_Left = this.timeLeft[j];
      }


      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

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


  openDialog(Details): void {
    this._dialog.open(ViewmoreComponent, {
      data: Details
    });
  }


  ngOnDestroy() {
    // this.e = new Date();
    // console.log(this.e.getHours() - this.d.getHours(), this.e.getMinutes() - this.d.getMinutes(), this.e.getSeconds() - this.d.getSeconds());
    // clearInterval(this.interval);
    // console.log(this.timeLeft);
    this.endTime = moment().format("L HH:mm:ss");
    let secondsSpent = moment(this.endTime, "L HH:mm:ss").diff(moment(this.startTime, "L HH:mm:ss"));
    secondsSpent /= 1000;
    if (this.isExist) {
      this.obj.seconds += secondsSpent;
      // console.log(this.obj.seconds);
      this._http.put(environment.url_time + this.obj.id, this.obj).subscribe();
    }
    if (!this.isExist) {
      this.obj = {
        "date": moment().format("L"),
        "seconds": secondsSpent
      }
      this._http.post(environment.url_time, this.obj).subscribe();
    }
  }



}
