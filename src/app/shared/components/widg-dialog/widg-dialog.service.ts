import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentType } from '@angular/cdk/portal';

import { filter, takeUntil } from 'rxjs/operators';

import {
  MessageDialogData,
  MessageDialogComponent,
} from './message-dialog/message-dialog.component';
@Injectable()
export class WidgDialogService {

  constructor(
    private matDialog: MatDialog,
    private router: Router
  ) { }

  public open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig<D>,
    closeWhileNavigationEnd = true
  ): MatDialogRef<T, R> {
    const dialogRef = this.matDialog.open<T, D, R>(
      componentOrTemplateRef,
      config
    );

    if (closeWhileNavigationEnd) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(dialogRef.afterClosed())
        )
        .subscribe((event) => {
          if (dialogRef) dialogRef.close();
        });
    }

    return dialogRef;
  }

  public openMsgDialog(
    config: MatDialogConfig<Partial<MessageDialogData>>,
    closeWhileNavigationEnd = true
  ): MatDialogRef<MessageDialogComponent> {
    return this.open(MessageDialogComponent, config, closeWhileNavigationEnd);
  }
}
