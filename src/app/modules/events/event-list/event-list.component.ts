// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando os serviços reais
import { EventService } from '../../core/services/event.service';
import { DriverService } from '../../core/services/driver.service';
import { VehicleService } from '../../core/services/vehicle.service';
import { PartnerService } from '../../core/services/partner.service';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[] = [];
  displayEventDialog: boolean = false;
  eventForm!: FormGroup;
  eventDialogMode: 'add' | 'edit' = 'add';
  selectedEventId: string | null = null;
  isLoading: boolean = false;

  // Dropdown options
  eventTypes = [
    { label: 'Particular', value: 'Particular' },
    { label: 'Coletivo', value: 'Coletivo' }
  ];

  // Dados para dropdowns
  availableDrivers: any[] = [];
  availableVehicles: any[] = [];
  availablePartners: any[] = [];
  availableClients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private eventService: EventService,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private partnerService: PartnerService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
    this.loadDropdownData();
    this.initializeForm();
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      description: [''],
      type: ['Particular', Validators.required],
      driverId: [null],
      vehicleId: [null],
      partnerId: [null],
      clientIds: [[]] // Para multiselect
    });
  }

  loadEvents(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar os eventos
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar eventos.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackEventData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackEventData(): void {
    const now = new Date();
    this.events = [
      { 
        id: 'event1', 
        companyId: 'comp1', 
        title: 'Passeio Turístico - Centro Histórico', 
        description: 'Tour guiado pelo centro histórico da cidade',
        type: 'Coletivo',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
        driver: { id: 'driver1', name: 'Carlos Motorista' },
        vehicle: { id: 'vehicle1', plate: 'ABC-1234', model: 'Van Mercedes Sprinter' },
        partner: { id: 'partner1', name: 'Agência Turismo Total' },
        clients: [
          { id: 'client1', name: 'João Silva' },
          { id: 'client2', name: 'Maria Oliveira' }
        ],
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'event2', 
        companyId: 'comp1', 
        title: 'Transfer Aeroporto', 
        description: 'Transfer privativo do aeroporto para o hotel',
        type: 'Particular',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 15, 30),
        driver: { id: 'driver2', name: 'Roberto Motorista' },
        vehicle: { id: 'vehicle2', plate: 'DEF-5678', model: 'Toyota Corolla' },
        partner: null,
        clients: [
          { id: 'client3', name: 'Carlos Pereira' }
        ],
        createdAt: new Date(),
        isActive: true
      }
    ];
  }

  loadDropdownData(): void {
    // Carregando dados para os dropdowns usando os serviços reais
    
    // Carregando motoristas
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.availableDrivers = data;
      },
      error: (err) => {
        console.error('Erro ao carregar motoristas:', err);
        // Fallback para dados de exemplo
        this.availableDrivers = [
          { id: 'driver1', name: 'Carlos Motorista' },
          { id: 'driver2', name: 'Roberto Motorista' },
          { id: 'driver3', name: 'Ana Motorista' }
        ];
      }
    });

    // Carregando veículos
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.availableVehicles = data;
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
        // Fallback para dados de exemplo
        this.availableVehicles = [
          { id: 'vehicle1', plate: 'ABC-1234', model: 'Van Mercedes Sprinter' },
          { id: 'vehicle2', plate: 'DEF-5678', model: 'Toyota Corolla' },
          { id: 'vehicle3', plate: 'GHI-9012', model: 'Ônibus Executivo' }
        ];
      }
    });

    // Carregando parceiros
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.availablePartners = data;
      },
      error: (err) => {
        console.error('Erro ao carregar parceiros:', err);
        // Fallback para dados de exemplo
        this.availablePartners = [
          { id: 'partner1', name: 'Agência Turismo Total' },
          { id: 'partner2', name: 'Hotel Central' },
          { id: 'partner3', name: 'Restaurante Sabor Regional' }
        ];
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
        this.availableClients = [
          { id: 'client1', name: 'João Silva', email: 'joao.silva@example.com', document: '123.456.789-00' },
          { id: 'client2', name: 'Maria Oliveira', email: 'maria.o@sample.net', document: '987.654.321-99' },
          { id: 'client3', name: 'Carlos Pereira', email: 'carlos.p@domain.org', document: '111.222.333-44' }
        ];
      }
    });
  }

  openNewEventDialog(): void {
    this.eventDialogMode = 'add';
    this.selectedEventId = null;
    this.eventForm.reset({
      type: 'Particular', // Valor padrão
      clientIds: [] // Inicializa array vazio para multiselect
    });
    this.displayEventDialog = true;
  }

  editEvent(event: any): void {
    this.eventDialogMode = 'edit';
    this.selectedEventId = event.id;
    
    // Mapeia IDs de clientes para multiselect
    const clientIds = event.clients?.map((client: any) => client.id) || [];
    
    this.eventForm.patchValue({
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      type: event.type,
      driverId: event.driver?.id,
      vehicleId: event.vehicle?.id,
      partnerId: event.partner?.id,
      clientIds: clientIds
    });
    
    this.displayEventDialog = true;
  }

  saveEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const eventData = this.eventForm.value;
    
    if (this.eventDialogMode === 'add') {
      // Usando o serviço real para adicionar um evento
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          this.loadEvents(); // Recarrega a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento adicionado com sucesso.' });
          this.displayEventDialog = false;
        },
        error: (err) => {
          console.error('Erro ao adicionar evento:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar evento.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar um evento
      this.eventService.updateEvent(this.selectedEventId!, eventData).subscribe({
        next: (response) => {
          this.loadEvents(); // Recarrega a lista após atualizar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento atualizado com sucesso.' });
          this.displayEventDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar evento.' });
        }
      });
    }
  }

  deleteEvent(event: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o evento "${event.title}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir um evento
        this.eventService.deleteEvent(event.id).subscribe({
          next: (response) => {
            this.loadEvents(); // Recarrega a lista após excluir
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento excluído com sucesso.' });
          },
          error: (err) => {
            console.error('Erro ao excluir evento:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir evento.' });
          }
        });
      }
    });
  }

  getSeverity(type: string): string {
    switch (type) {
      case 'Particular':
        return 'info';
      case 'Coletivo':
        return 'warning';
      default:
        return 'info';
    }
  }
}
