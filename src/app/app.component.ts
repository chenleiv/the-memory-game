import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CardDataComponent } from './cmps/card.data/card.data.component';
import { Images } from './models/card.model';
import { CardService } from './service/card.service';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './cmps/app.header/app.header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CardDataComponent, AppHeaderComponent]
})
export class AppComponent implements OnInit {
  changingValue: Subject<boolean> = new Subject();
  @ViewChild('childComponent', { static: false })
  childComponent: CardDataComponent;

  public cardsArray: object;
  public user_id: number;
  public images: Images[];
  public numOfCards: number = 4;
  public isUserWin: boolean = false;
  public isNewGame: boolean;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.isNewGame = true;
    this.showData();
  }

  tellChild() {
    this.changingValue.next(true);
  }

  public showData() {
    this.cardService.getData().subscribe((res) => {
      this.cardsArray = res;
      const elementArray: Images[] = [];

      for (let card in this.cardsArray) {
        for (let index = 0; index < this.numOfCards; index++) {
          this.images = this.cardsArray[card].images;
          const element = this.images[index];
          elementArray.push(element);
        }
        this.images = elementArray;
        this.cardService.shuffleArray(this.images);
        this.user_id = this.cardsArray[card].user_id;
      }
    });
  }

  public startOver(numOfCards: number) {
    this.numOfCards = numOfCards;
    this.ngOnInit();
    this.childComponent.updateData();
  }
}
