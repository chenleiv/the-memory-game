import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.component.html',
  styleUrls: ['./app.header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
