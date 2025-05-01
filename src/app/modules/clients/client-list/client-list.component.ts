// client-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, inject } from "@angular/core"; // Added ViewChild, AfterViewInit, inject
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Removed: import { ConfirmationService, MessageService } from 'primeng/api';
import { MatSnackBar } from "@angular/material/snack-bar"; // Added
import { MatDialog } from "@angular/material/dialog"; // Added
import { MatTableDataSource } from "@angular/material/table"; // Added
import { MatPaginator } from "@angular/material/paginator"; // Added
import { MatSort } from "@angular/material/sort"; // Added

// Importando o serviço real com caminho corrigido
import { ClientService } from "../../../core/services/client.service";

// Placeholder for Client type - replace with actual model
interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  companyId?: string; // Added missing property
  createdAt?: Date; // Added missing property
  isActive?: boolean; // Added missing property
  // Add other properties as needed
}

// TODO: Create a separate component for the client form dialog (e.g., ClientDialogComponent)
// TODO: Create a separate component for the confirmation dialog (e.g., ConfirmDialogComponent)

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit, AfterViewInit {
  // Removed: clients: Client[] = [];
  // Removed: selectedClients: Client[] = [];
  // Removed: displayClientDialog: boolean = false;
  clientForm!: FormGroup;
  clientDialogMode: "add" | "edit" = "add";
  selectedClientId: string | null = null;
  isLoading: boolean = false;

  // Added for MatTable
  displayedColumns: string[] = ["name", "email", "phone", "document", "actions"];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    // Removed: private messageService: MessageService,
    // Removed: private confirmationService: ConfirmationService,
    private snackBar: MatSnackBar, // Added
    private dialog: MatDialog, // Added
    private clientService: ClientService // Injetando o serviço real
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm(): void {
    this.clientForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      document: [""],
      // Add other fields as needed
    });
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        // Removed: this.clients = data;
        this.dataSource.data = data; // Assign data to MatTableDataSource
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar clientes:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao carregar clientes.", "Erro", {
          duration: 3000,
        });
        this.isLoading = false;
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackData();
      },
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackData(): void {
    const fallbackData = [
      {
        id: "uuid1",
        companyId: "comp1",
        name: "João Silva",
        email: "joao.silva@example.com",
        phone: "(11) 98765-4321",
        document: "123.456.789-00",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "uuid2",
        companyId: "comp1",
        name: "Maria Oliveira",
        email: "maria.o@sample.net",
        phone: "(21) 91234-5678",
        document: "987.654.321-99",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "uuid3",
        companyId: "comp1",
        name: "Carlos Pereira",
        email: "carlos.p@domain.org",
        phone: "(31) 99999-8888",
        document: "111.222.333-44",
        createdAt: new Date(),
        isActive: true,
      },
    ];
    this.dataSource.data = fallbackData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openNewClientDialog(): void {
    this.clientDialogMode = "add";
    this.selectedClientId = null;
    this.clientForm.reset();
    // Removed: this.displayClientDialog = true;
    this.openClientFormDialog(); // Use MatDialog
  }

  editClient(client: Client): void {
    this.clientDialogMode = "edit";
    this.selectedClientId = client.id;
    this.clientForm.patchValue(client);
    // Removed: this.displayClientDialog = true;
    this.openClientFormDialog(); // Use MatDialog
  }

  openClientFormDialog(): void {
    // Placeholder: Open MatDialog with ClientDialogComponent
    // const dialogRef = this.dialog.open(ClientDialogComponent, {
    //   width: '500px',
    //   data: { form: this.clientForm, mode: this.clientDialogMode }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'save') {
    //     this.saveClient();
    //   }
    // });
    console.log("Placeholder: Open MatDialog for client form.");
    this.snackBar.open(
      `Placeholder: Abrindo diálogo para ${this.clientDialogMode} cliente.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires ClientDialogComponent
  }

  saveClient(): void {
    // This logic will likely move to the ClientDialogComponent or be triggered by its closing event
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      // Replaced: this.messageService.add({...});
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Atenção", {
        duration: 3000,
      });
      return;
    }

    const clientData = this.clientForm.value;

    if (this.clientDialogMode === "add") {
      this.clientService.createClient(clientData).subscribe({
        next: (response) => {
          this.loadClients();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Cliente adicionado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayClientDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao adicionar cliente:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao adicionar cliente.", "Erro", {
            duration: 3000,
          });
        },
      });
    } else {
      this.clientService.updateClient(this.selectedClientId!, clientData).subscribe({
        next: (response) => {
          this.loadClients();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Cliente atualizado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayClientDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao atualizar cliente:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao atualizar cliente.", "Erro", {
            duration: 3000,
          });
        },
      });
    }
  }

  deleteClient(client: Client): void {
    // Placeholder: Open MatDialog with ConfirmDialogComponent
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { 
    //     title: 'Confirmar Exclusão',
    //     message: `Tem certeza que deseja excluir o cliente ${client.name}?`
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { // If confirmed
    //     this.performDelete(client.id);
    //   }
    // });
    console.log("Placeholder: Open MatDialog for confirmation.");
    this.snackBar.open(
      `Placeholder: Abrindo confirmação para excluir ${client.name}.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires ConfirmDialogComponent
    // For now, call performDelete directly for testing (remove later)
    // this.performDelete(client.id);
  }

  // Separated delete logic to be called after confirmation
  private performDelete(clientId: string): void {
    this.clientService.deleteClient(clientId).subscribe({
      next: (response) => {
        this.loadClients();
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Cliente excluído com sucesso.", "Sucesso", {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error("Erro ao excluir cliente:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao excluir cliente.", "Erro", { duration: 3000 });
      },
    });
  }
}

