import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

import { User } from '@/app/components/users/users.model';
import { ChartService } from '@/app/services/chart/chart.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

Chart.register(CategoryScale);

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css',
})
export class ProgressChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  users: User[] = [];
  selectedUser: User | null = null;
  selectedChartType: 'bar' | 'pie' = 'bar';
  chart: Chart | null = null;

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.initializeChart();
    }
  }

  initializeChart() {
    if (this.selectedUser && this.chartRef) {
      this.chartService.createChart(
        this.chartRef.nativeElement,
        this.selectedUser,
        this.selectedChartType,
      );
    }
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString) {
      this.users = JSON.parse(workoutDataString);
      if (!this.selectedUser && this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.initializeChart();
      }
    }
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    this.chartService.createChart(
      this.chartRef.nativeElement,
      this.selectedUser,
      this.selectedChartType,
    );
  }

  onChartTypeChange() {
    if (this.selectedUser) {
      this.chartService.createChart(
        this.chartRef.nativeElement,
        this.selectedUser,
        this.selectedChartType,
      );
    }
  }

  onUserAdded() {
    this.loadUsers();
    if (this.selectedUser) {
      this.chartService.createChart(
        this.chartRef.nativeElement,
        this.selectedUser,
        this.selectedChartType,
      );
    }
  }
}
