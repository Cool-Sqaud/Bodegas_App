import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';

@Component({
  selector: 'app-temperature-history',
  templateUrl: './temperature-history.component.html',
  styleUrls: ['./temperature-history.component.css']
})
export class TemperatureHistoryComponent implements OnInit {

  someHistoricResults: Array<any> = [];

  constructor(
    private bodegasService: BodegasService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHistoricTemperatureMeasurements()
        .subscribe(
          (result: any) => {
            this.someHistoricResults = result;
            console.log(result);
          } 
        )
  }

}