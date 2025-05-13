import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { futureOrPresentDateValidator } from '../../Validators/custom-validators';
import { Frequencies, MeetingTypes } from '../../models/meeting';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss'] 
})
export class AddMeetingComponent implements OnInit {
  meeting: any = {
    title: '',
    date: null,
    endTime: null,
    duration: 0,
    location: '',
    description: '',
    type: '',
    frequency: '',
    address: {
      street : '',
      city : '',
      country: '',
      postalCode: ''
    }
  };

  meetingTypes = Object.entries(MeetingTypes).map(
    ([key, value]) => ({ key,value})
  );

  meetingFrequencies = Object.entries(Frequencies).map(
    ([key, value]) => ({ key,value})
  );

  meetings: any[] = []; // List of meetings

  futureOrPresentDateValidator = futureOrPresentDateValidator;
  constructor(private meetingService: MeetingService) { } // Inject the service

  ngOnInit(): void {
    this.loadMeetings(); // Load meetings on component initialization
  }

  // Load all meetings
  loadMeetings() {
    this.meetingService.getMeetings().subscribe(
      (data: any[]) => {
        this.meetings = data;
      },
      (error) => {
        console.error('Error loading meetings', error);
      }
    );
  }

  // Submit the form (create a meeting)
  onSubmit() {
    this.meeting.duration = new Date(this.meeting.endTime).getTime() - new Date(this.meeting.date).getTime();
    this.meetingService.createMeeting(this.meeting)
    .subscribe(response => {
      console.log('Meeting added successfully', response);
      alert('Meeting added successfully!');
          this.loadMeetings(); // Reload meetings after adding a new one
          this.resetForm(); // Reset the form
      }, error => {
        this.handleError(error);
      });
  }
  handleError(error: any) {
    if (error.error && error.error.errors) {
      const errors = error.error.errors;
      let errorMessage = 'Validation errors:\n';

      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          errorMessage += `${field}: ${errors[field].join(', ')}\n`;
        }
      }

      alert(errorMessage); // Display custom error messages
    } else {
      alert('An unexpected error occurred. Please try again.'); // Generic error message
    }
  }

  // Delete a meeting
  onDelete(meeting: any) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeetingById(meeting.id)
        .subscribe(response => {
          console.log('Meeting deleted successfully', response);
          alert('Meeting deleted successfully!');
          this.loadMeetings(); // Reload meetings after deletion
        }, error => {
          console.error('Error deleting meeting', error);
          alert('Error deleting meeting!');
        });
    }
  }

  // Reset the form
  resetForm() {
    this.meeting = {
      title: '',
      date: null,
      location: '',
      description: '',
      duration: 0,
      endTime: null,
    };
  }
  // Export meetings to PDF
  onExportPdf() {
    this.meetingService.exportMeetingsToPdf().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meetings.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting PDF', error);
        alert('Error exporting PDF!');
      }
    );
  }

  // Export meetings to Excel
  onExportExcel() {
    this.meetingService.exportMeetingsToExcel().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meetings.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting Excel', error);
        alert('Error exporting Excel!');
      }
    );
  }
}