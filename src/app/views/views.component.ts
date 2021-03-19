import { ViewmoreComponent } from './../viewmore/viewmore.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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
  timeLeft: number = 0;
  constructor(protected _http: HttpClient, public _dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.interval = setInterval(() => {
      this.timeLeft++;
    }, 1000)
    // this.d = new Date();

    this._http.get(environment.ApiLink).subscribe((res) => {
      this.arr = res;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      localStorage.setItem('Data', JSON.stringify(this.arr));

      // this.arr = JSON.parse(localStorage.getItem('Data'));
      // console.log(this.arr);
      this.dataSource.data = this.arr;
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
    clearInterval(this.interval);
    // console.log(this.timeLeft);
  }



}
