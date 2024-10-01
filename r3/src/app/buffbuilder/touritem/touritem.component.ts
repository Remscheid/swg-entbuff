import { Component, OnInit, Input, Inject, forwardRef  } from '@angular/core';

import { BuffbuilderComponent } from '../buffbuilder.component';

@Component({
  selector: 'app-touritem',
  templateUrl: './touritem.component.html',
  styleUrls: ['./touritem.component.scss']
})
export class TouritemComponent implements OnInit {

  @Input() parent: BuffbuilderComponent;

  constructor() { }

  ngOnInit() {
  }

}
