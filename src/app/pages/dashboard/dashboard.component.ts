import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    chartData: any;

    chartOptions: any;

    statiques : any;
    pieData: any;
    pieOptions: any;

    attendanceStats : any;
    meetings : any[];
    loading: boolean = true;
    loadingExtendedStat: boolean = true;
    error: boolean = true;

    constructor(public dashboardService: DashboardService) {
        this.getFullStat();
        this.getExtendedStat();
    }

    ngOnInit() {

        this.initMeetingsPerMonthChart();
        this.initMeetingsByTypeChart();
    }

    formatStat(data: any): void {
        this.attendanceStats =  JSON.parse("{'A participé': 9, 'Inscrit': 6,'Absent': 3,'Confirmé': 9}");
    }

    getFullStat() {
        this.dashboardService.getFullStat().subscribe(
            data => {
                this.statiques = data;
                this.formatStat(data);
                this.loading = false;
            },
            error => {
                this.loading = false;
                this.error = true;
            }
        );
    }

    getExtendedStat() {
        this.dashboardService.getExtendedStat().subscribe(
            next => {
                this.meetings = next.recentMeetingsEffectiveness;
                this.loadingExtendedStat = false;
            },
            error => {
                this.loadingExtendedStat = false;
            }
        );
    }

    initMeetingsPerMonthChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels:  this.statiques?.meetingsPerMonth ? Object.keys(this.statiques?.meetingsPerMonth).reverse(): [],
            datasets: [
                {
                    label: 'meetings Per Month',
                    data: this.statiques?.meetingsPerMonth? Object.values(this.statiques?.meetingsPerMonth).reverse(): [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    initMeetingsByTypeChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.pieData = {
            labels: this.statiques?.meetingsByType? Object.keys(this.statiques.meetingsByType): [],
            datasets: [
                {
                    data: this.statiques?.meetingsByType? Object.values(this.statiques.meetingsByType): [],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--cyan-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--bluegray-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--cyan-400'),
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

    }
}
