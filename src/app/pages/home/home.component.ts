import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produto } from '../../core/type/types';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtosService.listar().subscribe(produtos => {
      this.produtos = produtos;
    });
  }
}
