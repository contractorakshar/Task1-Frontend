import { ViewmoreComponent } from './../viewmore/viewmore.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(public _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.arr = JSON.parse(localStorage.getItem('Escalate'));
    // console.log(JSON.parse(localStorage.getItem('Escalate')));
    this.dataSource.data = this.arr;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log(this.arr);
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


}
