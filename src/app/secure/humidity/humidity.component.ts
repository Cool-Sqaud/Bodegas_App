import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  loadedMeasurements = false;
  Results: Array<any> = [];
  HistoricResults: Array<any> = [];
  selectedMeasurement: any | null = null;

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

  getStation = (stationnumber: string, measurementDate: string | null = null) => {
    const measurement = this.Results.find((measurement) => measurement.date === measurementDate && measurement.station === stationnumber)
    this.selectedMeasurement = measurement ?? null;
  }
}
