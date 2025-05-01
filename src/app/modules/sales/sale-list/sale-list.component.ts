// sale-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core"; // Added ViewChild, AfterViewInit
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Removed: import { ConfirmationService, MessageService } from \"primeng/api\";
import { MatSnackBar } from "@angular/material/snack-bar"; // Added
import { MatDialog } from "@angular/material/dialog"; // Added
import { MatTableDataSource } from "@angular/material/table"; // Added
import { MatPaginator } from "@angular/material/paginator"; // Added
import { MatSort } from "@angular/material/sort"; // Added

// Importando os serviços reais com caminhos corrigidos
import { SaleService } from "../../../core/services/sale.service";
import { EventService } from "../../../core/services/event.service";
import { ClientService } from "../../../core/services/client.service";

// Placeholder for Sale, Event, Client types - replace with actual models
interface Sale {
  id: string;
  event?: { id: string; title: string };
  client?: { id: string; name: string };
  voucherCode?: string;
  saleDate: Date | string;
  totalAmount: number;
  notes?: string;
  companyId?: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface EventItem {
  id: string;
  title: string;
  startDate: Date;
}

interface ClientItem {
  id: string;
  name: string;
  email: string,
  document: string
}

// TODO: Create a separate component for the sale form dialog (e.g., SaleDialogComponent)
// TODO: Create a separate component for the confirmation dialog (e.g., ConfirmDialogComponent)
// TODO: Create a separate component for the voucher dialog (e.g., VoucherDialogComponent)

@Component({
  selector: "app-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
})
export class SaleListComponent implements OnInit, AfterViewInit {
  // Removed: sales: any[] = [];
  // Removed: displaySaleDialog: boolean = false;
  // Removed: displayVoucherDialog: boolean = false;
  saleForm!: FormGroup;
  saleDialogMode: "add" | "edit" = "add";
  selectedSaleId: string | null = null;
  selectedSaleForVoucher: Sale | null = null;
  isLoading: boolean = false;

  // Dados para dropdowns (Keep for MatSelect)
  availableEvents: EventItem[] = [];
  availableClients: ClientItem[] = [];

