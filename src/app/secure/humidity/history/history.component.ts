import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';
import { DownloadService } from 'src/app/_services/download.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  Historic_Humidity_Results: Array<any> = [];

  constructor(
    private bodegasService: BodegasService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHistoricHumidityMeasurements()
        .subscribe(
          (result: any) => {
            this.Historic_Humidity_Results = result;
            console.log(result);
          } 
        )   
  }
  download() {
    const downloadableData: any = [];
    this.Historic_Humidity_Results.forEach(result => {
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
