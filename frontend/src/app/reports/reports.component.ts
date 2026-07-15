import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../shared/services/report.service';
import { ReportResponse } from '../shared/models/report-response.model';
import {
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  TableDirective,
  ButtonDirective,
  WidgetStatEComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ExpenseChartsComponent } from '../home/charts/expense-charts.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    TableDirective,
    ButtonDirective,
    WidgetStatEComponent,
    IconDirective,
    ExpenseChartsComponent
  ]
})
export class ReportsComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  month1: number = new Date().getMonth(); // Mês anterior
  month2: number = new Date().getMonth() + 1; // Mês atual
  
  report1: ReportResponse | null = null;
  report2: ReportResponse | null = null;
  
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private reportService: ReportService) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getMonthlyReport(this.selectedYear, this.month1).subscribe(r => this.report1 = r);
    this.reportService.getMonthlyReport(this.selectedYear, this.month2).subscribe(r => this.report2 = r);
  }

  getDiff(val1: number | undefined | null, val2: number | undefined | null): number {
    return (val2 || 0) - (val1 || 0);
  }

  getDiffPercent(val1: number | undefined | null, val2: number | undefined | null): string {
    if (!val1 || val1 === 0) return (val2 && val2 > 0) ? '100%' : '0%';
    const diff = ((val2 || 0) - val1) / val1 * 100;
    return (diff > 0 ? '+' : '') + diff.toFixed(1) + '%';
  }

  getAllCategories(): string[] {
    const cats = new Set<string>();
    if (this.report1) Object.keys(this.report1.expensesByCategory).forEach(c => cats.add(c));
    if (this.report2) Object.keys(this.report2.expensesByCategory).forEach(c => cats.add(c));
    return Array.from(cats).sort();
  }
}
