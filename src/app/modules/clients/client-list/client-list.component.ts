// client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando o serviço real
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: any[] = [];
  displayClientDialog: boolean = false;
  clientForm!: FormGroup;
  clientDialogMode: 'add' | 'edit' = 'add';
  selectedClientId: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
    this.loadClients();
    this.initializeForm();
  }

  initializeForm(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      document: ['']
      // Add other fields as needed
    });
  }

  loadClients(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar os clientes
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar clientes.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackData(): void {
    this.clients = [
      { id: 'uuid1', companyId: 'comp1', name: 'João Silva', email: 'joao.silva@example.com', phone: '(11) 98765-4321', document: '123.456.789-00', createdAt: new Date(), isActive: true },
      { id: 'uuid2', companyId: 'comp1', name: 'Maria Oliveira', email: 'maria.o@sample.net', phone: '(21) 91234-5678', document: '987.654.321-99', createdAt: new Date(), isActive: true },
      { id: 'uuid3', companyId: 'comp1', name: 'Carlos Pereira', email: 'carlos.p@domain.org', phone: '(31) 99999-8888', document: '111.222.333-44', createdAt: new Date(), isActive: true }
    ];
  }

  openNewClientDialog(): void {
    this.clientDialogMode = 'add';
    this.selectedClientId = null;
    this.clientForm.reset();
    this.displayClientDialog = true;
  }

  editClient(client: any): void {
    this.clientDialogMode = 'edit';
    this.selectedClientId = client.id;
    this.clientForm.patchValue(client);
    this.displayClientDialog = true;
  }

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const clientData = this.clientForm.value;

    if (this.clientDialogMode === 'add') {
      // Usando o serviço real para adicionar um cliente
      this.clientService.createClient(clientData).subscribe({
        next: (response) => {
          this.loadClients(); // Recarrega a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente adicionado com sucesso.' });
          this.displayClientDialog = false;
        },
        error: (err) => {
          console.error('Erro ao adicionar cliente:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar cliente.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar um cliente
      this.clientService.updateClient(this.selectedClientId!, clientData).subscribe({
        next: (response) => {
          this.loadClients(); // Recarrega a lista após atualizar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso.' });
          this.displayClientDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar cliente.' });
        }
      });
    }
  }

  deleteClient(client: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o cliente ${client.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir um cliente
        this.clientService.deleteClient(client.id).subscribe({
          next: (response) => {
            this.loadClients(); // Recarrega a lista após excluir
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluído com sucesso.' });
          },
          error: (err) => {
            console.error('Erro ao excluir cliente:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir cliente.' });
          }
        });
      }
    });
  }
}
