import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Buff } from '../buff';
import { BuffCategory } from '../buffCategory';
import buffsList from '../buffsList';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { isNumber } from 'util';

@Component({
  selector:    'app-buffbuilder',
  templateUrl: './buffbuilder.component.html',
  styleUrls:   ['./buffbuilder.component.scss'],
})
@Injectable()
export class BuffbuilderComponent implements OnInit {

  pointsMax: number = 20;

  pointsAssigned: number = 0;

  requestTemplateDefault: string = `/tt Could you buff me with %Buffs%, please?`;

  requestTemplate: string = `/tt Could you buff me with %Buffs%, please?`;

  requestText: string = '';

  currentTourStep: number = 0;

  showCopyToClipboardResponse: boolean = false;

  clipboardText: string = '';

  buffsList: Array<BuffCategory>;

  buffsListPlain: Array<Buff>;

  agilityBuff: Buff = {
    name:           'Agility',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to agility attribute',
    description:    '30 to attribute per package',
  };

  constitutionBuff: Buff = {
    name:           'Constitution',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to constitution attribute',
    description:    '30 to attribute per package',
  };

  luckBuff: Buff = {
    name:           'Luck',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to luck attribute',
    description:    '30 to attribute per package',
  };

  precisionBuff: Buff = {
    name:           'Precision',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to precision attribute',
    description:    '30 to attribute per package',
  };

  staminaBuff: Buff = {
    name:           'Stamina',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to stamina attribute',
    description:    '30 to attribute per package',
  };

  strengthBuff: Buff = {
    name:           'Strength',
    cost:           1,
    maxAssignments: 10,
    assignments:    0,
    effect:         30,
    prefix:         '+',
    suffix:         ' to strength attribute',
    description:    '30 to attribute per package',
  };

  acrBuff: Buff = {
    name:           'Action Cost Reduction',
    cost:           5,
    maxAssignments: 1,
    assignments:    0,
    effect:         9,
    prefix:         '',
    suffix:         '% bonus in reducing all action costs',
    description:    '9% bonus per package in reducing all action costs',
  };

  critHitBuff: Buff = {
    name:           'Critical Hit',
    cost:           5,
    maxAssignments: 1,
    assignments:    0,
    effect:         7,
    prefix:         '',
    suffix:         '% bonus to critical hit chance',
    description:    '7% bonus per package to critical hit chance',
  };

  critHitDefenseBuff: Buff = {
    name:           'Critical Hit Defense',
    cost:           5,
    maxAssignments: 1,
    assignments:    0,
    effect:         7,
    prefix:         '',
    suffix:         '% bonus to critical hit defense',
    description:    '7% bonus per package to critical hit defense',
  };

  glancingBlowBuff: Buff = {
    name:           'Glancing Blow',
    cost:           5,
    maxAssignments: 1,
    assignments:    0,
    effect:         7,
    prefix:         '',
    suffix:         '% bonus to glancing blow',
    description:    '7% bonus per package to glancing blow',
  };

  flushWithSuccessBuff: Buff = {
    name:           'Flush With Success',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         3,
    prefix:         '',
    suffix:         '% increased experience gain',
    description:    '3% increase per package in the amount of experience and GCW points earned (ground and space)',
  };

  harvestFaireBuff: Buff = {
    name:           'Harvest Faire',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         1,
    prefix:         '',
    suffix:         '% increase on the number of resources gathered with harvesters',
    description:    '1% increase per package on the number of resources gathered with harvesters',
  };

  healerBuff: Buff = {
    name:           'Healer',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         3,
    prefix:         'Increase the strength of your healing by ',
    suffix:         '%',
    description:    'Increase the strength of your heals by 3% per package',
  };

  resilienceBuff: Buff = {
    name:           'Resilience',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         4,
    prefix:         'Damage received by damage over time effects reduced by ',
    suffix:         '%',
    description:    'Reduce the amount of damage received by damage over time effects by 4% per package',
  };

  goWithTheFlowBuff: Buff = {
    name:           'Go With The Flow',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         5,
    prefix:         '',
    suffix:         '% increase to all movement rates',
    description:    'Increase all movement rates by 5% per package',
  };

  secondChanceBuff: Buff = {
    name:           'Second Chance',
    cost:           2,
    maxAssignments: 4,
    assignments:    0,
    effect:         6,
    prefix:         '',
    suffix:         '% chance to automatically heal damage when struck in combat',
    description:    '6% chance per package to automatically heal damage when hit in combat',
  };

