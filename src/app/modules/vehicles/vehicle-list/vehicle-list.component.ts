// vehicle-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core"; // Added ViewChild, AfterViewInit
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Removed: import { ConfirmationService, MessageService } from \"primeng/api\";
import { MatSnackBar } from "@angular/material/snack-bar"; // Added
import { MatDialog } from "@angular/material/dialog"; // Added
import { MatTableDataSource } from "@angular/material/table"; // Added
import { MatPaginator } from "@angular/material/paginator"; // Added
import { MatSort } from "@angular/material/sort"; // Added

// Importando o serviço real com caminho corrigido
import { VehicleService } from "../../../core/services/vehicle.service";

// Placeholder for Vehicle type - replace with actual model
interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
  capacity: number;
  status: string;
  notes?: string;
  companyId?: string;
  createdAt?: Date;
  isActive?: boolean;
}

// TODO: Create a separate component for the vehicle form dialog (e.g., VehicleDialogComponent)
// TODO: Create a separate component for the confirmation dialog (e.g., ConfirmDialogComponent)

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.scss"],
})
export class VehicleListComponent implements OnInit, AfterViewInit {
  // Removed: vehicles: any[] = [];
  // Removed: displayVehicleDialog: boolean = false;
  vehicleForm!: FormGroup;
  vehicleDialogMode: "add" | "edit" = "add";
  selectedVehicleId: string | null = null;
  isLoading: boolean = false;
  currentYear: number = new Date().getFullYear();

  // Opções do dropdown (Keep for MatSelect)
  vehicleStatuses = [
    { label: "Disponível", value: "Disponível" },
    { label: "Em Manutenção", value: "Em Manutenção" },
    { label: "Em Uso", value: "Em Uso" },
    { label: "Indisponível", value: "Indisponível" },
  ];

  // Added for MatTable
  displayedColumns: string[] = [
    "plate",
    "brand",
    "model",
    "year",
    "capacity",
    "status",
    "actions",
  ];
  dataSource = new MatTableDataSource<Vehicle>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    // Removed: private messageService: MessageService,
    // Removed: private confirmationService: ConfirmationService,
    private snackBar: MatSnackBar, // Added
    private dialog: MatDialog, // Added
    private vehicleService: VehicleService // Injetando o serviço real
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm(): void {
    this.vehicleForm = this.fb.group({
      plate: ["", Validators.required],
      model: ["", Validators.required],
      brand: ["", Validators.required],
      year: [
        this.currentYear,
        [Validators.required, Validators.min(1990), Validators.max(this.currentYear)],
      ],
      capacity: [null, [Validators.required, Validators.min(1)]],
      status: ["Disponível", Validators.required],
      notes: [""],
    });
  }

