import {
  StatusMessageComponent,
  init_status_message
} from "./chunk-N6PZT6B4.js";
import {
  TestBed,
  init_testing
} from "./chunk-ABMDFCXQ.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/components/status-message/status-message.spec.ts
var require_status_message_spec = __commonJS({
  "src/app/components/status-message/status-message.spec.ts"(exports) {
    init_testing();
    init_status_message();
    describe("StatusMessageComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [StatusMessageComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(StatusMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("should not display message when message is empty", () => {
        component.message = "";
        fixture.detectChanges();
        const messageElement = fixture.nativeElement.querySelector(".status-message");
        expect(messageElement).toBeNull();
      });
      it("should display message with error type by default", () => {
        component.message = "Test message";
        fixture.detectChanges();
        const messageElement = fixture.nativeElement.querySelector(".status-message");
        expect(messageElement).toBeTruthy();
        expect(messageElement.classList.contains("error")).toBeTrue();
      });
      it("should display message with correct type", () => {
        const types = ["error", "loading", "success"];
        types.forEach((type) => {
          component.type = type;
          component.message = "Test message";
          fixture.detectChanges();
          const messageElement = fixture.nativeElement.querySelector(".status-message");
          expect(messageElement.classList.contains(type)).toBeTrue();
        });
      });
      it("should update message content", () => {
        const testMessage = "Test message";
        component.message = testMessage;
        fixture.detectChanges();
        const messageContent = fixture.nativeElement.querySelector(".message");
        expect(messageContent.textContent).toBe(testMessage);
      });
    });
  }
});
export default require_status_message_spec();
//# sourceMappingURL=spec-app-components-status-message-status-message.spec.js.map
