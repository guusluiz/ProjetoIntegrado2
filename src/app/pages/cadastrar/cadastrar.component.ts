import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu.component';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produto } from '../../core/type/types';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [MenuComponent, FormsModule, RouterModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    
  produto: Produto = { nome: '', valor: 0, foto: '' };

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  fotoBase64: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.fotoBase64 = reader.result as string;
        console.log('Imagem Base64:', this.fotoBase64);
      };

      reader.readAsDataURL(file);
    }
  }
  cadastrar() {
    const produto = {
      ...this.produto,
      foto: this.fotoBase64
    };

    this.produtosService.cadastrarProduto(produto).subscribe(() => {
      console.log('Produto cadastrado com imagem em Base64');
      this.produto = { nome: '', valor: 0, foto: '' };
      this.fotoBase64 = '';
      this.fileInput.nativeElement.value = '';

    });
  }
}