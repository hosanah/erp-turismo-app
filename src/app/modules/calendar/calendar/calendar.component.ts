// calendar.component.ts
import { Component, OnInit, inject } from '@angular/core'; // Added inject
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// Removed: import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar'; // Added
import { MatDialog } from '@angular/material/dialog'; // Added for dialog later

// Placeholder service - replace with actual EventService
import { EventService } from '../../../core/services/event.service'; 

// TODO: Create a separate component for the event dialog content (e.g., EventDialogComponent)

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: any[] = []; // Events for FullCalendar
  calendarOptions!: CalendarOptions;
  // Removed: displayEventDialog: boolean = false;
  eventForm!: FormGroup;
  eventDialogMode: 'add' | 'edit' = 'add';
  selectedEventId: string | null = null;

  // Example dropdown options
  eventTypes = [
    { label: 'Particular', value: 'Particular' },
    { label: 'Coletivo', value: 'Coletivo' }
  ];

  constructor(
    private fb: FormBuilder,
    // Removed: private messageService: MessageService,
    private snackBar: MatSnackBar, // Added
    private dialog: MatDialog, // Added
    // private eventService: EventService // Inject actual service later
  ) { }

  ngOnInit(): void {
    this.initializeCalendarOptions();
    this.loadEvents();
    this.initializeForm();
  }

  initializeCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locale: 'pt-br', // Set locale for Portuguese
      buttonText: { // Translate buttons
        today:    'Hoje',
        month:    'Mês',
        week:     'Semana',
        day:      'Dia',
        list:     'Lista'
      },
      selectable: true,
      selectMirror: true,
      editable: true, // Allows dragging and resizing
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: this.events
      // TODO: Add eventDrop and eventResize handlers if needed
    };
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: [null, Validators.required],
      end: [null],
      description: [''],
      type: ['Particular', Validators.required] // Default type
      // Add other fields: driverId, vehicleId, partnerId, clients, etc.
    });
  }

  loadEvents(): void {
    // Placeholder - Fetch events from EventService
    // this.eventService.getEvents().subscribe(data => {
    //   this.events = data.map(event => ({ // Map backend data to FullCalendar format
    //     id: event.id,
    //     title: event.title,
    //     start: event.startDate,
    //     end: event.endDate,
    //     // Add other properties like color based on type, etc.
    //   }));
    //   this.calendarOptions = { ...this.calendarOptions, events: this.events }; // Update calendar events
    // });

    // Example data:
    const now = new Date();
    this.events = [
      {
        id: '1',
        title: 'Evento Exemplo 1 (Coletivo)',
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
        color: '#FF9800', // Example color for Coletivo
        extendedProps: { type: 'Coletivo', description: 'Descrição do evento coletivo' }
      },
      {
        id: '2',
        title: 'Evento Exemplo 2 (Particular)',
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 16, 30),
        color: '#2196F3', // Example color for Particular
        extendedProps: { type: 'Particular', description: 'Descrição do evento particular' }
      }
    ];
    // Update calendar events after loading
    this.calendarOptions = { ...this.calendarOptions, events: this.events };
  }

  handleDateSelect(selectInfo: any): void {
    this.eventDialogMode = 'add';
    this.selectedEventId = null;
    this.eventForm.reset({
      start: selectInfo.start,
      end: selectInfo.end,
      type: 'Particular' // Reset to default
    });
    // Removed: this.displayEventDialog = true;
    this.openEventDialog(); // Added
  }

  handleEventClick(clickInfo: any): void {
    this.eventDialogMode = 'edit';
    this.selectedEventId = clickInfo.event.id;
    
    // Find the event data (replace with fetching from service if needed)
    const clickedEvent = this.events.find(e => e.id === this.selectedEventId);
    
    if (clickedEvent) {
      this.eventForm.patchValue({
        title: clickedEvent.title,
        start: clickedEvent.start, // Ensure these are Date objects
        end: clickedEvent.end,     // Ensure these are Date objects
        description: clickedEvent.extendedProps?.description || '',
        type: clickedEvent.extendedProps?.type || 'Particular'
        // Patch other fields
      });
      // Removed: this.displayEventDialog = true;
      this.openEventDialog(); // Added
    } else {
      // Replaced: this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Evento não encontrado' });
      this.snackBar.open('Evento não encontrado', 'Erro', { duration: 3000 });
    }
  }

  openEventDialog(): void {
    // Placeholder: This will open the MatDialog with the form
    // const dialogRef = this.dialog.open(EventDialogComponent, {
    //   width: '500px',
    //   data: { 
    //     form: this.eventForm, 
    //     mode: this.eventDialogMode, 
    //     eventTypes: this.eventTypes 
    //     // Pass other needed data like available drivers/vehicles
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'save') {
    //     this.saveEvent();
    //   }
    // });
    console.log('Placeholder: Open MatDialog here with eventForm data.');
    // For now, just log and show a snackbar to indicate action
    this.snackBar.open(`Placeholder: Abrindo diálogo para ${this.eventDialogMode === 'add' ? 'adicionar' : 'editar'} evento.`, 'OK', { duration: 2000 });
    // We will implement the actual dialog component and logic later.
  }

  saveEvent(): void {
    // This method will likely be called from the dialog component after it closes
    if (this.eventForm.invalid) {
      // Replaced: this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios' });
      this.snackBar.open('Preencha todos os campos obrigatórios', 'Atenção', { duration: 3000 });
      return;
    }

    const eventData = this.eventForm.value;
    const calendarEvent = {
      id: this.selectedEventId || Date.now().toString(), // Generate temporary ID if new
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
      extendedProps: {
        description: eventData.description,
        type: eventData.type
        // Add other properties
      },
      color: eventData.type === 'Coletivo' ? '#FF9800' : '#2196F3' // Example color logic
    };

    if (this.eventDialogMode === 'add') {
      // Placeholder: Call eventService.addEvent(eventData)
      // On success:
      this.events = [...this.events, calendarEvent];
      // Replaced: this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento adicionado' });
      this.snackBar.open('Evento adicionado com sucesso', 'Sucesso', { duration: 3000 });
    } else {
      // Placeholder: Call eventService.updateEvent(this.selectedEventId, eventData)
      // On success:
      this.events = this.events.map(e => e.id === this.selectedEventId ? calendarEvent : e);
      // Replaced: this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento atualizado' });
      this.snackBar.open('Evento atualizado com sucesso', 'Sucesso', { duration: 3000 });
    }
    
    // Update calendar events after saving
    this.calendarOptions = { ...this.calendarOptions, events: this.events };

    // Removed: this.displayEventDialog = false; // Dialog closing is handled by MatDialog
  }
}

