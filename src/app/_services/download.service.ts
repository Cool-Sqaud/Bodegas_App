import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  private json = { //example data
    "ExmapleJSON": {
      "ATitle": "Example",
      "Div": {
        "title": "A^2*B^2=C^2",
        "ObjectList": {
          "Entries": {
            "ID": "1234124",
            "SortBy": "date",
            "Term": "Standard Generalized Markup Language",
            "Acronym": "cba",
            "Abbrev": "tmr",
            "Def": {
              "para": "A meta-markup language.",
              "List": ["Item 1", "Item 2"]
            },
          "See": "markup"
          }
        }
      }
    }
  }

  private JSONconverter(obj: any): string {
    let log = '';
    let xml = '';
    for (let prop in obj) {
      if (/[0-9]{1,}/.test(prop)) xml += obj[prop] instanceof Array ? '' : '<' + prop + '>'
      else xml += obj[prop] instanceof Array ? '' : '\n<' + prop + '>';
      
      if (obj[prop] instanceof Array) {
        for (let array in obj[prop]) {
          xml += '\n<' + prop + '>\n';
          xml += this.JSONconverter(new Object(obj[prop][array]));
          xml += '</' + prop + '>';
        }
      } else if (typeof obj[prop] == 'object') {
        xml += this.JSONconverter(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml;
  }

  public json2xml(json: any) {
    let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
    xml += this.JSONconverter(json);
    return xml;
  }

  public downloadJSON(json: any): void {
    const xml = this.json2xml(json);
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.xml';
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }
}

