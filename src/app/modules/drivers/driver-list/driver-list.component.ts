// driver-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando o serviço real com caminho corrigido
import { DriverService } from '../../../core/services/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  drivers: any[] = [];
  displayDriverDialog: boolean = false;
  driverForm!: FormGroup;
  driverDialogMode: 'add' | 'edit' = 'add';
  selectedDriverId: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private driverService: DriverService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
    this.initializeForm();
  }

  initializeForm(): void {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      licenseExpiryDate: [null, Validators.required],
      phone: [''],
      notes: ['']
    });
  }

  loadDrivers(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar os motoristas
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar motoristas:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar motoristas.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackDriverData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackDriverData(): void {
    const now = new Date();
    this.drivers = [
      { 
        id: 'driver1', 
        companyId: 'comp1', 
        name: 'Carlos Motorista',
        licenseNumber: '12345678901',
        licenseExpiryDate: new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()),
        phone: '(11) 98765-4321',
        notes: 'Experiência com vans e ônibus',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'driver2', 
        companyId: 'comp1', 
        name: 'Roberto Motorista',
        licenseNumber: '98765432109',
        licenseExpiryDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        phone: '(11) 91234-5678',
        notes: 'Especializado em carros executivos',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'driver3', 
        companyId: 'comp1', 
        name: 'Ana Motorista',
        licenseNumber: '45678912345',
        licenseExpiryDate: new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()),
        phone: '(11) 99876-5432',
        notes: '',
        createdAt: new Date(),
        isActive: true
      }
    ];
  }

  openNewDriverDialog(): void {
    this.driverDialogMode = 'add';
    this.selectedDriverId = null;
    this.driverForm.reset();
    this.displayDriverDialog = true;
  }

  editDriver(driver: any): void {
    this.driverDialogMode = 'edit';
    this.selectedDriverId = driver.id;
    
    this.driverForm.patchValue({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      licenseExpiryDate: driver.licenseExpiryDate,
      phone: driver.phone,
      notes: driver.notes
    });
    
    this.displayDriverDialog = true;
  }

  saveDriver(): void {
    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const driverData = this.driverForm.value;
    
    if (this.driverDialogMode === 'add') {
      // Usando o serviço real para adicionar um motorista
      this.driverService.createDriver(driverData).subscribe({
        next: (response) => {
          this.loadDrivers(); // Recarrega a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Motorista adicionado com sucesso.' });
          this.displayDriverDialog = false;
        },
        error: (err) => {
          console.error('Erro ao adicionar motorista:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar motorista.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar um motorista
      this.driverService.updateDriver(this.selectedDriverId!, driverData).subscribe({
        next: (response) => {
          this.loadDrivers(); // Recarrega a lista após atualizar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Motorista atualizado com sucesso.' });
          this.displayDriverDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar motorista:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar motorista.' });
        }
      });
    }
  }

  deleteDriver(driver: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o motorista ${driver.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir um motorista
        this.driverService.deleteDriver(driver.id).subscribe({
          next: (response) => {
            this.loadDrivers(); // Recarrega a lista após excluir
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Motorista excluído com sucesso.' });
          },
          error: (err) => {
            console.error('Erro ao excluir motorista:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir motorista.' });
          }
        });
      }
    });
  }
}
