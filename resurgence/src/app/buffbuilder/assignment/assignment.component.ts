import { Component, OnInit, Input, Inject, forwardRef  } from '@angular/core';

import { BuffbuilderComponent } from '../buffbuilder.component';
import { Buff } from '../../buff';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  @Input() buff: Buff;

  @Input() parent: BuffbuilderComponent;

  constructor() { }

  ngOnInit() {
  }

  effectSum(buff) {
    if (buff.effect > 0) {
      return buff.assignments * buff.effect;
    }
    return '';
  }
}
