import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  // Listar produtos (GET)
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Cadastrar produto (POST)
  cadastrar(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto);
  }

  // Atualizar produto (PUT)
  atualizar(produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${produto.id}`, produto);
  }

  // Deletar produto (DELETE)
  deletar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}