import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { PortfolioData } from '../types';

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

  numberOfSharesValue: number = 0;

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
    this.stocksService.buyStock(this.numberOfSharesValue)
      .subscribe(updatedData => {
        this.portfolioData = updatedData;
        this.numberOfSharesValue = 0;
      });
  }

  sellShares(): void {
    this.stocksService.sellStock(this.numberOfSharesValue)
      .subscribe(updatedData => {
        this.portfolioData = updatedData;
        this.numberOfSharesValue = 0;
      });
  }

}
