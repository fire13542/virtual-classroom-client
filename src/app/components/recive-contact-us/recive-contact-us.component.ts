import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recive-contact-us',
  templateUrl: './recive-contact-us.component.html',
  styleUrls: ['./recive-contact-us.component.css']
})
export class ReciveContactUsComponent implements OnInit {

  API_URL ='http://localhost:3000/';

  allContacts = [];

  subject = '';
  contactsArray = [];

  constructor() {
   }

  ngOnInit(): void {
    this.init();
  }

  async init(){
    await this.getAllContacts();
  }

  getAllContacts(){
    fetch(this.API_URL+'contacts/get', {
      method: 'get',
      headers: {token: localStorage.getItem('token')}
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.messages){
        this.allContacts = response.messages;
        this.filterContacts('');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  setSubject(s){
    this.subject = s;
    this.filterContacts(this.subject);
  }

  filterContacts(subject){
    if(subject === ''){
      this.contactsArray = this.allContacts;
    }
    else if(subject === 'read'){
      this.contactsArray = this.allContacts.filter(c => c.read);
    }
    else {
      this.contactsArray = this.allContacts.filter(c => c.messageSubject === subject);
    }
  }

  read(event, contact){
    fetch(this.API_URL+'contact/read', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        contact
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.read){
        this.allContacts = this.allContacts.map(c => {
          if(c._id === contact._id){
            c.read = true;
            return c;
          }
          else {
            return c;
          }
        })
        event.traget.innerHTML = '<img src="../../../assets/images/select-file.jpg">';
      }
    })
  }

}
