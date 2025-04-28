// vehicle-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando o serviço real com caminho corrigido
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicles: any[] = [];
  displayVehicleDialog: boolean = false;
  vehicleForm!: FormGroup;
  vehicleDialogMode: 'add' | 'edit' = 'add';
  selectedVehicleId: string | null = null;
  isLoading: boolean = false;
  currentYear: number = new Date().getFullYear();

  // Opções do dropdown
  vehicleStatuses = [
    { label: 'Disponível', value: 'Disponível' },
    { label: 'Em Manutenção', value: 'Em Manutenção' },
    { label: 'Em Uso', value: 'Em Uso' },
    { label: 'Indisponível', value: 'Indisponível' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private vehicleService: VehicleService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.initializeForm();
  }

  initializeForm(): void {
    this.vehicleForm = this.fb.group({
      plate: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [this.currentYear, [Validators.required, Validators.min(1990), Validators.max(this.currentYear)]],
      capacity: [null, [Validators.required, Validators.min(1)]],
      status: ['Disponível', Validators.required],
      notes: ['']
    });
  }

  loadVehicles(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar os veículos
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar veículos.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackVehicleData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackVehicleData(): void {
    this.vehicles = [
      { 
        id: 'vehicle1', 
        companyId: 'comp1', 
        plate: 'ABC-1234',
        model: 'Sprinter',
        brand: 'Mercedes-Benz',
        year: 2022,
        capacity: 15,
        status: 'Disponível',
        notes: 'Ar condicionado, Wi-Fi',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'vehicle2', 
        companyId: 'comp1', 
        plate: 'DEF-5678',
        model: 'Corolla',
        brand: 'Toyota',
        year: 2023,
        capacity: 4,
        status: 'Em Uso',
        notes: 'Carro executivo',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'vehicle3', 
        companyId: 'comp1', 
        plate: 'GHI-9012',
        model: 'Paradiso G7',
        brand: 'Marcopolo',
        year: 2020,
        capacity: 46,
        status: 'Em Manutenção',
        notes: 'Ônibus executivo, banheiro',
        createdAt: new Date(),
        isActive: true
      }
    ];
  }

  openNewVehicleDialog(): void {
    this.vehicleDialogMode = 'add';
    this.selectedVehicleId = null;
    this.vehicleForm.reset({
      year: this.currentYear,
      status: 'Disponível'
    });
    this.displayVehicleDialog = true;
  }

  editVehicle(vehicle: any): void {
    this.vehicleDialogMode = 'edit';
    this.selectedVehicleId = vehicle.id;
    
    this.vehicleForm.patchValue({
      plate: vehicle.plate,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      capacity: vehicle.capacity,
      status: vehicle.status,
      notes: vehicle.notes
    });
    
    this.displayVehicleDialog = true;
  }

  saveVehicle(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const vehicleData = this.vehicleForm.value;
    
    if (this.vehicleDialogMode === 'add') {
      // Usando o serviço real para adicionar um veículo
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: (response) => {
          this.loadVehicles(); // Recarrega a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo adicionado com sucesso.' });
          this.displayVehicleDialog = false;
        },
        error: (err) => {
          console.error('Erro ao adicionar veículo:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar veículo.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar um veículo
      this.vehicleService.updateVehicle(this.selectedVehicleId!, vehicleData).subscribe({
        next: (response) => {
          this.loadVehicles(); // Recarrega a lista após atualizar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo atualizado com sucesso.' });
          this.displayVehicleDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar veículo:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar veículo.' });
        }
      });
    }
  }

  deleteVehicle(vehicle: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o veículo ${vehicle.plate} (${vehicle.model})?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir um veículo
        this.vehicleService.deleteVehicle(vehicle.id).subscribe({
          next: (response) => {
            this.loadVehicles(); // Recarrega a lista após excluir
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo excluído com sucesso.' });
          },
          error: (err) => {
            console.error('Erro ao excluir veículo:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir veículo.' });
          }
        });
      }
    });
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
      default:
        return 'info';
    }
  }
}
