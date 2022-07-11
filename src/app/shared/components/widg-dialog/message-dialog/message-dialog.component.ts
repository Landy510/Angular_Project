import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export const MSG_DLG_BTN_CANCEL = 0;
export const MSG_DLG_BTN_OK = 1;

export class MessageDialogData {
  title: string| undefined;

  message: string | undefined;

  positiveButtonText: string | undefined;

  negativeButtonText: string | undefined;
}

export class MessageDialogDataBuilder {
  private data: MessageDialogData;

  constructor() {
    this.data = new MessageDialogData();
  }

  setTitle(title: string): MessageDialogDataBuilder {
    this.data.title = title;
    return this;
  }

  setMessage(message: string): MessageDialogDataBuilder {
    this.data.message = message;
    return this;
  }

  setPositiveButton(text: string): MessageDialogDataBuilder {
    this.data.positiveButtonText = text;
    return this;
  }

  setNegativeButton(text: string): MessageDialogDataBuilder {
    this.data.negativeButtonText = text;
    return this;
  }

  create(): MessageDialogData {
    return this.data;
  }
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(MSG_DLG_BTN_CANCEL);
  }

  onOk(): void {
    this.dialogRef.close(MSG_DLG_BTN_OK);
  }

}
