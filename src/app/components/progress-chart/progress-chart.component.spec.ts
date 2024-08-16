import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressChartComponent } from './progress-chart.component';
import { ChartService } from '@/app/services/chart/chart.service';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '@/app/components/users/users.model';

describe('ProgressChartComponent', () => {
  let component: ProgressChartComponent;
  let fixture: ComponentFixture<ProgressChartComponent>;
  let chartService: ChartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProgressChartComponent, // Importing the standalone component here
        MatListModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        NoopAnimationsModule, // Optional: helps avoid animation-related issues in tests
      ],
      providers: [ChartService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressChartComponent);
    component = fixture.componentInstance;
    chartService = TestBed.inject(ChartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a chart when a user is selected', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [],
      totalWorkouts: 0,
      totalMinutes: 0,
    };
    spyOn(chartService, 'createChart');
    component.onSelectUser(user);
    expect(chartService.createChart).toHaveBeenCalledWith(
      jasmine.any(Object),
      user,
      component.selectedChartType,
    );
  });

  it('should update the chart when the chart type changes', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [],
      totalWorkouts: 0,
      totalMinutes: 0,
    };
    component.selectedUser = user;
    spyOn(chartService, 'createChart');
    component.onChartTypeChange();
    expect(chartService.createChart).toHaveBeenCalledWith(
      jasmine.any(Object),
      user,
      component.selectedChartType,
    );
  });
});
