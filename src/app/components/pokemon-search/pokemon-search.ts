import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { Pokemon } from '../../models/pokemon.interface';
import { StatusMessageComponent } from '../status-message/status-message';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule, CommonModule, StatusMessageComponent],
  templateUrl: './pokemon-search.html',
  styleUrls: ['./pokemon-search.scss']
})
export class PokemonSearchComponent implements OnInit, OnDestroy {
  pokemonName: string = '';
  pokemon: Pokemon | null = null;
  error: string = '';
  loading: boolean = false;
  recentSearches: string[] = [];
  successMessage: string = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private pokemonService: PokemonService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.setupSearchDebounce();
    this.loadRecentSearches();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput() {
    const sanitizedInput = this.sanitizer.sanitize(1, this.pokemonName) || '';
    if (this.isValidInput(sanitizedInput)) {
      this.searchSubject.next(sanitizedInput);
    }
  }

  searchPokemon() {
    const sanitizedInput = this.sanitizer.sanitize(1, this.pokemonName) || '';
    if (!this.isValidInput(sanitizedInput)) {
      this.error = 'Por favor, ingresa un nombre válido (solo letras y números)';
      return;
    }
    this.performSearch(sanitizedInput);
  }

  selectRecentSearch(name: string) {
    const sanitizedName = this.sanitizer.sanitize(1, name) || '';
    if (this.isValidInput(sanitizedName)) {
      this.pokemonName = sanitizedName;
      this.performSearch(sanitizedName);
    }
  }

  private setupSearchDebounce() {
    this.searchSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.trim().length > 0 && this.isValidInput(term))
    ).subscribe(term => {
      this.performSearch(term);
    });
  }

  private loadRecentSearches() {
    const savedSearches = sessionStorage.getItem('recent_searches');
    if (savedSearches) {
      try {
        this.recentSearches = JSON.parse(savedSearches);
      } catch (e) {
        console.error('Error loading recent searches:', e);
        sessionStorage.removeItem('recent_searches');
      }
    }
  }

  private performSearch(name: string) {
    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.pokemon = null;

    this.pokemonService.getPokemon(name)
      .subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
          this.successMessage = '¡Pokémon encontrado!';
          this.addToRecentSearches(name);
          
          // Limpiar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
          this.pokemon = null;
        }
      });
  }

  private addToRecentSearches(name: string) {
    const normalizedName = name.toLowerCase().trim();
    this.recentSearches = [
      normalizedName,
      ...this.recentSearches.filter(search => search !== normalizedName)
    ].slice(0, 5);

    try {
      sessionStorage.setItem('recent_searches', JSON.stringify(this.recentSearches));
    } catch (e) {
      console.error('Error saving recent searches:', e);
    }
  }

  private isValidInput(input: string): boolean {
    return /^[a-zA-Z0-9-]+$/.test(input.trim()) && input.trim().length > 0;
  }
}

