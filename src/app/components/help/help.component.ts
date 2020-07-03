import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  public isTeacherCollapsed = true;
  public isStudentCollapsed = true;

  show = false;
  autohide = true;

  constructor() { }

  ngOnInit(): void {
  }

}
