package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.response.ReportResponse;
import br.guzzo.financialmanagement.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/monthly")
    public ResponseEntity<ReportResponse> generateMonthlyReport(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(reportService.generateMonthlyReport(year, month));
    }
}