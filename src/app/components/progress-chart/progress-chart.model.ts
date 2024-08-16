import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ProgressChartComponent } from './progress-chart.component';
import { ChartService } from '@/app/services/chart/chart.service';
import { User } from '@/app/components/users/users.model';

describe('ProgressChartComponent', () => {
  let component: ProgressChartComponent;
  let fixture: ComponentFixture<ProgressChartComponent>;
  let chartService: ChartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatListModule],
      declarations: [ProgressChartComponent],
      providers: [ChartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressChartComponent);
    component = fixture.componentInstance;
    chartService = TestBed.inject(ChartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users and initialize chart', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [],
      totalWorkouts: 0,
      totalMinutes: 0,
    };
    localStorage.setItem('workoutData', JSON.stringify([user]));

    component.loadUsers();
    fixture.detectChanges();

    expect(component.users.length).toBe(1);
    expect(component.selectedUser).toEqual(user);
  });

  it('should update chart on user selection', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [],
      totalWorkouts: 0,
      totalMinutes: 0,
    };
    component.selectedUser = user;
    spyOn(chartService, 'updateChart');

    component.onSelectUser(user);

    expect(chartService.updateChart).toHaveBeenCalledWith(user);
  });
});
