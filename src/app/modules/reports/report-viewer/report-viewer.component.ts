// report-viewer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService,
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

  onReportTypeChange(): void {
    // Resetar filtros condicionais quando o tipo de relatório muda
    this.reportForm.patchValue({
      eventType: null,
      minAmount: null,
      status: null
    });
    
    // Limpar dados do relatório anterior
    this.reportData = [];
    this.reportColumns = [];
    this.chartData = null;
  }

  generateReport(): void {
    if (this.reportForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    this.isLoading = true;
    const filters = this.reportForm.value;
    
    // Usando o serviço real para gerar o relatório
    this.reportService.generateReport(filters).subscribe({
      next: (data) => {
        this.processReportData(data, filters.reportType);
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Relatório gerado com sucesso.' });
      },
      error: (err) => {
        console.error('Erro ao gerar relatório:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao gerar relatório.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        const mockData = this.getMockData(filters.reportType);
        this.processReportData(mockData, filters.reportType);
      }
    });
  }

  processReportData(data: any[], reportType: string): void {
    this.reportData = data;
    
    // Definir colunas com base no tipo de relatório
    switch (reportType) {
      case 'events':
        this.reportColumns = [
          { field: 'title', header: 'Título', type: 'text' },
          { field: 'type', header: 'Tipo', type: 'status' },
          { field: 'startDate', header: 'Data Início', type: 'datetime' },
          { field: 'endDate', header: 'Data Fim', type: 'datetime' },
          { field: 'clientCount', header: 'Nº Clientes', type: 'number' }
        ];
        this.prepareEventChartData(data);
        break;
      case 'sales':
        this.reportColumns = [
          { field: 'voucherCode', header: 'Voucher', type: 'text' },
          { field: 'eventTitle', header: 'Evento', type: 'text' },
          { field: 'clientName', header: 'Cliente', type: 'text' },
          { field: 'saleDate', header: 'Data Venda', type: 'date' },
          { field: 'totalAmount', header: 'Valor', type: 'currency' }
        ];
        this.prepareSalesChartData(data);
        break;
      case 'clients':
        this.reportColumns = [
          { field: 'name', header: 'Nome', type: 'text' },
          { field: 'email', header: 'Email', type: 'text' },
          { field: 'phone', header: 'Telefone', type: 'text' },
          { field: 'eventCount', header: 'Nº Eventos', type: 'number' },
          { field: 'totalSpent', header: 'Total Gasto', type: 'currency' }
        ];
        this.prepareClientsChartData(data);
        break;
      case 'drivers':
        this.reportColumns = [
          { field: 'name', header: 'Nome', type: 'text' },
          { field: 'phone', header: 'Telefone', type: 'text' },
          { field: 'eventCount', header: 'Nº Eventos', type: 'number' },
          { field: 'lastEvent', header: 'Último Evento', type: 'date' }
        ];
        this.prepareDriversChartData(data);
        break;
      case 'vehicles':
        this.reportColumns = [
          { field: 'plate', header: 'Placa', type: 'text' },
          { field: 'model', header: 'Modelo', type: 'text' },
          { field: 'status', header: 'Status', type: 'status' },
          { field: 'eventCount', header: 'Nº Eventos', type: 'number' },
          { field: 'lastEvent', header: 'Último Evento', type: 'date' }
        ];
        this.prepareVehiclesChartData(data);
        break;
    }
  }

  prepareEventChartData(data: any[]): void {
    // Agrupar eventos por tipo
    const eventsByType = data.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});

    this.chartType = 'pie';
    this.chartData = {
      labels: Object.keys(eventsByType),
      datasets: [
        {
          label: 'Eventos por Tipo',
          data: Object.values(eventsByType),
          backgroundColor: ['#42A5F5', '#FFA726', '#66BB6A', '#EC407A']
        }
      ]
    };
  }

  prepareSalesChartData(data: any[]): void {
    // Agrupar vendas por data (mês)
    const salesByMonth = data.reduce((acc, sale) => {
      const date = new Date(sale.saleDate);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += sale.totalAmount;
      return acc;
    }, {});

    const labels = Object.keys(salesByMonth);
    const values = Object.values(salesByMonth);

    this.chartType = 'bar';
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Vendas por Mês',
          data: values,
          backgroundColor: '#42A5F5'
        }
      ]
    };
  }

  prepareClientsChartData(data: any[]): void {
    // Obter os 5 principais clientes por total gasto
    const sortedClients = [...data].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
    
    this.chartType = 'bar';
    this.chartData = {
      labels: sortedClients.map(client => client.name),
      datasets: [
        {
          label: 'Total Gasto (R$)',
          data: sortedClients.map(client => client.totalSpent),
          backgroundColor: '#66BB6A'
        }
      ]
    };
  }

  prepareDriversChartData(data: any[]): void {
    // Obter os principais motoristas por número de eventos
    const sortedDrivers = [...data].sort((a, b) => b.eventCount - a.eventCount).slice(0, 5);
    
    this.chartType = 'bar';
    this.chartData = {
      labels: sortedDrivers.map(driver => driver.name),
      datasets: [
        {
          label: 'Número de Eventos',
          data: sortedDrivers.map(driver => driver.eventCount),
          backgroundColor: '#FFA726'
        }
      ]
    };
  }

  prepareVehiclesChartData(data: any[]): void {
    // Agrupar veículos por status
    const vehiclesByStatus = data.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {});

    this.chartType = 'doughnut';
    this.chartData = {
      labels: Object.keys(vehiclesByStatus),
      datasets: [
        {
          label: 'Veículos por Status',
          data: Object.values(vehiclesByStatus),
          backgroundColor: ['#66BB6A', '#42A5F5', '#FFA726', '#EC407A']
        }
      ]
    };
  }

  getReportTitle(): string {
    const reportType = this.reportForm.get('reportType')?.value;
    const reportTypeLabel = this.reportTypes.find(t => t.value === reportType)?.label || '';
    
    if (this.reportData.length === 0) {
      return 'Selecione os filtros e gere um relatório';
    }
    
    return `Relatório de ${reportTypeLabel}`;
  }

  getFilterFields(): string[] {
    const reportType = this.reportForm.get('reportType')?.value;
    
    switch (reportType) {
      case 'events':
        return ['title', 'type'];
      case 'sales':
        return ['voucherCode', 'eventTitle', 'clientName'];
      case 'clients':
        return ['name', 'email'];
      case 'drivers':
        return ['name'];
      case 'vehicles':
        return ['plate', 'model', 'status'];
      default:
        return [];
    }
  }

  getTotalAmount(): number {
    if (this.reportForm.get('reportType')?.value !== 'sales' || !this.reportData.length) {
      return 0;
    }
    
    return this.reportData.reduce((sum, sale) => sum + sale.totalAmount, 0);
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Disponível':
        return 'success';
      case 'Em Uso':
        return 'info';
      case 'Em Manutenção':
        return 'warning';
      case 'Indisponível':
        return 'danger';
      case 'Particular':
        return 'info';
      case 'Coletivo':
        return 'warning';
      default:
        return 'info';
    }
  }

  exportPdf(): void {
    // Usando o serviço real para exportar PDF
    this.reportService.exportPdf(this.reportForm.value).subscribe({
      next: (response) => {
        // Em uma aplicação real, isso abriria ou baixaria o PDF
        this.messageService.add({ severity: 'success', summary: 'Exportação', detail: 'PDF gerado com sucesso.' });
      },
      error: (err) => {
        console.error('Erro ao exportar PDF:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao exportar PDF.' });
      }
    });
  }

  exportExcel(): void {
    // Usando o serviço real para exportar Excel
    this.reportService.exportExcel(this.reportForm.value).subscribe({
      next: (response) => {
        // Em uma aplicação real, isso abriria ou baixaria o Excel
        this.messageService.add({ severity: 'success', summary: 'Exportação', detail: 'Excel gerado com sucesso.' });
      },
      error: (err) => {
        console.error('Erro ao exportar Excel:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao exportar Excel.' });
      }
    });
  }

  // Dados de exemplo para desenvolvimento
  getMockData(reportType: string): any[] {
    const now = new Date();
    
    switch (reportType) {
      case 'events':
        return [
          { 
            title: 'Passeio Turístico - Centro Histórico',
            type: 'Coletivo',
            startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 9, 0),
            endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 12, 0),
            clientCount: 15
          },
          { 
            title: 'Transfer Aeroporto',
            type: 'Particular',
            startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 14, 0),
            endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 15, 30),
            clientCount: 1
          },
          { 
            title: 'City Tour - Praias',
            type: 'Coletivo',
            startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 0),
            endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 17, 0),
            clientCount: 20
          },
          { 
            title: 'Passeio de Barco',
            type: 'Coletivo',
            startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 0),
            endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 16, 0),
            clientCount: 12
          },
          { 
            title: 'Transfer Hotel-Restaurante',
            type: 'Particular',
            startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 19, 0),
            endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 23, 0),
            clientCount: 2
          }
        ];
      
      case 'sales':
        return [
          { 
            voucherCode: 'TOUR-2025-001',
            eventTitle: 'Passeio Turístico - Centro Histórico',
            clientName: 'João Silva',
            saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
            totalAmount: 150.00
          },
          { 
            voucherCode: 'TRAN-2025-002',
            eventTitle: 'Transfer Aeroporto',
            clientName: 'Carlos Pereira',
            saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8),
            totalAmount: 80.00
          },
          { 
            voucherCode: 'CITY-2025-003',
            eventTitle: 'City Tour - Praias',
            clientName: 'Maria Oliveira',
            saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
            totalAmount: 120.00
          },
          { 
            voucherCode: 'BOAT-2025-004',
            eventTitle: 'Passeio de Barco',
            clientName: 'Ana Santos',
            saleDate: new Date(now.getFullYear(), now.getMonth() - 1, 25),
            totalAmount: 200.00
          },
          { 
            voucherCode: 'TRAN-2025-005',
            eventTitle: 'Transfer Hotel-Restaurante',
            clientName: 'Roberto Almeida',
            saleDate: new Date(now.getFullYear(), now.getMonth() - 1, 15),
            totalAmount: 60.00
          }
        ];
      
      case 'clients':
        return [
          { 
            name: 'João Silva',
            email: 'joao.silva@example.com',
            phone: '(11) 98765-4321',
            eventCount: 3,
            totalSpent: 350.00
          },
          { 
            name: 'Maria Oliveira',
            email: 'maria.o@sample.net',
            phone: '(11) 91234-5678',
            eventCount: 2,
            totalSpent: 220.00
          },
          { 
            name: 'Carlos Pereira',
            email: 'carlos.p@domain.org',
            phone: '(11) 99876-5432',
            eventCount: 1,
            totalSpent: 80.00
          },
          { 
            name: 'Ana Santos',
            email: 'ana.santos@email.com',
            phone: '(11) 92345-6789',
            eventCount: 4,
            totalSpent: 480.00
          },
          { 
            name: 'Roberto Almeida',
            email: 'roberto.a@company.com',
            phone: '(11) 93456-7890',
            eventCount: 2,
            totalSpent: 160.00
          }
        ];
      
      case 'drivers':
        return [
          { 
            name: 'Carlos Motorista',
            phone: '(11) 98765-4321',
            eventCount: 12,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
          },
          { 
            name: 'Fernanda Condutora',
            phone: '(11) 91234-5678',
            eventCount: 8,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
          },
          { 
            name: 'Ricardo Piloto',
            phone: '(11) 99876-5432',
            eventCount: 15,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate())
          }
        ];
      
      case 'vehicles':
        return [
          { 
            plate: 'ABC-1234',
            model: 'Sprinter',
            status: 'Disponível',
            eventCount: 25,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
          },
          { 
            plate: 'DEF-5678',
            model: 'Corolla',
            status: 'Em Uso',
            eventCount: 10,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate())
          },
          { 
            plate: 'GHI-9012',
            model: 'Paradiso G7',
            status: 'Em Manutenção',
            eventCount: 30,
            lastEvent: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5)
          }
        ];
      
      default:
        return [];
    }
  }
}
