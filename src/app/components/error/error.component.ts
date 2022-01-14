import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'], 
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  errorMsg:any;
  constructor(private store:Store<AppState>, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.select(err=>err.error).subscribe(er=>{
      if(!er) return;
      this.errorMsg = er;
      this.cdr.detectChanges();
      if(er.error){
        setTimeout(this.hideMessage.bind(this),10000);
      }
    });
  }

  hideMessage(){
    this.errorMsg = {};
    this.cdr.detectChanges();
  }
}
