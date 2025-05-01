// partner-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private partnerService: PartnerService // Injetando o serviço real
  ) { }

  ngOnInit(): void {
  }

}
