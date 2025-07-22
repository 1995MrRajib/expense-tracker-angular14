import { Component, Input, OnChanges } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html'
})
export class CategoryChartComponent implements OnChanges {
  @Input() categoryTotals: { [category: string]: number } = {};

  pieChartLabels: string[] = [];
  chartDatasets: any[] = [];
  pieChartType: ChartType = 'pie';
  
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    }
  };

  ngOnChanges(): void {
    this.pieChartLabels = Object.keys(this.categoryTotals);
    this.chartDatasets = [{
      data: Object.values(this.categoryTotals),
      backgroundColor: ['#4CAF50', '#FF9800', '#03A9F4', '#E91E63', '#9C27B0', '#795548']
    }];
  }

  toggleChartType(): void {
    this.pieChartType = this.pieChartType === 'pie' ? 'bar' : 'pie';
  }
}

