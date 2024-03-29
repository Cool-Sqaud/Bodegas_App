import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {
  search: FormGroup = new FormGroup({
    filter: new FormControl(null),
  });

  loadedMeasurements = false;
  rawMeasurements: Array<any> = [];
  sortedMeasurements: Array<any> = [];
  selectedMeasurement: any = null;

  sortSettings: [String, String] = ['Date', 'DESC'];

  constructor(
    private bodegasService: BodegasService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHumidityMeasurements()
        .subscribe(
          (result: any) => {
            result.forEach((measurement: any) => {
              measurement.country = this.countrySyntax(measurement.country);
              measurement.humidity = this.getHumidity(measurement.temp, measurement.dewp)
            });
            this.rawMeasurements = this.sortedMeasurements = result;
            this.sortByHumidity();
            this.rawMeasurements = this.sortedMeasurements = this.rawMeasurements.slice(0, 10);
            this.loadedMeasurements = true;
          } 
        )   
  }

  filter(): void {
    const filter = this.search.value.filter.toLowerCase();
    if (filter) {
      this.sortedMeasurements = this.rawMeasurements.filter(measurement => {
        if (measurement.station.toLowerCase().includes(filter)) return measurement;
        if (measurement.country.toLowerCase().includes(filter)) return measurement;
        if (measurement.date.toString().toLowerCase().includes(filter)) return measurement;
        return;
      });
    }
    else this.sortedMeasurements = this.rawMeasurements;
  }

  sortByStation() {
    this.sortedMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Station' && this.sortSettings[1] === 'DESC') 
        return a.station > b.station ? 1 : a.station < b.station ? -1 : 0;
      return a.station > b.station ? -1 : a.station < b.station ? 1 : 0;
    });
    this.rawMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Station' && this.sortSettings[1] === 'DESC') 
        return a.station > b.station ? 1 : a.station < b.station ? -1 : 0;
      return a.station > b.station ? -1 : a.station < b.station ? 1 : 0;
    });
    if (this.sortSettings[0] === 'Station'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Station';
  }

  sortByDate() {
    this.sortedMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Date' && this.sortSettings[1] === 'DESC')
        return new Date(a.date) > new Date(b.date) ? 1 : new Date(a.date) < new Date(b.date) ? -1 : 0;
      return new Date(a.date) > new Date(b.date) ? -1 : new Date(a.date) < new Date(b.date) ? 1 : 0;
    });
    this.rawMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Date' && this.sortSettings[1] === 'DESC')
        return new Date(a.date) > new Date(b.date) ? 1 : new Date(a.date) < new Date(b.date) ? -1 : 0;
      return new Date(a.date) > new Date(b.date) ? -1 : new Date(a.date) < new Date(b.date) ? 1 : 0;
    })
    if (this.sortSettings[0] === 'Date'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Date';
  }

  sortByCountry() {
    this.sortedMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Country' && this.sortSettings[1] === 'DESC')
        return a.country > b.country ? -1 : a.country < b.country ? 1 : 0;
      return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;

    });
    this.rawMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Country' && this.sortSettings[1] === 'DESC') 
        return a.country > b.country ? -1 : a.country < b.country ? 1 : 0;
      return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;
    });
    if (this.sortSettings[0] === 'Country'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Country';
  }

  sortByHumidity() {
    this.sortedMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Humidity' && this.sortSettings[1] === 'DESC')
        return a.humidity > b.humidity ? 1 : a.humidity < b.humidity ? -1 : 0;
      return a.humidity > b.humidity ? -1 : a.humidity < b.humidity ? 1 : 0;
    });
    this.rawMeasurements.sort((a, b) => {
      if (this.sortSettings[0] === 'Humidity' && this.sortSettings[1] === 'DESC') 
        return a.humidity > b.humidity ? 1 : a.humidity < b.humidity ? -1 : 0;
      return a.humidity > b.humidity ? -1 : a.humidity < b.humidity ? 1 : 0;
    });
    if (this.sortSettings[0] === 'Humidity'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Humidity';
  }

  getStation = (stationnumber: string, measurementDate: Date | null = null) => {
    const measurement = this.rawMeasurements.find((measurement) => measurement.date === measurementDate && measurement.station === stationnumber)
    this.selectedMeasurement = measurement ?? null;
  }

  // This doesnt actually work because dewpoint and temperature are fantasy values
  getHumidity(temp: string, dewp: string) {
    const a = Math.exp(17.625 * Number(dewp) / (234.04 + Number(dewp)));
    const b = Math.exp(17.625 * Number(temp) / (234.04 + Number(temp)));
    return ((100 * (a / b)) % 100).toFixed(2) // % 100 Makes it look real
  }

  getState(frshtt: string) {
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

  download() {
    const downloadableData: any = [];
    this.rawMeasurements.forEach(result => {
      let resultJSON = { 'measurement': {
        'station': result['station'],
        'date': result['date'],
        'location': {
          'country': result['country'],
          'longitude': result['longitude'],
          'latitude': result['latitude'],
          'elevation' : result['elevation'],
        },
        'humidty': result['humidity'],
        'remaining-data': {
          'temp': result['temp'],
          'dewp': result['dewp'],
          'wdsp': result['wdsp'],
          'prcp': result['prcp'],
          'cldc': result['cldc']
        }
      }};
      downloadableData.push(resultJSON);
    })
    this.downloadService.downloadJSON(downloadableData, 'humidity');
  }

  countrySyntax(country: string) {
    const split = country.split(',');
    return [split[1], split[0]].join(' ').slice(1);
  }

}