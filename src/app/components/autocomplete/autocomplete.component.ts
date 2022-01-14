import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { city } from 'src/app/model/city';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  @Output()
  SelectEvent = new EventEmitter<city>();
  @Input()
  cities: city[];
  @Input()
  show: boolean;
  constructor(private store: Store) {
    this.cities = [];
    this.show = false;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes?.cities?.currentValue?.length == 1){
  //     this.selectItem(changes.cities.currentValue[0]);
  //   }
  // }

  selectItem(item: city) {
    this.SelectEvent.next(item);
    this.cities = new Array<city>();
  }

}
