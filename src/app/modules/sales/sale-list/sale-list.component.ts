// sale-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando os serviços reais com caminhos corrigidos
import { SaleService } from '../../../core/services/sale.service';
import { EventService } from '../../../core/services/event.service';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {

  sales: any[] = [];
  displaySaleDialog: boolean = false;
  displayVoucherDialog: boolean = false;
  saleForm!: FormGroup;
  saleDialogMode: 'add' | 'edit' = 'add';
  selectedSaleId: string | null = null;
  selectedSaleForVoucher: any | null = null;
  isLoading: boolean = false;

  // Dados para dropdowns
  availableEvents: any[] = [];
  availableClients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private saleService: SaleService,
    private eventService: EventService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.loadSales();
    this.loadDropdownData();
    this.initializeForm();
  }

  initializeForm(): void {
    this.saleForm = this.fb.group({
      eventId: [null, Validators.required],
      clientId: [null, Validators.required],
      saleDate: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0.01)]],
      notes: ['']
    });
  }

  loadSales(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar as vendas
    this.saleService.getSales().subscribe({
      next: (data) => {
        this.sales = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar vendas:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar vendas.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackSaleData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackSaleData(): void {
    const now = new Date();
    this.sales = [
      { 
        id: 'sale1', 
        companyId: 'comp1', 
        event: { id: 'event1', title: 'Passeio Turístico - Centro Histórico' },
        client: { id: 'client1', name: 'João Silva' },
        voucherCode: 'TOUR-2025-001',
        saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
        totalAmount: 150.00,
        notes: 'Cliente solicitou guia que fale inglês',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'sale2', 
        companyId: 'comp1', 
        event: { id: 'event2', title: 'Transfer Aeroporto' },
        client: { id: 'client3', name: 'Carlos Pereira' },
        voucherCode: 'TRAN-2025-002',
        saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        totalAmount: 80.00,
        notes: '',
        createdAt: new Date(),
        isActive: true
      }
    ];
  }

  loadDropdownData(): void {
    // Carregando eventos disponíveis
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.availableEvents = data;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        // Fallback para dados de exemplo
        this.loadFallbackEventData();
      }
    });

    // Carregando clientes
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.availableClients = data;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        // Fallback para dados de exemplo
        this.loadFallbackClientData();
      }
    });
  }

  // Métodos de fallback para desenvolvimento
  private loadFallbackEventData(): void {
    const now = new Date();
    this.availableEvents = [
      { 
        id: 'event1', 
        title: 'Passeio Turístico - Centro Histórico',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 9, 0)
      },
      { 
        id: 'event2', 
        title: 'Transfer Aeroporto',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 14, 0)
      },
      { 
        id: 'event3', 
        title: 'City Tour - Praias',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 8, 0)
      }
    ];
  }

  private loadFallbackClientData(): void {
    this.availableClients = [
      { id: 'client1', name: 'João Silva', email: 'joao.silva@example.com', document: '123.456.789-00' },
      { id: 'client2', name: 'Maria Oliveira', email: 'maria.o@sample.net', document: '987.654.321-99' },
      { id: 'client3', name: 'Carlos Pereira', email: 'carlos.p@domain.org', document: '111.222.333-44' }
    ];
  }

  openNewSaleDialog(): void {
    this.saleDialogMode = 'add';
    this.selectedSaleId = null;
    this.saleForm.reset({
      saleDate: new Date(),
      totalAmount: 0
    });
    this.displaySaleDialog = true;
  }

  editSale(sale: any): void {
    this.saleDialogMode = 'edit';
    this.selectedSaleId = sale.id;
    
    this.saleForm.patchValue({
      eventId: sale.event?.id,
      clientId: sale.client?.id,
      saleDate: sale.saleDate,
      totalAmount: sale.totalAmount,
      notes: sale.notes
    });
    
    this.displaySaleDialog = true;
  }

  saveSale(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const saleData = this.saleForm.value;
    
    if (this.saleDialogMode === 'add') {
      // Usando o serviço real para adicionar uma venda
      this.saleService.createSale(saleData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda registrada e voucher gerado.' });
          
          // Mostrar voucher após criação
          this.selectedSaleForVoucher = response;
          this.displaySaleDialog = false;
          this.displayVoucherDialog = true;
          
          // Recarregar a lista após adicionar
          this.loadSales();
        },
        error: (err) => {
          console.error('Erro ao registrar venda:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao registrar venda.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar uma venda
      this.saleService.updateSale(this.selectedSaleId!, saleData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda atualizada.' });
          this.displaySaleDialog = false;
          
          // Recarregar a lista após atualizar
          this.loadSales();
        },
        error: (err) => {
          console.error('Erro ao atualizar venda:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar venda.' });
        }
      });
    }
  }

  deleteSale(sale: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a venda do voucher ${sale.voucherCode}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir uma venda
        this.saleService.deleteSale(sale.id).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda excluída.' });
            
            // Recarregar a lista após excluir
            this.loadSales();
          },
          error: (err) => {
            console.error('Erro ao excluir venda:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir venda.' });
          }
        });
      }
    });
  }

  viewVoucher(sale: any): void {
    this.selectedSaleForVoucher = sale;
    this.displayVoucherDialog = true;
  }

  printVoucher(): void {
    // Em uma aplicação real, isso usaria um serviço de impressão adequado
    // Por enquanto, vamos apenas usar a funcionalidade de impressão do navegador
    window.print();
  }

  getVoucher(saleId: string): void {
    this.saleService.getVoucher(saleId).subscribe({
      next: (response) => {
        // Aqui você poderia abrir um PDF ou outro formato de voucher
        console.log('Voucher obtido:', response);
      },
      error: (err) => {
        console.error('Erro ao obter voucher:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao obter voucher.' });
      }
    });
  }
}
