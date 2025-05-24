import { Component } from '@angular/core';

@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.css']
})
export class ProtfolioComponent {
  width: number = 1000;
  height: number = 600;
  fitContainer: boolean = false;

    view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Stocks';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  // data goes here
public single = [
  {
    "name": "Diversified Bond",
    "value": 224370
  },
  {
    "name": "Diversified Stock",
    "value": 112600
  },
  {
    "name": "Local Stocks",
    "value": 296215
  },
  {
    "name": "Foreign Stocks",
    "value": 257363
  },
  {
    "name": "Small cap Fund",
    "value": 196750
  },
  {
    "name": "Large Cap Fund",
    "value": 204617
  }
];
}
