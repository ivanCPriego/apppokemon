import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map, of } from 'rxjs';
import { Pokemon, CachedPokemonSearch } from '../models/pokemon.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private cacheKey = 'pokemon_searches';
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutos en milisegundos
  private readonly MAX_CACHE_ITEMS = 10;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  getPokemon(name: string): Observable<Pokemon> {
    // Buscar en caché primero
    const cachedResult = this.getFromCache(name);
    if (cachedResult) {
      return of(cachedResult);
    }

    // Si no está en caché, hacer la petición
    return this.http.get<Pokemon>(`${this.apiUrl}/${name.toLowerCase().trim()}`)
      .pipe(
        map(pokemon => this.sanitizePokemonData(pokemon)),
        map(pokemon => {
          this.addToCache(name, pokemon);
          return pokemon;
        }),
        catchError(this.handleError)
      );
  }

  private sanitizePokemonData(pokemon: Pokemon): Pokemon {
    return {
      ...pokemon,
      name: this.sanitizer.sanitize(1, pokemon.name) || '',
      sprites: {
        front_default: this.sanitizer.sanitize(2, pokemon.sprites.front_default) || ''
      },
      types: pokemon.types.map(type => ({
        type: {
          name: this.sanitizer.sanitize(1, type.type.name) || ''
        }
      })),
      stats: pokemon.stats.map(stat => ({
        base_stat: Number(stat.base_stat),
        stat: {
          name: this.sanitizer.sanitize(1, stat.stat.name) || ''
        }
      }))
    };
  }

  private getFromCache(name: string): Pokemon | null {
    const cache = this.getCache();
    const cachedItem = cache[name.toLowerCase()];
    
    if (cachedItem && (Date.now() - cachedItem.timestamp) < this.CACHE_DURATION) {
      return cachedItem.pokemon;
    }
    
    // Si el item está expirado, eliminarlo
    if (cachedItem) {
      delete cache[name.toLowerCase()];
      this.saveCache(cache);
    }
    
    return null;
  }

  private addToCache(name: string, pokemon: Pokemon): void {
    const cache = this.getCache();
    const cacheKeys = Object.keys(cache);
    
    // Si el caché está lleno, eliminar el item más antiguo
    if (cacheKeys.length >= this.MAX_CACHE_ITEMS) {
      const oldestKey = cacheKeys.reduce((oldest, key) => 
        cache[key].timestamp < cache[oldest].timestamp ? key : oldest
      , cacheKeys[0]);
      delete cache[oldestKey];
    }
    
    cache[name.toLowerCase()] = {
      timestamp: Date.now(),
      pokemon
    };
    
    this.saveCache(cache);
  }

  private getCache(): Record<string, CachedPokemonSearch> {
    const cache = sessionStorage.getItem(this.cacheKey);
    return cache ? JSON.parse(cache) : {};
  }

  private saveCache(cache: Record<string, CachedPokemonSearch>): void {
    sessionStorage.setItem(this.cacheKey, JSON.stringify(cache));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error de conexión. Por favor, intenta más tarde.';
    
    if (error.status === 404) {
      errorMessage = 'Pokémon no encontrado';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
