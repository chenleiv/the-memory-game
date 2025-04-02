import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Images } from 'src/app/models/card.model';
import { CardService } from 'src/app/service/card.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'card-data',
  templateUrl: './card.data.component.html',
  styleUrls: ['./card.data.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CardDataComponent {
  Math = Math;
  @Input() changing: Subject<boolean>;
  @Input() user_id: number;
  @Input() images: Images[];
  @Input() numOfCards: number;
  @Input() isUserWin: boolean;
  @Input() isNewGame: boolean = true;

  @Output() startOver = new EventEmitter<number>();

  firstCard: Images;
  cardSelected: Images[] = [];
  matchImages: string[] = [];
  timeoutId: number;
  targetTime: number = Date.now() + 1800 * 50;
  timeDiff: number = 0;

  constructor(public cardService: CardService) {}

  public updateData(): void {
    this.targetTime = Date.now() + 1800 * 50;
    this.setTime();
    this.isUserWin = false;
    this.isNewGame = false;
  }

  public selectedCard(img: Images) {
    this.toggleSelection(img);

    if (img.isSelected) {
      setTimeout(() => {
        if (!this.firstCard) {
          this.firstCard = img;
          this.cardSelected.push(this.firstCard);
        } else {
          const matchCard = this.cardSelected.find(
            (card) => card.pair_id === img.id
          );

          if (matchCard) {
            this.matchImages.push(this.firstCard.id, img.id);
            this.firstCard = null;
          } else {
            img.isSelected = false;
            this.firstCard.isSelected = false;
            this.cardSelected = [];
            this.firstCard = null;
          }
          this.isWin();
        }
      }, 500);
    }
  }

  public isWin() {
    if (this.matchImages.length === this.numOfCards) {
      clearInterval(this.timeoutId);
      this.isUserWin = true;
      this.timeDiff = 0;
      this.matchImages.length = 0;

      this.cardService.postData(
        this.user_id,
        this.timeDiff,
        this.cardSelected.length
      );
    }
  }

  public toggleSelection(image: Images) {
    image.isSelected = !image.isSelected;
  }

  public setTime(): void {
    this.timeDiff = this.targetTime - Date.now();
    this.timeoutId = window.setInterval(() => {
      this.timeDiff = this.targetTime - Date.now();
      if (this.timeDiff <= 1000) {
        clearInterval(this.timeoutId);
        this.timeDiff = 0;

        this.cardService.postData(
          this.user_id,
          this.timeDiff,
          this.cardSelected.length / 2
        );
      }
    }, 1000);
  }

  get isRed() {
    return Math.floor(this.timeDiff / 1000) <= 5;
  }
}
