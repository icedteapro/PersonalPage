import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $ :any;
@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  @ViewChild('customModal') customModal:ElementRef; 
  constructor() { }

  ngOnInit() { 
    $('#custom-modal')[0].hidden = false;
      }

}
