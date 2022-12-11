import { Component, OnInit } from '@angular/core';
import { faHouse,faCalendarDays,faContactCard,faRoadBarrier,faBell,faBuildingFlag,faShop,faGears,faUsersViewfinder,
  faUnlockKeyhole,faHouseUser,faArrowRightArrowLeft,faMagnifyingGlassLocation,faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coworkform',
  templateUrl: './coworkform.component.html',
  styleUrls: ['./coworkform.component.scss']
})
export class CoworkformComponent implements OnInit {

  faHouse = faHouse;faHouseUser=faHouseUser;faBuildingFlag=faBuildingFlag;
  faCalendarDays=faCalendarDays;faArrowRightArrowLeft=faArrowRightArrowLeft;faMagnifyingGlassLocation=faMagnifyingGlassLocation;
  faContactCard=faContactCard;faBell=faBell;faShop=faShop;faGears=faGears;faHeadset=faHeadset;
  faRoadBarrier=faRoadBarrier;faUnlockKeyhole=faUnlockKeyhole;faUsersViewfinder=faUsersViewfinder;

  constructor() { }

  ngOnInit(): void {
  }

}
