import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  Results: Array<any> = [];
  HistoricResults: Array<any> = [];

  constructor(
    private bodegasService: BodegasService
  ) { }

  ngOnInit(): void {
    this.bodegasService.getHumidityMeasurements()
        .subscribe(
          (result: any) => {
            this.Results = result;
            console.log(result);
          } 
        )
  }
}
