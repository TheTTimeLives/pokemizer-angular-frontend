import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { ResizeEvent } from 'angular-resizable-element';

export interface ListItem {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

// Add your existing ELEMENT_DATA here
const ELEMENT_DATA: ListItem[] = [
  // Add your list data here
  {
    column1: 'Adam with a really long name and it is really long',
    column2: '23',
    column3: 'CHUNGUS',
    column4: 'EXTRA EXTRA EXTRA EXTRA',
    column5: 'something',
    column6: 'who cares',
    column7: ''
  },
  {
    column1: 'Brandon',
    column2: '22',
    column3: 'NOT CHUNGUS',
    column4: 'EXTRA EXTRA EXTRA EXTRA',
    column5: 'something',
    column6: 'who cares',
    column7: ''
  },
  {
    column1: 'Chad',
    column2: '143y278664873264873232746732687432647326874',
    column3: 'CHUNGUS',
    column4: 'EXTRA EXTRA EXTRA EXTRA',
    column5: 'something',
    column6: 'who cares',
    column7: ''
  },
  {
    column1: 'David',
    column2: '18',
    column3: 'NOT CHUNGUS CHUNGUS CHUNGUS CHUNGUS CHUNGUS CHUNGUS',
    column4: 'EXTRA EXTRA EXTRA EXTRA',
    column5: 'something',
    column6: 'who cares',
    column7: ''
  }
];

@Component({
  selector: 'app-custom-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
  // encapsulation: ViewEncapsulation.None
})
export class ListComponent implements AfterViewInit {
  // Define the columns
  columns = [
    { columnDef: 'column1', header: 'Column 1', cell: (row: ListItem) => `${row.column1}`, sticky: false },
    { columnDef: 'column2', header: 'Column 2', cell: (row: ListItem) => `${row.column2}`, sticky: false },
    { columnDef: 'column3', header: 'Column 3', cell: (row: ListItem) => `${row.column3}`, sticky: false },
    { columnDef: 'column4', header: 'Column 4', cell: (row: ListItem) => `${row.column3}`, sticky: false },
    { columnDef: 'column5', header: 'Column 5', cell: (row: ListItem) => `${row.column3}`, sticky: false },
    { columnDef: 'column6', header: 'Column 6', cell: (row: ListItem) => `${row.column3}`, sticky: false },
    { columnDef: 'column7', header: 'Column 7', cell: (row: ListItem) => `${row.column3}`, sticky: false },

  ];

  allColumns: string[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<ListItem>(true, []);
  hiddenRows: ListItem[] = [];
  compactView = false;
  extraCompactView = false;
  superCompactView = false;
  sticky = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;

  ngOnInit() {
    this.allColumns = ['select', ...this.columns.map(column => column.columnDef)];
  }

  ngAfterViewInit() {
    console.log("Sort?")
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleSticky(column : any) {
    column.sticky = !column.sticky;
  }

  moveColumn(column: any, direction: 'left' | 'right') {
    const columnIndex = this.columns.findIndex(col => col.columnDef === column.columnDef);
    const targetIndex = direction === 'left' ? columnIndex - 1 : columnIndex + 1;
  
    // Check if target index is within the valid range
    if (targetIndex >= 0 && targetIndex < this.columns.length) {
      // Swap columns
      [this.columns[columnIndex], this.columns[targetIndex]] = [this.columns[targetIndex], this.columns[columnIndex]];
      // Update the allColumns array
      this.allColumns = ['select', ...this.columns.map(col => col.columnDef)];
    }
  }
  
  onRowDrop(event: CdkDragDrop<ListItem[]>) {
    // Reapply the current sort
    if (this.sort?.direction == '') {
      const prevIndex = this.dataSource.data.findIndex(d => d === event.item.data);
      moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
      this.dataSource.data = [...this.dataSource.data];
      this.table?.renderRows();
    }
  }

  onResizeEnd(event: ResizeEvent, column: any): void {
    if (event.edges.right) {
      const newWidth = event.rectangle.width;
      column.width = newWidth + 'px';
    }
  }
  
  validateResize(event: ResizeEvent): boolean {
    const MIN_COLUMN_WIDTH = 50;
    if (event.rectangle.width && event.rectangle.width < MIN_COLUMN_WIDTH) {
      return false;
    }
    return true;
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

  toggleView(view: string) {
    switch (view) {
      case "compact":
        this.compactView = true;
        this.extraCompactView = false;
        this.superCompactView = false;
        break;
      case "extra-compact":
        this.compactView = false;
        this.extraCompactView = true;
        this.superCompactView = false;
        break;
      case "super-compact":
        this.compactView = false;
        this.extraCompactView = false;
        this.superCompactView = true;
        break;
      default:
        this.compactView = false;
        this.extraCompactView = false;
        this.superCompactView = false;
        break;
    }
  }
  
}