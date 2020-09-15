import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  API_URL = ApiService.API_URL;

  messageSent: boolean = false;
  messageError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  send(form) {
    let data = form.value;
    fetch(this.API_URL + 'contact-us', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        senderName: data.name,
        senderEmail: data.email,
        messageSubject: data.subject,
        messageContent: data.message
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.messageSent) {
        this.messageSent = true;
      }
      else {
        this.messageError = true;
      }
    })
  }

}
