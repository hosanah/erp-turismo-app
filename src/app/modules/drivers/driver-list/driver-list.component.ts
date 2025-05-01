// driver-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, inject } from "@angular/core"; // Added ViewChild, AfterViewInit, inject
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Removed: import { ConfirmationService, MessageService } from \'primeng/api\';
import { MatSnackBar } from "@angular/material/snack-bar"; // Added
import { MatDialog } from "@angular/material/dialog"; // Added
import { MatTableDataSource } from "@angular/material/table"; // Added
import { MatPaginator } from "@angular/material/paginator"; // Added
import { MatSort } from "@angular/material/sort"; // Added

// Importando o serviço real com caminho corrigido
import { DriverService } from "../../../core/services/driver.service";

// Placeholder for Driver type - replace with actual model
interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiryDate: Date | string; // Allow string for form binding, convert later
  phone?: string;
  notes?: string;
  companyId?: string;
  createdAt?: Date;
  isActive?: boolean;
}

// TODO: Create a separate component for the driver form dialog (e.g., DriverDialogComponent)
// TODO: Create a separate component for the confirmation dialog (e.g., ConfirmDialogComponent)

@Component({
  selector: "app-driver-list",
  templateUrl: "./driver-list.component.html",
  styleUrls: ["./driver-list.component.scss"],
})
export class DriverListComponent implements OnInit, AfterViewInit {
  // Removed: drivers: any[] = [];
  // Removed: displayDriverDialog: boolean = false;
  driverForm!: FormGroup;
  driverDialogMode: "add" | "edit" = "add";
  selectedDriverId: string | null = null;
  isLoading: boolean = false;

  // Added for MatTable
  displayedColumns: string[] = [
    "name",
    "licenseNumber",
    "licenseExpiryDate",
    "phone",
    "actions",
  ];
  dataSource = new MatTableDataSource<Driver>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    // Removed: private messageService: MessageService,
    // Removed: private confirmationService: ConfirmationService,
    private snackBar: MatSnackBar, // Added
    private dialog: MatDialog, // Added
    private driverService: DriverService // Injetando o serviço real
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm(): void {
    this.driverForm = this.fb.group({
      name: ["", Validators.required],
      licenseNumber: ["", Validators.required],
      licenseExpiryDate: [null, Validators.required],
      phone: [""],
      notes: [""],
    });
  }

  loadDrivers(): void {
    this.isLoading = true;
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        // Removed: this.drivers = data;
        this.dataSource.data = data; // Assign data to MatTableDataSource
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar motoristas:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao carregar motoristas.", "Erro", {
          duration: 3000,
        });
        this.isLoading = false;
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackDriverData();
      },
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackDriverData(): void {
    const now = new Date();
    const fallbackData = [
      {
        id: "driver1",
        companyId: "comp1",
        name: "Carlos Motorista",
        licenseNumber: "12345678901",
        licenseExpiryDate: new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()),
        phone: "(11) 98765-4321",
        notes: "Experiência com vans e ônibus",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "driver2",
        companyId: "comp1",
        name: "Roberto Motorista",
        licenseNumber: "98765432109",
        licenseExpiryDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        phone: "(11) 91234-5678",
        notes: "Especializado em carros executivos",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "driver3",
        companyId: "comp1",
        name: "Ana Motorista",
        licenseNumber: "45678912345",
        licenseExpiryDate: new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()),
        phone: "(11) 99876-5432",
        notes: "",
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

  openNewDriverDialog(): void {
    this.driverDialogMode = "add";
    this.selectedDriverId = null;
    this.driverForm.reset();
    // Removed: this.displayDriverDialog = true;
    this.openDriverFormDialog(); // Use MatDialog
  }

  editDriver(driver: Driver): void {
    this.driverDialogMode = "edit";
    this.selectedDriverId = driver.id;
    // Ensure date is in a format the form control can handle (e.g., Date object or ISO string)
    const expiryDate = typeof driver.licenseExpiryDate === 'string' ? new Date(driver.licenseExpiryDate) : driver.licenseExpiryDate;
    this.driverForm.patchValue({ ...driver, licenseExpiryDate: expiryDate });
    // Removed: this.displayDriverDialog = true;
    this.openDriverFormDialog(); // Use MatDialog
  }

  openDriverFormDialog(): void {
    // Placeholder: Open MatDialog with DriverDialogComponent
    // const dialogRef = this.dialog.open(DriverDialogComponent, {
    //   width: \'500px\',
    //   data: { form: this.driverForm, mode: this.driverDialogMode }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === \'save\') {
    //     this.saveDriver();
    //   }
    // });
    console.log("Placeholder: Open MatDialog for driver form.");
    this.snackBar.open(
      `Placeholder: Abrindo diálogo para ${this.driverDialogMode} motorista.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires DriverDialogComponent
  }

  saveDriver(): void {
    // This logic will likely move to the DriverDialogComponent or be triggered by its closing event
    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      // Replaced: this.messageService.add({...});
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Atenção", {
        duration: 3000,
      });
      return;
    }

    const driverData = this.driverForm.value;

    if (this.driverDialogMode === "add") {
      this.driverService.createDriver(driverData).subscribe({
        next: (response) => {
          this.loadDrivers();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Motorista adicionado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayDriverDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao adicionar motorista:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao adicionar motorista.", "Erro", {
            duration: 3000,
          });
        },
      });
    } else {
      this.driverService.updateDriver(this.selectedDriverId!, driverData).subscribe({
        next: (response) => {
          this.loadDrivers();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Motorista atualizado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayDriverDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao atualizar motorista:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao atualizar motorista.", "Erro", {
            duration: 3000,
          });
        },
      });
    }
  }

  deleteDriver(driver: Driver): void {
    // Placeholder: Open MatDialog with ConfirmDialogComponent
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { 
    //     title: \'Confirmar Exclusão\',
    //     message: `Tem certeza que deseja excluir o motorista ${driver.name}?`
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { // If confirmed
    //     this.performDelete(driver.id);
    //   }
    // });
    console.log("Placeholder: Open MatDialog for confirmation.");
    this.snackBar.open(
      `Placeholder: Abrindo confirmação para excluir ${driver.name}.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires ConfirmDialogComponent
    // For now, call performDelete directly for testing (remove later)
    // this.performDelete(driver.id);
  }

  // Separated delete logic to be called after confirmation
  private performDelete(driverId: string): void {
    this.driverService.deleteDriver(driverId).subscribe({
      next: (response) => {
        this.loadDrivers();
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Motorista excluído com sucesso.", "Sucesso", {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error("Erro ao excluir motorista:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao excluir motorista.", "Erro", { duration: 3000 });
      },
    });
  }
}

