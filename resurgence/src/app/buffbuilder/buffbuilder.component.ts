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

  pointsMax: number = 40;

  pointsAssigned: number = 0;

  requestTemplateDefault: string = `/tt Could you buff me with %Buffs%, please?`;

  requestTemplate: string = `/tt Could you buff me with %Buffs%, please?`;

  requestText: string = '';

  currentTourStep: number = 0;

  showCopyToClipboardResponse: boolean = false;

  clipboardText: string = '';

  buffsList: Array<BuffCategory>;

  buffsListPlain: Array<Buff>;

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
    let botBuffTexts = [];

    this.buffsListPlain.forEach((buff) => {
      BuffbuilderComponent.buildBuffText(buff, buffTexts);
      BuffbuilderComponent.buildBotBuffText(buff, botBuffTexts);
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

    let botbuffsText = '';
    botBuffTexts.forEach((value, index) => {
      if (index === 0) {
        botbuffsText += value;
      } else {
        botbuffsText += `|${value}`;
      }
    });

    this.requestText = this.requestTemplate.replace('%Buffs%', buffText).replace('%buffs%', buffTextLC).replace('%botbuffs%', botbuffsText);
  }

  static buildBuffText(buff: Buff, buffTexts: Array<string>) {
    if (buff.assignments > 0) {
      buffTexts.push(`${buff.name} (${buff.assignments}/${buff.maxAssignments})`);
    }
  }

  static buildBotBuffText(buff: Buff, buffTexts: Array<string>) {
    if (buff.assignments > 0) {
      buffTexts.push(`${buff.name},${buff.assignments}`);
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
