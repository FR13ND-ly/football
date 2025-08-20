import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BufferService {
  private buffer: any[] = [];
  private bufferSubject = new BehaviorSubject<any[]>([]);
  private lastItemSubject = new BehaviorSubject<any | null>(null);

  buffer$ = this.bufferSubject.asObservable();
  lastItem$ = this.lastItemSubject.asObservable();

  add(item: any): void {
    this.buffer.push(item);
    this.bufferSubject.next([...this.buffer]);

    this.lastItemSubject.next(item);
    this.lastItemSubject.next(null);
  }

  take(): any {
    const item = this.buffer.shift();
    this.bufferSubject.next([...this.buffer]);
    return item;
  }

}