  camouflageDetectionBuff: Buff = {
    name:           'Camouflage Detection',
    cost:           1,
    maxAssignments: 5,
    assignments:    0,
    effect:         20,
    prefix:         '+',
    suffix:         ' increase in Camouflage Detection.',
    description:    '+20 increase in Camouflage Detection per package.',
  };

  elementalBuff: Buff = {
    name:           'Elemental',
    cost:           1,
    maxAssignments: 5,
    assignments:    0,
    effect:         750,
    prefix:         '+',
    suffix:         ' to resistance',
    description:    '750 to resistance per package',
  };

  energyBuff: Buff = {
    name:           'Energy',
    cost:           1,
    maxAssignments: 5,
    assignments:    0,
    effect:         750,
    prefix:         '+',
    suffix:         ' to Energy protection',
    description:    '750 to resistance per package',
  };

  kineticBuff: Buff = {
    name:           'Kinetic',
    cost:           1,
    maxAssignments: 5,
    assignments:    0,
    effect:         750,
    prefix:         '+',
    suffix:         ' to Kinetic protection',
    description:    '750 to resistance per package',
  };

  craftingAssemblyBuff: Buff = {
    name:           'Crafting Assembly',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         2,
    prefix:         '+',
    suffix:         ' increase to Assembly and Experience gain for all types of crafting',
    description:    '+2 increase to Assembly and Experience gain for all types of crafting per package',
  };

  amazingSuccessChanceBuff: Buff = {
    name:           'Amazing Success Chance',
    cost:           5,
    maxAssignments: 2,
    assignments:    0,
    effect:         2,
    prefix:         '',
    suffix:         '% bonus to Amazing Success crafting results',
    description:    '2% bonus to Amazing Success crafting results per package',
  };

  handSamplingBuff: Buff = {
    name:           'Hand Sampling',
    cost:           2,
    maxAssignments: 5,
    assignments:    0,
    effect:         4,
    prefix:         '',
    suffix:         '% increase to the number of resources gathered through hand sampling',
    description:    '4% increase to the number of resources gathered through hand sampling per package',
  };

  reverseEngineeringEfficiencyBuff: Buff = {
    name:           'Reverse Engineering Efficiency',
    cost:           5,
    maxAssignments: 2,
    assignments:    0,
    effect:         20,
    prefix:         '+',
    suffix:         ' increase in Reverse Engineering Efficiency',
    description:    '+20 increase in Reverse Engineering Efficiency per package.',
  };

  buffList: Array<Buff>;

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    if (window.location.href.indexOf('localhost') === -1) {
      http.post('statistics.php', {
        'href': window.location.href,
        'pathname': window.location.pathname,
        'search': window.location.search,
      }, httpOptions).subscribe(
        () => {
        }, // success path
        error => { // error path
          console.log(error);
        }
      );
    }

    this.buffsList = buffsList;

