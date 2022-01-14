import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {

  message:any;
  constructor(private store:Store<AppState>, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.select(st=>st.weather?.msg).subscribe(message=>{
      if(message){
        this.message = message;
        this.cdr.detectChanges();
        if(message.message){
          setTimeout(this.hideMessage.bind(this),5000);
        }
        
      }
     
    });
  }
  hideMessage(){
    console.log(this);
    this.message = {};
    this.cdr.detectChanges();
  }
}
