// event-list.component.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Importando os serviços reais com caminhos corrigidos
import { EventService } from "../../../core/services/event.service";
import { DriverService } from "../../../core/services/driver.service";
import { VehicleService } from "../../../core/services/vehicle.service";
import { PartnerService } from "../../../core/services/partner.service";
import { ClientService } from "../../../core/services/client.service";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  displayEventDialog: boolean = false;
  eventForm!: FormGroup;
  eventDialogMode: "add" | "edit" = "add";
  selectedEventId: string | null = null;
  isLoading: boolean = false;

  // Dropdown options
  eventTypes = [
    { label: "Particular", value: "Particular" },
    { label: "Coletivo", value: "Coletivo" },
  ];

  // Dados para dropdowns
  availableDrivers: any[] = [];
  availableVehicles: any[] = [];
  availablePartners: any[] = [];
  availableClients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private partnerService: PartnerService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      title: ["", Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      description: [""],
      type: ["Particular", Validators.required],
      driverId: [null],
      vehicleId: [null],
      partnerId: [null],
      clientIds: [[]], // Para multiselect
    });
  }

}

