import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css'
})
export class MatDialogComponent implements OnInit {

constructor(public dialogRef: MatDialogRef<MatDialogComponent>) {}
  ngOnInit(): void {
    
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
