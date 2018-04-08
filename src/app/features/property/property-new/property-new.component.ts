import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../common/services/user.service';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private http: HttpClient
  ) { }

  propertyTypeList = [];
  stateList;
  private cityList = [];
  FetchingCityList = false;

  getPropertyTypeList(){
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        // console.log(result);
        this.propertyTypeList = result;
      });
  }

  getCityList(stateId){
    this.cityList = [];
    this.FetchingCityList = true;

    if(stateId != 0){
      this.commonService.getCitylistByState(stateId)
      .subscribe(response => {
        if(response.length > 0){
          this.cityList = response;
          this.FetchingCityList = false;
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  // @Output('changeHeaderMessage') changeHeaderMessage = new EventEmitter();
  //  {
  //   type: '',
  //   message: ''
  // }

  submitForm(data){
    console.log(data);
    data.value.userId = this.userService.currentUser.user._id;
    console.log('userid: ', data.value.userId);
    
    this.http.post(this.commonService.base_url + '/property/new' , data.value)
    .subscribe(result => {
      console.log(result);
      if(result && result['id']){
        this.commonService.changeHeaderMessage({ type: 'success', message: 'You property has been listed successfully'  });
      }
    })

  }


  log(data) {
    console.log(data);

  }

  ngOnInit() {
    this.getPropertyTypeList();

    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
      });

  }

}
