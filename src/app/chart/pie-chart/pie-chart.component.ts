import { Component, OnInit } from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart()
  {
    var data = new google.visualization.DataTable();
      data.addColumn('string', 'Generation');
      data.addColumn('number', 'Amount Used');
      data.addRows([
        ['Grid', 18430],
        ['PV', 1645.7],
      ]);
      var options =  {
        title: "Usage of Power",
        is3D:true,
        animation: {
          duration: 1000,
          easing: 'in',
          startup: true
      },
      }
      var chart = new google.visualization.PieChart(document.getElementById('divPieChart'));
      chart.draw(data, options);
  }
}
