import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/_services/bodegas.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  loadedMeasurements = false;
  Humidity_Results: Array<any> = [];
  All_Measurements: Array<any> = [];
  HistoricResults: Array<any> = [];
  selectedMeasurement: any | null = null;

  constructor(
    private bodegasService: BodegasService
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
}
