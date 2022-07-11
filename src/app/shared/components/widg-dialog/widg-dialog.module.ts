import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { WidgDialogService } from './widg-dialog.service';

@NgModule({
  declarations: [MessageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [MessageDialogComponent],
  providers: [WidgDialogService]
})
export class WidgDialogModule { }
