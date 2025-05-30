import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PokemonSearchComponent } from './pokemon-search';
import { PokemonService } from '../../services/pokemon';
import { DomSanitizer } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StatusMessageComponent } from '../status-message/status-message';

describe('PokemonSearchComponent', () => {
  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;

  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'url' },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: { name: 'hp' } }]
  };

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['sanitize']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, StatusMessageComponent],
      declarations: [],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy }
      ]
    }).compileComponents();

    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    sanitizer = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recent searches from sessionStorage on init', () => {
    const mockSearches = ['pikachu', 'charizard'];
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockSearches));
    
    component.ngOnInit();
    
    expect(component.recentSearches).toEqual(mockSearches);
  });

  it('should search for pokemon and handle success', fakeAsync(() => {
    pokemonService.getPokemon.and.returnValue(of(mockPokemon));
    sanitizer.sanitize.and.returnValue('bulbasaur');
    spyOn(sessionStorage, 'setItem');

    component.pokemonName = 'bulbasaur';
    component.searchPokemon();
    tick();

    expect(component.pokemon).toEqual(mockPokemon);
    expect(component.error).toBe('');
    expect(component.loading).toBeFalse();
    expect(component.successMessage).toBe('¡Pokémon encontrado!');
  }));

  it('should debounce search input', fakeAsync(() => {
    pokemonService.getPokemon.and.returnValue(of(mockPokemon));
    sanitizer.sanitize.and.returnValue('bulbasaur');

    component.pokemonName = 'bul';
    component.onSearchInput();
    component.pokemonName = 'bulb';
    component.onSearchInput();
    component.pokemonName = 'bulba';
    component.onSearchInput();
    component.pokemonName = 'bulbasaur';
    component.onSearchInput();

    tick(200); // Before debounce time
    expect(pokemonService.getPokemon).not.toHaveBeenCalled();

    tick(100); // After debounce time
    expect(pokemonService.getPokemon).toHaveBeenCalledWith('bulbasaur');
    expect(pokemonService.getPokemon).toHaveBeenCalledTimes(1);
  }));

  it('should add to recent searches', fakeAsync(() => {
    pokemonService.getPokemon.and.returnValue(of(mockPokemon));
    sanitizer.sanitize.and.returnValue('bulbasaur');
    spyOn(sessionStorage, 'setItem');

    component.pokemonName = 'bulbasaur';
    component.searchPokemon();
    tick();

    expect(component.recentSearches[0]).toBe('bulbasaur');
    expect(sessionStorage.setItem).toHaveBeenCalled();
  }));

  it('should select from recent searches', fakeAsync(() => {
    pokemonService.getPokemon.and.returnValue(of(mockPokemon));
    sanitizer.sanitize.and.returnValue('pikachu');

    component.selectRecentSearch('pikachu');
    tick();

    expect(component.pokemonName).toBe('pikachu');
    expect(pokemonService.getPokemon).toHaveBeenCalledWith('pikachu');
  }));
});
