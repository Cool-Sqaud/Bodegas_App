import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class TemperatureHistoryComponent implements OnInit {

  loadedMeasurements = false;
  someHistoricResults: Array<any> = [];
  selectedMeasurement: any | null = null;

  constructor(
    private bodegasService: BodegasService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHistoricTemperatureMeasurements()
      .subscribe(
        (result: any) => {
          this.someHistoricResults = result;
          this.loadedMeasurements = true;
        }
      )
  }

  getStation = (stationnumber: string, measurementDate: string | null = null) => {
    const measurement = this.someHistoricResults.find((measurement) => measurement.date === measurementDate && measurement.station === stationnumber)
    this.selectedMeasurement = measurement ?? null;
  }

  getState = (frshtt: string) => {
    let res = [];
    if (frshtt[0] === '1') res.push('Fog');
    if (frshtt[1] === '1') res.push('Raining');
    if (frshtt[2] === '1') res.push('Snowing');
    if (frshtt[3] === '1') res.push('Hail');
    if (frshtt[4] === '1') res.push('Thunder');
    if (frshtt[5] === '1') res.push('Tornado');

    if (res.length === 0) return 'None';
    else return res.join(', ');
  }

  getDirection = (windDirection: number) => {
    switch (true) {
      case windDirection >= 348.75 && windDirection < 11.25: return "N";
      case windDirection >= 11.25 && windDirection < 33.75: return "NNE";
      case windDirection >= 33.75 && windDirection < 56.25: return "NE";
      case windDirection >= 56.25 && windDirection < 78.75: return "ENE";
      case windDirection >= 78.75 && windDirection < 101.25: return "E";
      case windDirection >= 101.25 && windDirection < 123.75: return "ESE";
      case windDirection >= 123.75 && windDirection < 146.25: return "SE";
      case windDirection >= 146.25 && windDirection < 168.75: return "SSE";
      case windDirection >= 168.75 && windDirection < 191.25: return "S";
      case windDirection >= 191.25 && windDirection < 213.75: return "SSW";
      case windDirection >= 213.75 && windDirection < 236.25: return "SW";
      case windDirection >= 236.25 && windDirection < 258.75: return "WSW";
      case windDirection >= 258.75 && windDirection < 281.25: return "W";
      case windDirection >= 281.25 && windDirection < 303.75: return "WNW";
      case windDirection >= 303.75 && windDirection < 326.25: return "NW";
      default: return "NNW";
    }
  }

  download() {
    const downloadableData: any = [];
    this.someHistoricResults.forEach(result => {
      let resultJSON = {
        'measurement': {
          'station': result['station'],
          'date': result['date'],
          'time': result['time'],
          'location': {
            'country': result['country'],
            'longitude': result['longitude'],
            'latitude': result['latitude'],
            'elevation': result['elevation'],
          },
          'temperature': result['temp'],
          'remaining-data': {
            'dewpoint': result['dewp'],
            'air-pressure-station': result['slp'],
            'air-pressure-sea': result['stp'],
            'visibility': result['visib'],
            'wind-speed': result['wdsp'],
            'rainfall': result['prcp'],
            'snow-depth': result['sndp'],
            'frshtt': result['frshtt'],
            'cloud-coverage': result['cldc'],
            'wind-direction': result['winddir'],
          }
        }
      };
      downloadableData.push(resultJSON);
    })
    this.downloadService.downloadJSON(downloadableData, 'minimum-temperature');
  }
}
