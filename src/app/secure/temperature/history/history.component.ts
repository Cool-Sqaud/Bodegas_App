import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';
import { TemperatureInt } from 'src/app/interfaces';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class TemperatureHistoryComponent implements OnInit {
  station: FormGroup = new FormGroup({
    name: new FormControl(null),
  });

  loadedMeasurements = false;
  someHistoricResults: Array<TemperatureInt> = [];
  someHistoricResultsProper: Array<TemperatureInt> = [];
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
          this.someHistoricResultsProper = result;
          this.loadedMeasurements = true;
        }
      )
  }

  onSubmit(): void {
    console.log('test');
    this.loadedMeasurements = false;
    if (this.station.value.name) {
      if (isNaN(this.station.value.name)) {
        this.someHistoricResultsProper = this.searchCountry(this.station.value.name);
      }
      else {
        this.someHistoricResultsProper = this.searchStation(this.station.value.name);
      }
    }
    else this.someHistoricResultsProper = this.someHistoricResults;
    console.log('test3');
    this.loadedMeasurements = true;
  }

  getStation = (stationnumber: string, measurementDate: Date | null = null) => {
    const measurement = this.someHistoricResults.find((measurement) => measurement.date === measurementDate && measurement.station === stationnumber)
    this.selectedMeasurement = measurement ?? null;
  }

searchCountry = (countryname: string) => this.someHistoricResults.filter(
  (measurement) => measurement.country == countryname)


searchStation = (stationnumber: string) => this.someHistoricResults.filter(
  (measurement) => measurement.station == stationnumber)


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

  getDirection(angle: number) {
    if (angle === null) return "Unknown"
    if (angle >= 348.75 || angle < 11.25) return "N";
    if (angle < 33.75) return "NNE";
    if (angle < 56.25) return "NE";
    if (angle < 78.75) return "ENE";
    if (angle < 101.25) return "E";
    if (angle < 123.75) return "ESE";
    if (angle < 146.25) return "SE";
    if (angle < 168.75) return "SSE";
    if (angle < 191.25) return "S";
    if (angle < 213.75) return "SSW";
    if (angle < 236.25) return "SW";
    if (angle < 258.75) return "WSW";
    if (angle < 281.25) return "W";
    if (angle < 303.75) return "WNW";
    if (angle < 326.25) return "NW";
    return "NNW";
  }

  countrySyntax(country: string) {
    const split = country.split(',');
    return [split[1], split[0]].join(' ').slice(1);
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
