import { Component } from '@angular/core';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonSearchComponent],
  template: `
    <main class="app-container">
      <app-pokemon-search></app-pokemon-search>
    </main>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #c62828;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'Buscador de Pokémon';
}
