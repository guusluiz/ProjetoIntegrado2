import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produto } from '../../core/type/types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../component/menu/menu.component';


@Component({
  standalone: true,
  selector: 'app-editar',
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  produto!: Produto;
  fotoBase64: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID não encontrado');
      return;
    }

    this.produtosService.buscarProduto(id).subscribe(prod => {
      this.produto = prod;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.fotoBase64 = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  atualizar() {
    if (this.fotoBase64) {
      this.produto.foto = this.fotoBase64;
    }

    this.produtosService.atualizarProduto(this.produto).subscribe(() => {
      window.alert('Produto atualizado com sucesso!');
      this.router.navigate(['/consultar']);
    });
  }
}
