import { ReportResponse } from './report-response.model';

export interface ReportMetricItem {
  name: string;
  value: number;
  percentage: number;
}

export interface DashboardReportResponse extends ReportResponse {
  topCategories: ReportMetricItem[];
  topPeople: ReportMetricItem[];
  paymentDistribution: ReportMetricItem[];
  alerts: string[];
  insights: string[];
  healthScore: number;
  healthLabel: string;
}
