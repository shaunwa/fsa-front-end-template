import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortfolioData } from './types';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(
    private http: HttpClient,
  ) { }

  loadUserPortfolio(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('/api/user-info');
  }

  loadStockHistory(): Observable<object> {
    return this.http.get<object>('/api/stock-history')
      .pipe(map((data: any) => data['Time Series (30min)']));
  }
}
