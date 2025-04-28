// partner-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importando o serviço real com caminho corrigido
import { PartnerService } from '../../../core/services/partner.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  partners: any[] = [];
  displayPartnerDialog: boolean = false;
  partnerForm!: FormGroup;
  partnerDialogMode: 'add' | 'edit' = 'add';
  selectedPartnerId: string | null = null;
  isLoading: boolean = false;

  // Opções do dropdown
  partnerCategories = [
    { label: 'Agência de Turismo', value: 'Agência de Turismo' },
    { label: 'Hotel', value: 'Hotel' },
    { label: 'Restaurante', value: 'Restaurante' },
    { label: 'Atração Turística', value: 'Atração Turística' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Outro', value: 'Outro' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private partnerService: PartnerService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
    this.loadPartners();
    this.initializeForm();
  }

  initializeForm(): void {
    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      contactName: [''],
      phone: [''],
      email: ['', [Validators.email]],
      address: [''],
      notes: ['']
    });
  }

  loadPartners(): void {
    this.isLoading = true;
    // Usando o serviço real para buscar os parceiros
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar parceiros:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar parceiros.' });
        this.isLoading = false;
        
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackPartnerData();
      }
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackPartnerData(): void {
    this.partners = [
      { 
        id: 'partner1', 
        companyId: 'comp1', 
        name: 'Agência Turismo Total',
        category: 'Agência de Turismo',
        contactName: 'Roberto Almeida',
        phone: '(11) 3456-7890',
        email: 'contato@turismototal.com.br',
        address: 'Av. Paulista, 1000, São Paulo - SP',
        notes: 'Parceiro desde 2020',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'partner2', 
        companyId: 'comp1', 
        name: 'Hotel Central',
        category: 'Hotel',
        contactName: 'Ana Silva',
        phone: '(11) 2345-6789',
        email: 'reservas@hotelcentral.com.br',
        address: 'Rua Augusta, 500, São Paulo - SP',
        notes: '',
        createdAt: new Date(),
        isActive: true
      },
      { 
        id: 'partner3', 
        companyId: 'comp1', 
        name: 'Restaurante Sabor Regional',
        category: 'Restaurante',
        contactName: 'Carlos Santos',
        phone: '(11) 3333-4444',
        email: 'contato@saborregional.com.br',
        address: 'Rua Oscar Freire, 200, São Paulo - SP',
        notes: 'Especializado em culinária regional',
        createdAt: new Date(),
        isActive: true
      }
    ];
  }

  openNewPartnerDialog(): void {
    this.partnerDialogMode = 'add';
    this.selectedPartnerId = null;
    this.partnerForm.reset();
    this.displayPartnerDialog = true;
  }

  editPartner(partner: any): void {
    this.partnerDialogMode = 'edit';
    this.selectedPartnerId = partner.id;
    
    this.partnerForm.patchValue({
      name: partner.name,
      category: partner.category,
      contactName: partner.contactName,
      phone: partner.phone,
      email: partner.email,
      address: partner.address,
      notes: partner.notes
    });
    
    this.displayPartnerDialog = true;
  }

  savePartner(): void {
    if (this.partnerForm.invalid) {
      this.partnerForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const partnerData = this.partnerForm.value;
    
    if (this.partnerDialogMode === 'add') {
      // Usando o serviço real para adicionar um parceiro
      this.partnerService.createPartner(partnerData).subscribe({
        next: (response) => {
          this.loadPartners(); // Recarrega a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro adicionado com sucesso.' });
          this.displayPartnerDialog = false;
        },
        error: (err) => {
          console.error('Erro ao adicionar parceiro:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar parceiro.' });
        }
      });
    } else {
      // Usando o serviço real para atualizar um parceiro
      this.partnerService.updatePartner(this.selectedPartnerId!, partnerData).subscribe({
        next: (response) => {
          this.loadPartners(); // Recarrega a lista após atualizar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro atualizado com sucesso.' });
          this.displayPartnerDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar parceiro:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar parceiro.' });
        }
      });
    }
  }

  deletePartner(partner: any): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o parceiro ${partner.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Usando o serviço real para excluir um parceiro
        this.partnerService.deletePartner(partner.id).subscribe({
          next: (response) => {
            this.loadPartners(); // Recarrega a lista após excluir
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro excluído com sucesso.' });
          },
          error: (err) => {
            console.error('Erro ao excluir parceiro:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir parceiro.' });
          }
        });
      }
    });
  }
}
