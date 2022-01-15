import { Component, OnInit } from '@angular/core';
import { DatastreamService } from '../../service/datastream.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  private userdata: any;

  constructor(private datastreamservice: DatastreamService,private router:Router) {
    this.userdata = this.datastreamservice.getDataStream();
  }

  ngOnInit(): void {
    if(!this.userdata.isLogged){
      this.router.navigate(['/home']);
    }

  }

}
