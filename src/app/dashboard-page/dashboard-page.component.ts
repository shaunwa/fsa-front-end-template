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
  }

  buyShares(): void {

  }

  sellShares(): void {

  }

}