  loadVehicles(): void {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        // Removed: this.vehicles = data;
        this.dataSource.data = data; // Assign data to MatTableDataSource
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar veículos:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao carregar veículos.", "Erro", {
          duration: 3000,
        });
        this.isLoading = false;
        // Fallback para dados de exemplo em caso de erro (apenas para desenvolvimento)
        this.loadFallbackVehicleData();
      },
    });
  }

  // Método de fallback para desenvolvimento
  private loadFallbackVehicleData(): void {
    const fallbackData = [
      {
        id: "vehicle1",
        companyId: "comp1",
        plate: "ABC-1234",
        model: "Sprinter",
        brand: "Mercedes-Benz",
        year: 2022,
        capacity: 15,
        status: "Disponível",
        notes: "Ar condicionado, Wi-Fi",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "vehicle2",
        companyId: "comp1",
        plate: "DEF-5678",
        model: "Corolla",
        brand: "Toyota",
        year: 2023,
        capacity: 4,
        status: "Em Uso",
        notes: "Carro executivo",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "vehicle3",
        companyId: "comp1",
        plate: "GHI-9012",
        model: "Paradiso G7",
        brand: "Marcopolo",
        year: 2020,
        capacity: 46,
        status: "Em Manutenção",
        notes: "Ônibus executivo, banheiro",
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

  openNewVehicleDialog(): void {
    this.vehicleDialogMode = "add";
    this.selectedVehicleId = null;
    this.vehicleForm.reset({
      year: this.currentYear,
      status: "Disponível",
    });
    // Removed: this.displayVehicleDialog = true;
    this.openVehicleFormDialog(); // Use MatDialog
  }

  editVehicle(vehicle: Vehicle): void {
    this.vehicleDialogMode = "edit";
    this.selectedVehicleId = vehicle.id;
    this.vehicleForm.patchValue(vehicle);
    // Removed: this.displayVehicleDialog = true;
    this.openVehicleFormDialog(); // Use MatDialog
  }

  openVehicleFormDialog(): void {
    // Placeholder: Open MatDialog with VehicleDialogComponent
    // const dialogRef = this.dialog.open(VehicleDialogComponent, {
    //   width: \"500px\",
    //   data: { form: this.vehicleForm, mode: this.vehicleDialogMode, statuses: this.vehicleStatuses }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === \"save\") {
    //     this.saveVehicle();
    //   }
    // });
    console.log("Placeholder: Open MatDialog for vehicle form.");
    this.snackBar.open(
      `Placeholder: Abrindo diálogo para ${this.vehicleDialogMode} veículo.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires VehicleDialogComponent
  }

  saveVehicle(): void {
    // This logic will likely move to the VehicleDialogComponent or be triggered by its closing event
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      // Replaced: this.messageService.add({...});
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Atenção", {
        duration: 3000,
      });
      return;
    }

    const vehicleData = this.vehicleForm.value;

    if (this.vehicleDialogMode === "add") {
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: (response) => {
          this.loadVehicles();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Veículo adicionado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayVehicleDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao adicionar veículo:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao adicionar veículo.", "Erro", {
            duration: 3000,
          });
        },
      });
    } else {
      this.vehicleService.updateVehicle(this.selectedVehicleId!, vehicleData).subscribe({
        next: (response) => {
          this.loadVehicles();
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Veículo atualizado com sucesso.", "Sucesso", {
            duration: 3000,
          });
          // Removed: this.displayVehicleDialog = false; // Dialog closes itself
        },
        error: (err) => {
          console.error("Erro ao atualizar veículo:", err);
          // Replaced: this.messageService.add({...});
          this.snackBar.open("Falha ao atualizar veículo.", "Erro", {
            duration: 3000,
          });
        },
      });
    }
  }

  deleteVehicle(vehicle: Vehicle): void {
    // Placeholder: Open MatDialog with ConfirmDialogComponent
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { 
    //     title: \"Confirmar Exclusão\",
    //     message: `Tem certeza que deseja excluir o veículo ${vehicle.plate} (${vehicle.model})?`
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { // If confirmed
    //     this.performDelete(vehicle.id);
    //   }
    // });
    console.log("Placeholder: Open MatDialog for confirmation.");
    this.snackBar.open(
      `Placeholder: Abrindo confirmação para excluir ${vehicle.plate}.`,
      "OK",
      { duration: 2000 }
    );
    // Actual implementation requires ConfirmDialogComponent
    // For now, call performDelete directly for testing (remove later)
    // this.performDelete(vehicle.id);
  }

  // Separated delete logic to be called after confirmation
  private performDelete(vehicleId: string): void {
    this.vehicleService.deleteVehicle(vehicleId).subscribe({
      next: (response) => {
        this.loadVehicles();
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Veículo excluído com sucesso.", "Sucesso", {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error("Erro ao excluir veículo:", err);
        // Replaced: this.messageService.add({...});
        this.snackBar.open("Falha ao excluir veículo.", "Erro", { duration: 3000 });
      },
    });
  }

  // Removed getStatusSeverity as it's specific to PrimeNG Tag component
  // Styling for status can be done with ngClass and Tailwind based on vehicle.status in the template
}

