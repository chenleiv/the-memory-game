import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, Images, Post } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cards: object;

  constructor(private http: HttpClient) {}

  public getData(): Observable<Card[]> {
    return this.http.get<Card[]>('https://dev-bot.pico.buzz/memory');
  }

  public postData(id: number, time: number, matches: number): Observable<Post> {
    const body = {
      id,
      time,
      matches,
    };

    let data = this.http.post<any>('https://dev-bot.pico.buzz/memory', body);
    return data;
  }

  public getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  public shuffleArray(items: Images[]) {
    let randIdx: number, keep: Images, i: number;
    for (i = items.length - 1; i > 0; i--) {
      randIdx = this.getRandomInt(0, items.length - 1);
      keep = items[i];
      items[i] = items[randIdx];
      items[randIdx] = keep;
    }
    return items;
  }
}
