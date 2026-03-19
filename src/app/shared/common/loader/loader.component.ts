import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../data/loader.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit {
  show = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderState.subscribe({
      next: (value) => {
        this.show = value.show;
      },
      error: (err) => {
        console.log(err);
        this.show = false;
      },
      complete: () => {
        this.show = true;
      },
    });
  }
}
