import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BlackOfferService } from 'src/app/services/black-offer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{

   months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  chartBarData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 17, 42, 79]
      }
    ]
  };


   /* chartBarOptions = {
     maintainAspectRatio: false,
   }; */

  chartLineData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData]
      }
    ]
  };

  /*chartLineOptions = {
    maintainAspectRatio: false,
  };*/

   chartDoughnutData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10]
      }
    ]
  };

  /*chartDoughnutOptions = {
    aspectRatio: 1,
    responsive: true,
    maintainAspectRatio: false,
    radius: '100%'
  };*/

  chartPieData = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  /*chartPieOptions = {
    aspectRatio: 1,
    responsive: true,
    maintainAspectRatio: false,
    radius: '100%'
  };*/

  chartPolarAreaData = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
      }
    ]
  };

  chartRadarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: '2020',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        tooltipLabelColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: '2021',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        tooltipLabelColor: 'rgba(255,99,132,1)',
        data: [this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData, this.randomData]
      }
    ]
  };

  /*chartRadarOptions = {
    aspectRatio: 1.5,
    responsive: true,
    maintainAspectRatio: false,
  };*/

  get randomData() {
    return Math.round(Math.random() * 100);
  }


  countryData: any[] = [];

  constructor(private BcdataService: BlackOfferService, private http: HttpClient) { }

  data: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';
  itemsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 1;
  keys: any[] = [];
  items: any[] = [
    "end_year",
     "insight",
    "intensity",
    "pestle",
      "published",
      "region",
      "relevance",
      "sector",
      "source",
      "title",
      "topic",
      "year_range_end"
  ]
  selectedItem: string = 'sector';

  ngOnInit() {
    this.BcdataService.getData().subscribe((data: any) => {
      //console.log(data.data);
      this.data = data.data;
      this.keys = Object.keys(this.data[0]).slice(1);
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.applyFilter();
    });

    this.getCharts();

    this.BcdataService.get_countries().subscribe((data: any) => {
      this.countryData = data;
      //console.log(this.countryData);
    });
  }

   // Chart realted functions

  getCharts(){

    this.BcdataService.get_chart({ param: this.selectedItem}).subscribe((data: any) => {

      //console.log(data);

      // Bar chart

      this.chartBarData = {
        labels: data.bar_res.x_axis,
        datasets: [
          {
            label: data.bar_res.title,
            backgroundColor: data.bar_res.color,
            data: data.bar_res.y_axis
          }
        ]
      }

      // this.chartBarOptions = {
      //   maintainAspectRatio: false,
      // };

      // Line Graph

      this.chartLineData = {
        labels: data.line_res.x_axis,
      datasets: [
        {
          label: data.line_res.title,
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: data.line_res.color,
          data: data.line_res.y_axis
        }]
      }

      /*this.chartLineOptions = {
        maintainAspectRatio: false,
      };*/

      // Pie Chart

      this.chartPieData = {
        labels: data.pie_res.x_axis,
        datasets: [
          {
            data: data.pie_res.y_axis,
            backgroundColor: data.pie_res.color,
            hoverBackgroundColor: data.pie_res.hover
          }
        ]
      };

      // Polar Chart

      this.chartPolarAreaData = {
        labels: data.polar_res.x_axis,
        datasets: [
          {
            data: data.polar_res.y_axis,
            backgroundColor: data.polar_res.color
          }
        ]
      };

      // Doughnut Chart

      this.chartDoughnutData = {
        labels: data.doughnut_res.x_axis,
        datasets: [
          {
            backgroundColor: data.doughnut_res.color,
            data: data.doughnut_res.y_axis
          }
        ]
      };

      // Radar Graph

      this.chartRadarData = {
        labels: data.radar_res.x_axis,
        datasets: [
          {
            label: data.radar_res.title,
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: data.radar_res.color,
            pointHoverBackgroundColor: data.radar_res.hover,
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data: data.radar_res.y_axis
          }
        ]
      };
    });

  }



  // Other Functions

  onPageChange(event: any) {
    this.currentPage = event;
    this.applyFilter();
  }

  valueSelected(event: any) {
    let newItemsPerPage = event.target.value;
    this.itemsPerPage = +newItemsPerPage;
    console.log(this.itemsPerPage);
    //this.currentPage = 1; // Reset current page to 1 after changing items per page
    this.applyFilter();
  }

  itemSelected(event: any) {
    this.selectedItem = event.target.value;
    this.getCharts();
  }

  applyFilter() {
    let searchQueryLower = this.searchQuery.toLowerCase();
    console.log(searchQueryLower);
    this.filteredData = this.data.filter(item => {
      // Filter by country
      if (item.country.toLowerCase().includes(searchQueryLower)) {
        return true;
      }
      // Filter by keys (column names)
      for (const key of this.keys) {
        if (item[key].toString().toLowerCase().includes(searchQueryLower)) {
          return true;
        }
      }
      return false;
    });

    // Update total pages based on filtered data length and items per page
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    // Reset current page to 1 if it exceeds the total pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }

    // Update filtered data based on current page and items per page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredData = this.filteredData.slice(startIndex, endIndex);

    this.totalPagesArray()
  }

  totalPagesArray(): number[] {
    // Get the start and end page index for the current 3 pages
    const startPageIndex = Math.max(0, this.currentPage - 2);
    const endPageIndex = Math.min(this.totalPages - 1, startPageIndex + 2);

    // Generate an array of numbers representing the current 3 pages
    return Array.from({ length: endPageIndex - startPageIndex + 1 }, (_, index) => startPageIndex + index + 1);
  }

}
