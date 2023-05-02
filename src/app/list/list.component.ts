import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';

export interface TableItem {
  [key: string]: string | number;
}

const ELEMENT_DATA: TableItem[] = [
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
    column7: '?1&*('
  },
  {
    column1: 'David',
    column2: '18',
    column3: 'NOT CHUNGUS CHUNGUS CHUNGUS CHUNGUS CHUNGUS CHUNGUS',
    column4: 'EXTRA EXTRA EXTRA EXTRA',
    column5: 'something',
    column6: 'who cares',
    column7: 'Not empty!'
  }
];

@Component({
  selector: 'app-custom-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements AfterViewInit {
  columns = [
    { columnDef: 'column1', header: 'Column 1', sticky: false },
    { columnDef: 'column2', header: 'Column 2', sticky: false },
    { columnDef: 'column3', header: 'Column 3', sticky: false },
    { columnDef: 'column4', header: 'Column 4', sticky: false },
    { columnDef: 'column5', header: 'Column 5', sticky: false },
    { columnDef: 'column6', header: 'Column 6', sticky: false },
    { columnDef: 'column7', header: 'Column 7', sticky: false },
  ];
  mappedColumns : any;
  
  // This is a mat table with all the bells and whistles

  allColumns: string[] = [];
  sortOrder: 'asc' | 'desc' | '' = '';
  activeSort: string = '';
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<TableItem>(true, []);
  hiddenRows: TableItem[] = [];
  compactView = false;
  extraCompactView = false;
  superCompactView = false;
  sticky = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;

  ngOnInit() {
    this.loadConfiguration();
    this.mapColumns()
    if (this.columns) {
      this.allColumns = ['select', ...this.columns.map(column => column.columnDef)];
    }
  }

  mapColumns() {
    // add methods and metadata to columns for mat table
    this.mappedColumns = this.columns.map(column => ({
      ...column,
      cell: (row: TableItem) => `${row[column.columnDef]}`
    }));
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // Subscribe to sort events to save the configuration when the sort changes
    this.sort?.sortChange.subscribe(() => this.saveConfiguration());
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleSticky(column : any) {
    column.sticky = !column.sticky;
    this.saveConfiguration();
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
    this.saveConfiguration();
  }
  
  onRowDrop(event: CdkDragDrop<TableItem[]>) {
    // Reapply the current sort
    if (this.sort?.direction == '') {
      const prevIndex = this.dataSource.data.findIndex(d => d === event.item.data);
      moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
      this.dataSource.data = [...this.dataSource.data];
      this.table?.renderRows();
    }
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

  isRowHidden(row: TableItem) {
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
        this.saveConfiguration();
        break;
      case "extra-compact":
        this.compactView = false;
        this.extraCompactView = true;
        this.superCompactView = false;
        this.saveConfiguration();
        break;
      case "super-compact":
        this.compactView = false;
        this.extraCompactView = false;
        this.superCompactView = true;
        this.saveConfiguration();
        break;
      default:
        this.compactView = false;
        this.extraCompactView = false;
        this.superCompactView = false;
        this.saveConfiguration();
        break;
    }
  }

  loadConfiguration() {
    // load column order, views and sort from session
    const configStr = sessionStorage.getItem('listComponentSettings');
    if (configStr) {
      const config = JSON.parse(configStr);
      this.columns = config.columns;
      if (this.sort) {
        this.sort.direction = config.sortOrder;
        this.sort.active = config.activeSort;
      }
      this.compactView = config.compactView;
      this.extraCompactView = config.extraCompactView;
      this.superCompactView = config.superCompactView;
      this.allColumns = ['select', ...this.columns.map(column => column.columnDef)];
    }
  }  

  saveConfiguration() {
    // Update the 'sticky' property in 'columns' from 'mappedColumns' based on the 'columnDef'
    this.columns.forEach((column) => {
      const mappedColumn = this.mappedColumns.find((mapped: { columnDef: string; header: string; sticky: boolean }) => mapped.columnDef === column.columnDef);
      if (mappedColumn) {
        column.sticky = mappedColumn.sticky;
      }
    });
  
    // save to cache
    const settings = {
      columns: this.columns,
      compactView: this.compactView,
      extraCompactView: this.extraCompactView,
      superCompactView: this.superCompactView,
      sortOrder: this.sort?.direction,
      activeSort: this.sort?.active
    };
    
    sessionStorage.setItem('listComponentSettings', JSON.stringify(settings));
  }

  resetConfiguration() {
    this.columns = [
      { columnDef: 'column1', header: 'Column 1', sticky: false },
      { columnDef: 'column2', header: 'Column 2', sticky: false },
      { columnDef: 'column3', header: 'Column 3', sticky: false },
      { columnDef: 'column4', header: 'Column 4', sticky: false },
      { columnDef: 'column5', header: 'Column 5', sticky: false },
      { columnDef: 'column6', header: 'Column 6', sticky: false },
      { columnDef: 'column7', header: 'Column 7', sticky: false },
    ];
    this.mapColumns();
    this.allColumns = ['select', ...this.columns.map(column => column.columnDef)];
  
    if (this.sort) {
      this.sort.direction = '';
      this.sort.active = '';
    }
  
    this.compactView = false;
    this.extraCompactView = false;
    this.superCompactView = false;
  }
  
  clearCachedSettings() {
    this.resetConfiguration();
    sessionStorage.removeItem('listComponentSettings');
  }
  
}