  // Added for MatTable
  displayedColumns: string[] = [
    "voucherCode",
    "clientName",
    "eventName",
    "saleDate",
    "totalAmount",
    "actions",
  ];
  dataSource = new MatTableDataSource<Sale>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    // Removed: private messageService: MessageService,
    // Removed: private confirmationService: ConfirmationService,
    private snackBar: MatSnackBar, // Added
    private dialog: MatDialog, // Added
    private saleService: SaleService,
    private eventService: EventService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadDropdownData();
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm(): void {
    this.saleForm = this.fb.group({
      eventId: [null, Validators.required],
      clientId: [null, Validators.required],
      saleDate: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0.01)]],
      notes: [""],
    });
  }

  loadSales(): void {
    this.isLoading = true;
    this.saleService.getSales().subscribe({
      next: (data) => {
        // Removed: this.sales = data;
        this.dataSource.data = data; // Assign data to MatTableDataSource
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar vendas:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao carregar vendas.", "Erro", { duration: 3000 });
        this.isLoading = false;
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackSaleData();
      },
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackSaleData(): void {
    const now = new Date();
    const fallbackData = [
      {
        id: "sale1",
        companyId: "comp1",
        event: { id: "event1", title: "Passeio Turístico - Centro Histórico" },
        client: { id: "client1", name: "João Silva" },
        voucherCode: "TOUR-2025-001",
        saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
        totalAmount: 150.0,
        notes: "Cliente solicitou guia que fale inglês",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "sale2",
        companyId: "comp1",
        event: { id: "event2", title: "Transfer Aeroporto" },
        client: { id: "client3", name: "Carlos Pereira" },
        voucherCode: "TRAN-2025-002",
        saleDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        totalAmount: 80.0,
        notes: "",
        createdAt: new Date(),
        isActive: true,
      },
    ];
    this.dataSource.data = fallbackData;
  }

  loadDropdownData(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.availableEvents = data;
      },
      error: (err) => {
        console.error("Erro ao carregar eventos:", err);
        this.loadFallbackEventData();
      },
    });

    this.clientService.getClients().subscribe({
      next: (data) => {
        this.availableClients = data;
      },
      error: (err) => {
        console.error("Erro ao carregar clientes:", err);
        this.loadFallbackClientData();
      },
    });
  }

  // Métodos de fallback para desenvolvimento
  private loadFallbackEventData(): void {
    const now = new Date();
    this.availableEvents = [
      {
        id: "event1",
        title: "Passeio Turístico - Centro Histórico",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 9, 0),
      },
      {
        id: "event2",
        title: "Transfer Aeroporto",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 14, 0),
      },
      {
        id: "event3",
        title: "City Tour - Praias",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 8, 0),
      },
    ];
  }

  private loadFallbackClientData(): void {
    this.availableClients = [
      { id: "client1", name: "João Silva", email: "joao.silva@example.com", document: "123.456.789-00" },
      { id: "client2", name: "Maria Oliveira", email: "maria.o@sample.net", document: "987.654.321-99" },
      { id: "client3", name: "Carlos Pereira", email: "carlos.p@domain.org", document: "111.222.333-44" },
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openNewSaleDialog(): void {
    this.saleDialogMode = "add";
    this.selectedSaleId = null;
    this.saleForm.reset({ saleDate: new Date(), totalAmount: 0 });
    // Removed: this.displaySaleDialog = true;
    this.openSaleFormDialog(); // Use MatDialog
  }

  editSale(sale: Sale): void {
    this.saleDialogMode = "edit";
    this.selectedSaleId = sale.id;
    // Ensure date is in a format the form control can handle
    const saleDate = typeof sale.saleDate === 'string' ? new Date(sale.saleDate) : sale.saleDate;
    this.saleForm.patchValue({ ...sale, eventId: sale.event?.id, clientId: sale.client?.id, saleDate: saleDate });
    // Removed: this.displaySaleDialog = true;
    this.openSaleFormDialog(); // Use MatDialog
  }

  openSaleFormDialog(): void {
    // Placeholder: Open MatDialog with SaleDialogComponent
    // const dialogRef = this.dialog.open(SaleDialogComponent, {
    //   width: \"600px\",
    //   data: { 
    //     form: this.saleForm, 
    //     mode: this.saleDialogMode, 
    //     events: this.availableEvents, 
    //     clients: this.availableClients 
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === \"save\") {
    //     this.saveSale();
    //   }
    // });
    console.log("Placeholder: Open MatDialog for sale form.");
    this.snackBar.open(
      `Placeholder: Abrindo diálogo para ${this.saleDialogMode} venda.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires SaleDialogComponent
  }

  saveSale(): void {
    // This logic will likely move to the SaleDialogComponent or be triggered by its closing event
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
      // Replaced: this.messageService.add({...});
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Atenção", {
        duration: 3000,
      });
      return;
    }

    const saleData = this.saleForm.value;

    if (this.saleDialogMode === "add") {
      this.saleService.createSale(saleData).subscribe({
        next: (response) => {
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Venda registrada e voucher gerado.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displaySaleDialog = false;
          this.selectedSaleForVoucher = response; // Keep for voucher display
          this.openVoucherDialog(); // Open voucher dialog
          this.loadSales();
        },
        error: (err) => {
          console.error("Erro ao registrar venda:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao registrar venda.", "Erro", { duration: 3000 });
        },
      });
    } else {
      this.saleService.updateSale(this.selectedSaleId!, saleData).subscribe({
        next: (response) => {
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Venda atualizada.", "Sucesso", { duration: 3000 });
          // Removed: this.displaySaleDialog = false;
          this.loadSales();
        },
        error: (err) => {
          console.error("Erro ao atualizar venda:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao atualizar venda.", "Erro", { duration: 3000 });
        },
      });
    }
  }

  deleteSale(sale: Sale): void {
    // Placeholder: Open MatDialog with ConfirmDialogComponent
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { 
    //     title: \"Confirmar Exclusão\",
    //     message: `Tem certeza que deseja excluir a venda do voucher ${sale.voucherCode}?`
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { // If confirmed
    //     this.performDelete(sale.id);
    //   }
    // });
    console.log("Placeholder: Open MatDialog for confirmation.");
    this.snackBar.open(
      `Placeholder: Abrindo confirmação para excluir ${sale.voucherCode}.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires ConfirmDialogComponent
    // For now, call performDelete directly for testing (remove later)
    // this.performDelete(sale.id);
  }

  // Separated delete logic
  private performDelete(saleId: string): void {
    this.saleService.deleteSale(saleId).subscribe({
      next: (response) => {
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Venda excluída.", "Sucesso", { duration: 3000 });
        this.loadSales();
      },
      error: (err) => {
        console.error("Erro ao excluir venda:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao excluir venda.", "Erro", { duration: 3000 });
      },
    });
  }

  viewVoucher(sale: Sale): void {
    this.selectedSaleForVoucher = sale;
    // Removed: this.displayVoucherDialog = true;
    this.openVoucherDialog(); // Use MatDialog
  }

  openVoucherDialog(): void {
    if (!this.selectedSaleForVoucher) return;
    // Placeholder: Open MatDialog with VoucherDialogComponent
    // const dialogRef = this.dialog.open(VoucherDialogComponent, {
    //   width: \"800px\", // Adjust size as needed
    //   data: { sale: this.selectedSaleForVoucher }
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.selectedSaleForVoucher = null; // Clear selection after closing
    // });
    console.log("Placeholder: Open MatDialog for voucher display.");
    this.snackBar.open(
      `Placeholder: Abrindo voucher ${this.selectedSaleForVoucher.voucherCode}.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires VoucherDialogComponent
  }

  // Removed printVoucher - should be handled within VoucherDialogComponent

  // Removed getVoucher - likely redundant if voucher data is part of Sale object
}

