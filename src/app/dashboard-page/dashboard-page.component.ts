import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { PortfolioData, StockHistory } from '../types';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  isLoading = true;
  portfolioData: PortfolioData | null = null;
  times: string[] = [];
  prices: string[] = [];
  currentPrice: string = '';

  numberOfSharesValue: string = '';

  constructor(
    private stocksService: StocksService,
  ) { }

  ngOnInit(): void {
    this.stocksService.loadUserPortfolio()
      .subscribe(data => {
        this.portfolioData = data;
        this.isLoading = false;
      })
    
    this.stocksService.loadStockHistory()
      .subscribe(data => {
        console.log(data);
        this.times = Object.keys(data);
        this.prices = Object.values(data).map(obj => obj['4. close']);
        this.currentPrice = this.prices[this.prices.length - 1];
      });
  }

  buyShares(): void {

  }

  sellShares(): void {

  }

}
