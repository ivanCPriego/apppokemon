import {
  HttpClientTestingModule,
  HttpTestingController,
  init_testing as init_testing2
} from "./chunk-EWFZY7GX.js";
import {
  DomSanitizer,
  PokemonService,
  init_platform_browser,
  init_pokemon
} from "./chunk-XFI7IOCJ.js";
import "./chunk-FMKAC3PH.js";
import {
  TestBed,
  init_testing
} from "./chunk-ABMDFCXQ.js";
import "./chunk-TTULUY32.js";

// src/app/services/pokemon.spec.ts
init_testing();
init_pokemon();
init_testing2();
init_platform_browser();
describe("PokemonService", () => {
  let service;
  let httpMock;
  let sanitizer;
  beforeEach(() => {
    const spy = jasmine.createSpyObj("DomSanitizer", ["sanitize"]);
    spy.sanitize.and.returnValue("sanitized");
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService,
        { provide: DomSanitizer, useValue: spy }
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
    sanitizer = TestBed.inject(DomSanitizer);
  });
  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should fetch pokemon data from API", () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      sprites: { front_default: "url" },
      types: [{ type: { name: "grass" } }],
      stats: [{ base_stat: 45, stat: { name: "hp" } }]
    };
    service.getPokemon("bulbasaur").subscribe((pokemon) => {
      expect(pokemon.name).toBe("sanitized");
      expect(pokemon.sprites.front_default).toBe("sanitized");
    });
    const req = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    expect(req.request.method).toBe("GET");
    req.flush(mockPokemon);
  });
  it("should handle 404 error", () => {
    service.getPokemon("nonexistent").subscribe({
      error: (error) => {
        expect(error.message).toBe("Pok\xE9mon no encontrado");
      }
    });
    const req = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon/nonexistent");
    req.flush("Not found", { status: 404, statusText: "Not Found" });
  });
  it("should use cached data if available", () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      sprites: { front_default: "url" },
      types: [{ type: { name: "grass" } }],
      stats: [{ base_stat: 45, stat: { name: "hp" } }]
    };
    service.getPokemon("bulbasaur").subscribe();
    const req = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    req.flush(mockPokemon);
    service.getPokemon("bulbasaur").subscribe((pokemon) => {
      expect(pokemon).toBeTruthy();
    });
    httpMock.expectNone("https://pokeapi.co/api/v2/pokemon/bulbasaur");
  });
  it("should sanitize pokemon data", () => {
    const mockPokemon = {
      id: 1,
      name: '<script>alert("xss")<\/script>bulbasaur',
      sprites: { front_default: 'javascript:alert("xss")' },
      types: [{ type: { name: '<img src=x onerror=alert("xss")>' } }],
      stats: [{ base_stat: 45, stat: { name: '<script>alert("xss")<\/script>' } }]
    };
    service.getPokemon("bulbasaur").subscribe((pokemon) => {
      expect(pokemon.name).toBe("sanitized");
      expect(pokemon.sprites.front_default).toBe("sanitized");
      expect(pokemon.types[0].type.name).toBe("sanitized");
      expect(pokemon.stats[0].stat.name).toBe("sanitized");
    });
    const req = httpMock.expectOne("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    req.flush(mockPokemon);
  });
});
//# sourceMappingURL=spec-app-services-pokemon.spec.js.map
