import { Component, OnInit, Input } from '@angular/core';
// , ViewChild
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private commonService: CommonService
   ) {}

  openloginModal(){    
    const modalRef = this.modalService.open(LoginModalComponent);
  }

  // ----- FORM

  headerDropdown: false;
  toggleMenuItems = false;

  // ------------- LOGIN

  // Main header alert message
  HeaderMessage = {
    type: '',
    message: ''
  }

  closeHeaderMessage(){
    this.HeaderMessage.message = '';    
  }

  changeHeaderMessage(type, message){
    console.log('changeHeaderMessage');
    
    this.HeaderMessage = { type: type, message: message }
    var self = this;
    setTimeout(function(){
      self.closeHeaderMessage();
    }, 5000);
  }

  pageloaderStatus: boolean = true;

  ngOnInit() {

    this.route.queryParamMap.subscribe((data) => {
      if (data.get('action') === 'signUpsuccess') {
        this.changeHeaderMessage('success', 'Congratulations, you have been successfully registered, login to continue');       
        this.openloginModal(); 
      }
      else if (data.get('action') === 'logOut') {
        this.changeHeaderMessage('success', 'You have logged out successfully');     
        this.openloginModal();
      }
      else if (data.get('action') === 'login') {
        this.changeHeaderMessage('success', 'Please login to continue');     
        this.openloginModal();
      }
    });  

    // HEADER MESSAGE
    this.commonService.HeaderMessage$.subscribe( (data: any) => {
      console.log('header ', data);  
      if(data)
        this.changeHeaderMessage(data.type, data.message);
    });

    // Toggling Page Loader status
    this.commonService.togglePageLoader$.subscribe(data => this.pageloaderStatus = data);
  }



}