    this.buffsListPlain = [];
    this.buffsList.forEach((buffCategory) => {
      buffCategory.buffs.forEach((buff) => {
        this.buffsListPlain.push(buff);
      });
    });
  }

  ngOnInit() {
    this.getParamFromUrl();

    this.loadTemplateFromStorage();

    this.updateRequestText();

    if (localStorage.getItem('tourClosed') !== '1') {
      this.tourStep(1);
    }
  }

  addBuff(buff: Buff) {
    if (this.pointsAssigned + buff.cost > this.pointsMax) {
      console.log("Would exceed maximum points");
      return;
    }

    if (buff.assignments >= buff.maxAssignments) {
      console.log("Would exceed maximum assignments");
      return;
    }

    buff.assignments = buff.assignments + 1;

    this.calcPointsAssigned();

    this.updateRequestText();
  }

  removeBuff(buff: Buff) {
    if (buff.assignments <= 0) {
      console.log("Would exceed zero assignments");
      return;
    }

    buff.assignments = buff.assignments - 1;

    this.calcPointsAssigned();

    this.updateRequestText();
  }

  calcPointsAssigned() {
    let pointsAssigned = 0;

    this.buffsListPlain.forEach((buff) => {
      pointsAssigned += (buff.assignments * buff.cost);
    });

    this.pointsAssigned = pointsAssigned;
  }

  clearAll() {
    this.buffsListPlain.forEach((buff) => {
      buff.assignments = 0;
    });

    this.calcPointsAssigned();

    this.updateRequestText();
  }

  updateRequestText() {
    let buffTexts = [];

    this.buffsListPlain.forEach((buff) => {
      BuffbuilderComponent.buildBuffText(buff, buffTexts);
    });

    if (buffTexts.length === 0) {
      this.requestText = '';
      return;
    }

    let buffText   = '';
    let buffTextLC = '';
    buffTexts.forEach((value, index) => {
      if (index === 0) {
        buffText += value;
        buffTextLC += value.toLowerCase();
      } else if (index === buffTexts.length - 1) {
        buffText += ` and ${value}`;
        buffTextLC += ` and ${value.toLowerCase()}`;
      } else {
        buffText += `, ${value}`;
        buffTextLC += `, ${value.toLowerCase()}`;
      }
    });

    this.requestText = this.requestTemplate.replace('%Buffs%', buffText).replace('%buffs%', buffTextLC);
  }

  static buildBuffText(buff: Buff, buffTexts: Array<string>) {
    if (buff.assignments > 0) {
      buffTexts.push(`${buff.name} (${buff.assignments}/${buff.maxAssignments})`);
    }
  }

  applyRequestTemplate() {
    this.saveTemplateToStorage();
    this.updateRequestText();
  }

  resetRequestTemplate() {
    this.requestTemplate = this.requestTemplateDefault;
    this.saveTemplateToStorage();
    this.updateRequestText();
  }

  copyRequestToClipboard() {
    const el = document.createElement('textarea');    // Create a <textarea> element
    el.value = this.requestText;                      // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                  // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left     = '-9999px';                    // Move outside the screen to make it invisible
    document.body.appendChild(el);                    // Append the <textarea> element to the HTML document
    const selected =
            document.getSelection().rangeCount > 0    // Check if there is any content selected previously
              ? document.getSelection().getRangeAt(0) // Store selection if found
              : false;                                // Mark as false to know no selection existed before
    el.select();                                      // Select the <textarea> content
    document.execCommand('copy');                     // Copy - only works as a result of a user action (e.g. click events)
    this.clipboardText = el.value;                    // Store copied text in local variable
    document.body.removeChild(el);                    // Remove the <textarea> element
    if (selected) {                                   // If a selection existed before copying
      document.getSelection().removeAllRanges();      // Unselect everything on the HTML document
      document.getSelection().addRange(selected);     // Restore the original selection
    }

    if (this.clipboardText) {
      this.showCopyToClipboardResponse = true;
      setTimeout(() => {
        this.showCopyToClipboardResponse = false;
      }, 5000);
    }
  }

  saveRequestToUrl() {
    const param = this.buildUrlParam();
    window.location.href = BuffbuilderComponent.updateQueryString(false, 'q', param);
  }

  buildUrlParam(): string {
    const buffs = [];

    this.buffsListPlain.forEach((buff) => {
      buffs.push(buff.assignments);
    });

    return buffs.join('|');
  }

  getParamFromUrl() {
    const param = BuffbuilderComponent.getUrlParam('q');
    if (!param) {
      return;
    }

    const paramArray = param.split('|');

    paramArray.forEach((value, index) => {
      const buff = this.buffsListPlain[index];
      let loadedValue = parseInt(value);
      if (isNaN(loadedValue)) {
        loadedValue = 0;
      }
      else if (loadedValue > buff.maxAssignments) {
        loadedValue = buff.maxAssignments;
      }
      else if (loadedValue < 0) {
        loadedValue = 0;
      }
      buff.assignments = loadedValue;
    });

    this.calcPointsAssigned();

    this.updateRequestText();
  }

  static getUrlParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    const regexS = "[\\?&]"+name+"=([^&#]*)";
    const regex = new RegExp( regexS );
    const results = regex.exec( url );
    return results == null ? null : results[1];
  }

  /**
   * Add or update a query string parameter. If no URI is given, we use the current
   * window.location.href value for the URI.
   *
   * Based on the DOM URL parser described here:
   * http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
   *
   * @param   uri     Optional: The URI to add or update a parameter in
   * @param   key     The key to add or update
   * @param   value   The new value to set for key
   *
   * Tested on Chrome 34, Firefox 29, IE 7 and 11
   */
  static updateQueryString(uri, key, value) {

    // Use window URL if no query string is provided
    if (!uri) {
      uri = window.location.href;
    }

    // Create a dummy element to parse the URI with
    let a = document.createElement('a'),

      // match the key, optional square bracktes, an equals sign or end of string, the optional value
      reg_ex    = new RegExp(key + '((?:\\[[^\\]]*\\])?)(=|$)(.*)'),

      // Setup some additional variables
      qs,
      qs_len,
      key_found = false;

    // Use the JS API to parse the URI
    a.href = uri;

    // If the URI doesn't have a query string, add it and return
    if (!a.search) {
      a.search = '?' + key + '=' + value;
      return a.href;
    }

    // Split the query string by ampersands
    qs     = a.search.replace(/^\?/, '').split(/&(?:amp;)?/);
    qs_len = qs.length;

    // Loop through each query string part
    while (qs_len > 0) {
      qs_len--;

      // Check if the current part matches our key
      if (reg_ex.test(qs[qs_len])) {

        // Replace the current value
        qs[qs_len] = qs[qs_len].replace(reg_ex, key + '$1') + '=' + value;

        key_found = true;
      }
    }

    // If we haven't replaced any occurences above, add the new parameter and value
    if (!key_found) {
      qs.push(key + '=' + value);
    }

    // Set the new query string
    a.search = '?' + qs.join('&');

    return a.href;
  }

  saveTemplateToStorage() {
    localStorage.setItem('template', this.requestTemplate);
  }

  loadTemplateFromStorage() {
    const template = localStorage.getItem('template');
    if (template) {
      this.requestTemplate = template;
    }
  }

  enableTour() {
    localStorage.setItem('tourClosed', '0');
    this.tourStep(1);
  }

  tourStep(step: number) {
    this.currentTourStep = step;

    setTimeout(() => {
      switch (step) {
        case -1:
          localStorage.setItem('tourClosed', '1');
          break;
        case 1:
          BuffbuilderComponent.positionTourStep('tour-1', 'mainDialog', 5, 25);
          break;
        case 2:
          BuffbuilderComponent.positionTourStep('tour-2', 'assignments', 15, 38);
          break;
        case 3:
          BuffbuilderComponent.positionTourStep('tour-3', 'selectedBuffs', 15, 35);
          break;
        case 4:
          BuffbuilderComponent.positionTourStep('tour-4', 'copyToClipboardButton', 0, 35);
          break;
        case 5:
          BuffbuilderComponent.positionTourStep('tour-5', 'saveToUrlButton', 0, 35);
          break;
        case 6:
          BuffbuilderComponent.positionTourStep('tour-6', 'applyTemplateButton', 0, 35);
          break;
        case 7:
          BuffbuilderComponent.positionTourStep('tour-7', 'mainDialog', 5, 25);
          break;
      }
    }, 10);
  }

  static positionTourStep(tourId, containerId, offsetX, offsetY) {
    const tourEl = document.getElementById(tourId);

    const assignmentsEl = document.getElementById(containerId);
    const assignemntsRect = assignmentsEl.getBoundingClientRect();

    const bodyRect = document.body.getBoundingClientRect();
    const assignmentOffsetTop = assignemntsRect.top - bodyRect.top;
    const assignmentOffsetLeft = assignemntsRect.left - bodyRect.left;
    const margin = 28;

    setTimeout(() => {
      tourEl.style.left = (assignmentOffsetLeft + offsetX) + 'px';
      tourEl.style.top = (assignmentOffsetTop + offsetY - margin) + 'px';

      tourEl.classList.remove('d-none');

      BuffbuilderComponent.animateTourItem(tourEl);
    }, 10);
  }

  static animateTourItem(tourEl) {
    const clone = tourEl.cloneNode(true);
    clone.classList.add('tourClone');
    const body = document.getElementById('body');
    body.appendChild(clone);

    BuffbuilderComponent.scrollIntoViewIfOutOfView(clone);

    setTimeout(() => {
      body.removeChild(clone);
    }, 100);
  }

  static scrollIntoViewIfOutOfView(el) {
    const topOfPage = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const heightOfPage = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let elY = 0;
    for(let p=el; p&&p.tagName!='BODY'; p=p.offsetParent){
      elY += p.offsetTop;
    }
    const elH = el.offsetHeight;
    let options = { behavior: 'smooth', block: 'end' };
    if ((topOfPage + heightOfPage) < (elY + elH)) {
      options.block = 'end';
      el.scrollIntoView(options);
    }
    else if (elY < topOfPage) {
      options.block = 'start';
      el.scrollIntoView(options);
    }
  }
}
