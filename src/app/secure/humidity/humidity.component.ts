import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  loadedMeasurements = false;
  Humidity_Results: Array<any> = [];
  All_Measurements: Array<any> = [];
  selectedMeasurement: any | null = null;

  constructor(
    private bodegasService: BodegasService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHumidityMeasurements()
        .subscribe(
          (result: any) => {
            this.Humidity_Results = result;
            console.log(result);
          } 
        )   
  }

  getStation = (stationnumber: string, measurementDate: string | null = null) => {
    const measurement = this.Humidity_Results.find((measurement) => measurement.date === measurementDate && measurement.station === stationnumber)
    this.selectedMeasurement = measurement ?? null;
  }

  countrySyntax(country: string) {
    const split = country.split(',');
    return [split[1], split[0]].join(' ').slice(1);
  }

  download() {
    const downloadableData: any = [];
    this.Humidity_Results.forEach(result => {
      let resultJSON = { 'measurement': {
          'avg_dewp': result['avg_dewp'], 
          'station': result['station'],
          'country_code': result['country_code'],
          'date': result['date'],
          'temp': result['temp'],
          'wdsp': result['wdsp'],
          'prcp': result['prcp'],
          'cldc': result['cldc']
        }};
      downloadableData.push(resultJSON);
    })
    this.downloadService.downloadJSON(downloadableData, 'average-humidity');
  }
}
