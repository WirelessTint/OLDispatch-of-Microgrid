import { Component, OnInit } from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart()
  {
    var data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Billing');
      data.addRows([
        ['Actual Billing', 18430],
        ['Adjusted Billing', 1645.7],
      ]);
      var options =  {
        title: "Last Month Billing",
        is3D:true,
        animation: {
          duration: 1000,
          easing: 'in',
          startup: true
      },
      }
      var chart = new google.visualization.BarChart(document.getElementById('divBarChart'));
      chart.draw(data, options);
  }
  
}
