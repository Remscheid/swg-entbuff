import { Component, OnInit, Input, Inject, forwardRef  } from '@angular/core';

import { BuffbuilderComponent } from '../buffbuilder.component';
import { Buff } from '../../buff';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @Input() buff: Buff;

  @Input() parent: BuffbuilderComponent;

  constructor() { }

  ngOnInit() {
  }

}
