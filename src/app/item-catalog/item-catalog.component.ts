import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-item-catalog',
  templateUrl: './item-catalog.component.html',
  styleUrls: ['./item-catalog.component.scss']
})
export class ItemCatalogComponent implements OnInit {
  @Input() state: StateService;
  constructor() { }

  ngOnInit(): void {

  }

}
