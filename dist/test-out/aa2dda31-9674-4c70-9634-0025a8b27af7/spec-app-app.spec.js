import {
  HttpClientTestingModule,
  init_testing as init_testing2
} from "./chunk-EWFZY7GX.js";
import {
  PokemonSearchComponent,
  init_pokemon_search
} from "./chunk-5KQVH2AD.js";
import "./chunk-XFI7IOCJ.js";
import "./chunk-N6PZT6B4.js";
import "./chunk-FMKAC3PH.js";
import {
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-ABMDFCXQ.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:style:inline:src/app/app.ts;CiAgICAuYXBwLWNvbnRhaW5lciB7CiAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoOwogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNmZhOwogICAgICBwYWRkaW5nOiAycmVtOwogICAgfQogIA==
var app_default;
var init_app = __esm({
  "angular:jit:style:inline:src/app/app.ts;CiAgICAuYXBwLWNvbnRhaW5lciB7CiAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoOwogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNmZhOwogICAgICBwYWRkaW5nOiAycmVtOwogICAgfQogIA=="() {
    app_default = "/* angular:styles/component:scss;51ab712141b77f711b340e18b38ad61fce071c0e841bf6580bce156cf280bd78;/home/developer/TempProjects/pruebaAngular/mi-aplicacion/src/app/app.ts */\n.app-container {\n  min-height: 100vh;\n  background-color: #f5f6fa;\n  padding: 2rem;\n}\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// src/app/app.ts
var AppComponent;
var init_app2 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_core();
    init_pokemon_search();
    AppComponent = class AppComponent2 {
      title = "Buscador de Pok\xE9mon";
    };
    AppComponent = __decorate([
      Component({
        selector: "app-root",
        standalone: true,
        imports: [PokemonSearchComponent],
        template: `
    <main class="app-container">
      <app-pokemon-search></app-pokemon-search>
    </main>
  `,
        styles: [app_default]
      })
    ], AppComponent);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_testing();
    init_app2();
    init_testing2();
    describe("AppComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [
            AppComponent,
            HttpClientTestingModule
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("should have the correct title", () => {
        expect(component.title).toBe("Buscador de Pok\xE9mon");
      });
      it("should render pokemon search component", () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("app-pokemon-search")).toBeTruthy();
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map
