import { Component, EventEmitter, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent implements OnInit {

  @Output() onChangeFile = new EventEmitter<string | ArrayBuffer | null>();

  public error: boolean | undefined;

  public isLoading: boolean | undefined;

  ngOnInit(): void {
    this.error = false;
    this.isLoading = false;
  }

  public onChange(event: Event) {
    this.error = false;
    this.isLoading = true;
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        this.onChangeFile.emit(base64);
      }
      reader.readAsDataURL(file);
    } else {
      this.error = true;
    }
    this.isLoading = false;
  }
}
