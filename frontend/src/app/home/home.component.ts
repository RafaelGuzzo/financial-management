import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../shared/services/report.service';
import { DashboardReportResponse, ReportMetricItem } from '../shared/models/dashboard-report-response.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

import {
  ButtonDirective,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  RowComponent,
  SpinnerComponent
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonDirective,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RowComponent,
    IconModule,
    BaseChartDirective,
    SpinnerComponent
  ]
})
export class HomeComponent implements OnInit {
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  monthlyReport: DashboardReportResponse | null = null;

  readonly categoryPieChartType: 'doughnut' = 'doughnut';
  readonly categoryPieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 12,
          font: {
            size: 11,
            family: 'Segoe UI'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = (context.dataset.data as number[]).reduce((acc, current) => acc + current, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  categoryPieChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#4E79F7',
          '#F28E2B',
          '#59A14F',
          '#E15759',
          '#76B7B2',
          '#EDC948',
          '#B07AA1',
          '#FF9DA7'
        ],
        borderWidth: 0
      }
    ]
  };

  constructor(
    private readonly reportService: ReportService,
    private readonly router: Router
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.loadDashboardReport();
  }

  loadDashboardReport(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.reportService.getDashboardMonthlyReport(this.selectedYear, this.selectedMonth).subscribe({
      next: (report) => {
        this.monthlyReport = report;
        this.updateCategoryPieChart();
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Nao foi possivel carregar os dados do dashboard.');
        this.isLoading.set(false);
      }
    });
  }

  onMonthChange(): void {
    this.loadDashboardReport();
  }

  onYearChange(): void {
    this.loadDashboardReport();
  }

  getTopCategories(): ReportMetricItem[] {
    return this.monthlyReport?.topCategories ?? [];
  }

  getTopPeople(): ReportMetricItem[] {
    return this.monthlyReport?.topPeople ?? [];
  }

  getPaymentDistribution(): ReportMetricItem[] {
    return this.monthlyReport?.paymentDistribution ?? [];
  }

  getHealthScore(): number {
    return this.monthlyReport?.healthScore ?? 0;
  }

  getHealthLabel(): string {
    return this.monthlyReport?.healthLabel ?? 'Sem dados';
  }

  getAlerts(): string[] {
    return this.monthlyReport?.alerts ?? ['Nao ha dados suficientes para gerar alertas.'];
  }

  getInsights(): string[] {
    return this.monthlyReport?.insights ?? ['Sem insights para o periodo.'];
  }

  getRevenueMonth(): number {
    return this.monthlyReport?.totalToReceive ?? 0;
  }

  getExpensesMonth(): number {
    return this.monthlyReport?.totalExpenses ?? 0;
  }

  getBalanceMonth(): number {
    return this.getRevenueMonth() - this.getExpensesMonth();
  }

  getCreditCardAmount(): number {
    const byCard = this.monthlyReport?.expensesByCard ?? {};
    return Object.values(byCard).reduce((acc, value) => acc + value, 0);
  }

  getCreditCardPercentage(): number {
    const total = this.getExpensesMonth();
    if (total <= 0) {
      return 0;
    }

    return Number(((this.getCreditCardAmount() / total) * 100).toFixed(0));
  }

  getReceivablePeopleCount(): number {
    return this.monthlyReport?.topPeople?.length ?? 0;
  }

  getRevenueChangeText(): string {
    return this.getRevenueMonth() > 0 ? '▲ 3% vs. mes anterior' : 'Sem movimentacao';
  }

  getExpensesChangeText(): string {
    return this.getExpensesMonth() > 0 ? '▼ 12% vs. mes anterior' : 'Sem movimentacao';
  }

  getBalanceChangeText(): string {
    return this.isBalancePositive() ? '▲ saldo positivo' : '▼ saldo negativo';
  }

  isBalancePositive(): boolean {
    return this.getBalanceMonth() >= 0;
  }

  openExpenses(): void {
    this.router.navigate(['/expenses']);
  }

  openExpenseForm(): void {
    this.router.navigate(['/expense/new'], {
      queryParams: { year: this.selectedYear, month: this.selectedMonth }
    });
  }

  private updateCategoryPieChart(): void {
    const categories = this.getTopCategories();
    this.categoryPieChartData = {
      labels: categories.map((item) => item.name),
      datasets: [
        {
          data: categories.map((item) => item.value),
          backgroundColor: this.categoryPieChartData.datasets[0].backgroundColor,
          borderWidth: 0
        }
      ]
    };
  }
}
