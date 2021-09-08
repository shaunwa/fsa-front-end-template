import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
