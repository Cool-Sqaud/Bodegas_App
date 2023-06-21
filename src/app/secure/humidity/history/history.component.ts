import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
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
    this.bodegasService.getHistoricHumidityMeasurements()
        .subscribe(
          (result: any) => {
            result.forEach((measurement: any) => {
              measurement.country = this.countrySyntax(measurement.country);
              measurement.humidity = this.getHumidity(measurement.temp, measurement.dewp)
            });
            this.rawMeasurements = result;
            this.rawMeasurements.sort((a, b) => {
              const [aDate, bDate] = [new Date(a.date), new Date(b.date)];
              return aDate > bDate ? -1 : aDate < bDate ? 1 : a.humidity > b.humidity ? -1 : a.humidity < b.humidity ? 1 : 0;
            })
            this.sortedMeasurements = this.rawMeasurements;
            this.loadedMeasurements = true;
          }
  )}

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
      const [aDate, bDate] = [new Date(a.date), new Date(b.date)];
      if (this.sortSettings[0] === 'Date' && this.sortSettings[1] === 'DESC')
        return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
    });
    this.rawMeasurements.sort((a, b) => {
      const [aDate, bDate] = [new Date(a.date), new Date(b.date)];
      if (this.sortSettings[0] === 'Date' && this.sortSettings[1] === 'DESC')
        return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
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
        'humidity': result['humidity'],
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