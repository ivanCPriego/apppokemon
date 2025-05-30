import {
  FormsModule,
  PokemonSearchComponent,
  init_forms,
  init_pokemon_search
} from "./chunk-5KQVH2AD.js";
import {
  DomSanitizer,
  PokemonService,
  init_platform_browser,
  init_pokemon
} from "./chunk-XFI7IOCJ.js";
import {
  StatusMessageComponent,
  init_status_message
} from "./chunk-N6PZT6B4.js";
import "./chunk-FMKAC3PH.js";
import {
  TestBed,
  fakeAsync,
  init_esm,
  init_testing,
  of,
  throwError,
  tick
} from "./chunk-ABMDFCXQ.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/components/pokemon-search/pokemon-search.spec.ts
var require_pokemon_search_spec = __commonJS({
  "src/app/components/pokemon-search/pokemon-search.spec.ts"(exports) {
    init_testing();
    init_pokemon_search();
    init_pokemon();
    init_platform_browser();
    init_esm();
    init_forms();
    init_status_message();
    describe("PokemonSearchComponent", () => {
      let component;
      let fixture;
      let pokemonService;
      let sanitizer;
      const mockPokemon = {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "url" },
        types: [{ type: { name: "grass" } }],
        stats: [{ base_stat: 45, stat: { name: "hp" } }]
      };
      beforeEach(() => __async(null, null, function* () {
        const pokemonServiceSpy = jasmine.createSpyObj("PokemonService", ["getPokemon"]);
        const sanitizerSpy = jasmine.createSpyObj("DomSanitizer", ["sanitize"]);
        yield TestBed.configureTestingModule({
          imports: [FormsModule, StatusMessageComponent],
          declarations: [],
          providers: [
            { provide: PokemonService, useValue: pokemonServiceSpy },
            { provide: DomSanitizer, useValue: sanitizerSpy }
          ]
        }).compileComponents();
        pokemonService = TestBed.inject(PokemonService);
        sanitizer = TestBed.inject(DomSanitizer);
      }));
      beforeEach(() => {
        fixture = TestBed.createComponent(PokemonSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("should load recent searches from sessionStorage on init", () => {
        const mockSearches = ["pikachu", "charizard"];
        spyOn(sessionStorage, "getItem").and.returnValue(JSON.stringify(mockSearches));
        component.ngOnInit();
        expect(component.recentSearches).toEqual(mockSearches);
      });
      it("should handle invalid input", () => {
        component.pokemonName = '<script>alert("xss")<\/script>';
        sanitizer.sanitize.and.returnValue("");
        component.searchPokemon();
        expect(component.error).toBe("Por favor, ingresa un nombre v\xE1lido (solo letras y n\xFAmeros)");
        expect(pokemonService.getPokemon).not.toHaveBeenCalled();
      });
      it("should search for pokemon and handle success", fakeAsync(() => {
        pokemonService.getPokemon.and.returnValue(of(mockPokemon));
        sanitizer.sanitize.and.returnValue("bulbasaur");
        spyOn(sessionStorage, "setItem");
        component.pokemonName = "bulbasaur";
        component.searchPokemon();
        tick();
        expect(component.pokemon).toEqual(mockPokemon);
        expect(component.error).toBe("");
        expect(component.loading).toBeFalse();
        expect(component.successMessage).toBe("\xA1Pok\xE9mon encontrado!");
      }));
      it("should handle search error", fakeAsync(() => {
        const errorMessage = "Pok\xE9mon no encontrado";
        pokemonService.getPokemon.and.returnValue(throwError(() => new Error(errorMessage)));
        sanitizer.sanitize.and.returnValue("nonexistent");
        component.pokemonName = "nonexistent";
        component.searchPokemon();
        tick();
        expect(component.error).toBe(errorMessage);
        expect(component.loading).toBeFalse();
        expect(component.pokemon).toBeNull();
      }));
      it("should debounce search input", fakeAsync(() => {
        pokemonService.getPokemon.and.returnValue(of(mockPokemon));
        sanitizer.sanitize.and.returnValue("bulbasaur");
        component.pokemonName = "bul";
        component.onSearchInput();
        component.pokemonName = "bulb";
        component.onSearchInput();
        component.pokemonName = "bulba";
        component.onSearchInput();
        component.pokemonName = "bulbasaur";
        component.onSearchInput();
        tick(200);
        expect(pokemonService.getPokemon).not.toHaveBeenCalled();
        tick(100);
        expect(pokemonService.getPokemon).toHaveBeenCalledWith("bulbasaur");
        expect(pokemonService.getPokemon).toHaveBeenCalledTimes(1);
      }));
      it("should add to recent searches", fakeAsync(() => {
        pokemonService.getPokemon.and.returnValue(of(mockPokemon));
        sanitizer.sanitize.and.returnValue("bulbasaur");
        spyOn(sessionStorage, "setItem");
        component.pokemonName = "bulbasaur";
        component.searchPokemon();
        tick();
        expect(component.recentSearches[0]).toBe("bulbasaur");
        expect(sessionStorage.setItem).toHaveBeenCalled();
      }));
      it("should select from recent searches", fakeAsync(() => {
        pokemonService.getPokemon.and.returnValue(of(mockPokemon));
        sanitizer.sanitize.and.returnValue("pikachu");
        component.selectRecentSearch("pikachu");
        tick();
        expect(component.pokemonName).toBe("pikachu");
        expect(pokemonService.getPokemon).toHaveBeenCalledWith("pikachu");
      }));
    });
  }
});
export default require_pokemon_search_spec();
//# sourceMappingURL=spec-app-components-pokemon-search-pokemon-search.spec.js.map
