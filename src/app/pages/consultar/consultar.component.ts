import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produto } from '../../core/type/types';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../component/menu/menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar',
  imports: [MenuComponent, CommonModule, RouterLink],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit {
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

  excluir(id?: string) {
    if (!id) return;

    this.produtosService.excluirProduto(id).subscribe(() => {
      console.log(`Produto ${id} excluído`);
      this.carregarProdutos();  
    });
  }
}
