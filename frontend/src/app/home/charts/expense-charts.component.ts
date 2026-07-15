import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReportResponse } from '../../shared/models/report-response.model';

@Component({
  selector: 'app-expense-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="row g-4 mb-4">
      <!-- Gráfico por Categoria -->
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <h6 class="mb-0 fw-semibold">Despesas por Categoria</h6>
          </div>
          <div class="card-body">
            <canvas baseChart
              *ngIf="categoryChartData.labels && categoryChartData.labels.length > 0"
              [data]="categoryChartData"
              [type]="pieChartType"
              [options]="pieChartOptions">
            </canvas>
            <p *ngIf="!categoryChartData.labels || categoryChartData.labels.length === 0" 
               class="text-center text-muted">
              Nenhum dado disponível
            </p>
          </div>
        </div>
      </div>

      <!-- Gráfico por Pessoa -->
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <h6 class="mb-0 fw-semibold">Despesas por Pessoa</h6>
          </div>
          <div class="card-body">
            <canvas baseChart
              *ngIf="personChartData.labels && personChartData.labels.length > 0"
              [data]="personChartData"
              [type]="pieChartType"
              [options]="pieChartOptions">
            </canvas>
            <p *ngIf="!personChartData.labels || personChartData.labels.length === 0" 
               class="text-center text-muted">
              Nenhum dado disponível
            </p>
          </div>
        </div>
      </div>

      <!-- Gráfico por Forma de Pagamento -->
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <h6 class="mb-0 fw-semibold">Despesas por Forma de Pagamento</h6>
          </div>
          <div class="card-body">
            <canvas baseChart
              *ngIf="paymentMethodChartData.labels && paymentMethodChartData.labels.length > 0"
              [data]="paymentMethodChartData"
              [type]="pieChartType"
              [options]="pieChartOptions">
            </canvas>
            <p *ngIf="!paymentMethodChartData.labels || paymentMethodChartData.labels.length === 0" 
               class="text-center text-muted">
              Nenhum dado disponível
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      height: 100%;
    }
    .card-body {
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class ExpenseChartsComponent implements OnChanges {
  @Input() reportData: ReportResponse | null = null;

  pieChartType: ChartType = 'pie';
  
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  categoryChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
        '#C9CBCF'
      ]
    }]
  };

  personChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#36A2EB',
        '#FF6384',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  paymentMethodChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#4BC0C0',
        '#FF6384',
        '#FFCE56',
        '#36A2EB',
        '#9966FF'
      ]
    }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportData']) {
      this.updateCharts();
    }
  }

  private updateCharts(): void {
    if (!this.reportData) {
      this.categoryChartData = { labels: [], datasets: [{ data: [], backgroundColor: this.categoryChartData.datasets[0].backgroundColor }] };
      this.personChartData = { labels: [], datasets: [{ data: [], backgroundColor: this.personChartData.datasets[0].backgroundColor }] };
      this.paymentMethodChartData = { labels: [], datasets: [{ data: [], backgroundColor: this.paymentMethodChartData.datasets[0].backgroundColor }] };
      return;
    }

    // Atualizar gráfico de categorias
    if (this.reportData.expensesByCategory) {
      const categoryEntries = Object.entries(this.reportData.expensesByCategory);
      this.categoryChartData = {
        labels: categoryEntries.map(([key]) => key),
        datasets: [{
          data: categoryEntries.map(([, value]) => value),
          backgroundColor: this.categoryChartData.datasets[0].backgroundColor
        }]
      };
    }

    // Atualizar gráfico de pessoas
    if (this.reportData.expensesByPerson) {
      const personEntries = Object.entries(this.reportData.expensesByPerson);
      this.personChartData = {
        labels: personEntries.map(([key]) => key),
        datasets: [{
          data: personEntries.map(([, value]) => value),
          backgroundColor: this.personChartData.datasets[0].backgroundColor
        }]
      };
    }

    // Atualizar gráfico de formas de pagamento
    if (this.reportData.expensesByPaymentMethod) {
      const paymentEntries = Object.entries(this.reportData.expensesByPaymentMethod);
      this.paymentMethodChartData = {
        labels: paymentEntries.map(([key]) => this.getPaymentMethodLabel(key)),
        datasets: [{
          data: paymentEntries.map(([, value]) => value),
          backgroundColor: this.paymentMethodChartData.datasets[0].backgroundColor
        }]
      };
    }
  }

  private getPaymentMethodLabel(method: string): string {
    const labels: { [key: string]: string } = {
      'CASH': 'Dinheiro',
      'CREDIT_CARD': 'Cartão de Crédito',
      'PIX': 'PIX',
      'DEBIT': 'Débito'
    };
    return labels[method] || method;
  }
}
