import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, interval, merge, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BufferService {
  private input$ = new Subject<any>();
  private output$ = new BehaviorSubject<any>(null);

  public readonly processed$ = this.output$.asObservable();

  constructor() {
    this.startProcessing();
  }

  addItem(item: any) {
    this.input$.next(item);
  }

  private startProcessing() {
    this.input$
      .pipe(
        concatMap((item) =>
          new Promise<void>((resolve) => {
            this.output$.next(item); 
            setTimeout(() => {
              this.output$.next(null);
              resolve();
            }, 10000);
          })
        )
      )
      .subscribe();
  }

}
