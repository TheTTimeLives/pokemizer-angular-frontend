import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';

export interface ListItem {
  column1: string;
  column2: string;
  column3: string;
}

// Add your existing ELEMENT_DATA here
const ELEMENT_DATA: ListItem[] = [
  // Add your list data here
  {
    column1: 'Adam',
    column2: '23',
    column3: 'CHUNGUS'
  },
  {
    column1: 'Brandon',
    column2: '22',
    column3: 'NOT CHUNGUS'
  },
  {
    column1: 'Chad',
    column2: '1',
    column3: 'CHUNGUS'
  },
  {
    column1: 'David',
    column2: '18',
    column3: 'NOT CHUNGUS'
  }
];

@Component({
  selector: 'app-custom-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['column1', 'column2', 'column3'];

  // Define the columns
  columns = [
    { columnDef: 'column1', header: 'Column 1', cell: (row: ListItem) => `${row.column1}` },
    { columnDef: 'column2', header: 'Column 2', cell: (row: ListItem) => `${row.column2}` },
    { columnDef: 'column3', header: 'Column 3', cell: (row: ListItem) => `${row.column3}` },
  ];

  allColumns: string[] = ['select', ...this.displayedColumns];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<ListItem>(true, []);
  hiddenRows: ListItem[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowDrop(event: CdkDragDrop<ListItem[]>) {
    const prevIndex = this.dataSource.data.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    this.dataSource
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  hideSelectedRows() {
    this.hiddenRows = this.hiddenRows.concat(this.selection.selected);
    this.selection.clear();
  }

  isRowHidden(row: ListItem) {
    return this.hiddenRows.includes(row);
  }

  unhideRows() {
    this.hiddenRows = [];
  }
}
