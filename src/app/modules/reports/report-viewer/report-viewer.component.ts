// report-viewer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importando o serviço real com caminho corrigido
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

  reportForm!: FormGroup;
  reportData: any[] = [];
  reportColumns: any[] = [];
  isLoading: boolean = false;
  
  // Propriedades do gráfico
  chartType: string = 'bar';
  chartData: any;
  chartOptions: any;

  // Opções dos dropdowns
  reportTypes = [
    { label: 'Eventos', value: 'events' },
    { label: 'Vendas', value: 'sales' },
    { label: 'Clientes', value: 'clients' },
    { label: 'Motoristas', value: 'drivers' },
    { label: 'Veículos', value: 'vehicles' }
  ];

  eventTypes = [
    { label: 'Particular', value: 'Particular' },
    { label: 'Coletivo', value: 'Coletivo' }
  ];

  statusOptions = [
    { label: 'Disponível', value: 'Disponível' },
    { label: 'Em Uso', value: 'Em Uso' },
    { label: 'Em Manutenção', value: 'Em Manutenção' },
    { label: 'Indisponível', value: 'Indisponível' }
  ];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupChartOptions();
  }

  initializeForm(): void {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    this.reportForm = this.fb.group({
      reportType: ['events', Validators.required],
      startDate: [firstDayOfMonth, Validators.required],
      endDate: [currentDate, Validators.required],
      eventType: [null],
      minAmount: [null],
      status: [null]
    });
  }

  setupChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Visualização de Dados'
        }
      }
    };
  }
}
