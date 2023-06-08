import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  someResults: Array<any> = [];
  someHistoricResults: Array<any> = [];

  constructor(
    private bodegasService: BodegasService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getTemperatureMeasurements()
        .subscribe(
          (result: any) => {
            this.someResults = result;
            console.log(result);
          } 
        )
    this.bodegasService.getHistoricTemperatureMeasurements()
        .subscribe(
          (result: any) => {
            this.someHistoricResults = result;
            console.log(result);
          } 
        )
  }

}
