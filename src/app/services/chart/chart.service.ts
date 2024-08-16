import { Injectable } from '@angular/core';
import Chart, {
  ChartType,
  ChartOptions,
  ChartData,
  ChartConfiguration,
} from 'chart.js/auto';
import { User } from '@/app/components/users/users.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chart: Chart<'bar' | 'pie', number[], string> | null = null;

  constructor() {}

  createChart(
    chartRef: HTMLCanvasElement,
    user: User,
    chartType: 'bar' | 'pie',
  ) {
    const ctx = chartRef.getContext('2d');
    if (ctx) {
      // Destroy the previous chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }

      // Create a new chart with the desired type
      this.chart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: user.workouts.map((w) => w.type as string),
          datasets: [
            {
              label: 'Minutes',
              data: user.workouts.map((w) => w.minutes as number),
              borderWidth: chartType === 'bar' ? 1 : undefined,
              backgroundColor:
                chartType === 'pie'
                  ? ['#FF6384', '#36A2EB', '#FFCE56']
                  : undefined,
              borderColor: chartType === 'pie' ? undefined : '#FFCE56',
            },
          ],
        } as ChartData<'bar' | 'pie', number[], string>,
        options: this.getChartOptions(chartType),
      });
    }
  }

  private getChartOptions(
    chartType: 'bar' | 'pie',
  ): ChartOptions<'bar' | 'pie'> {
    if (chartType === 'bar') {
      return {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    } else {
      return {
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.raw} minutes`,
            },
          },
        },
      };
    }
  }
  updateChart(user: User) {
    if (this.chart) {
      this.chart.data.labels = user.workouts.map((w) => w.type || ''); // Update labels
      this.chart.data.datasets[0].data = user.workouts.map((w) => w.minutes); // Update data
      this.chart.data.datasets[0].backgroundColor = this.generateColors(
        user.workouts.length,
      ); // Update colors if necessary
      this.chart.update(); // Trigger chart update
    }
  }

  private generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  }
}
