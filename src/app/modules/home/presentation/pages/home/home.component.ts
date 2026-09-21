import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly configService : ConfigService,
  ) {
    this.configService.config = {
      layout: { hidden: false },
    }
  }

  ngOnInit() {
    return;
  }

}
