import {
  CommonModule,
  Component,
  Input,
  __decorate,
  init_common,
  init_core,
  init_tslib_es6
} from "./chunk-ABMDFCXQ.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:style:inline:src/app/components/status-message/status-message.ts;CiAgICAuc3RhdHVzLW1lc3NhZ2UgewogICAgICBwYWRkaW5nOiAxcmVtOwogICAgICBib3JkZXItcmFkaXVzOiA0cHg7CiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIH0KCiAgICAuZXJyb3IgewogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmVlOwogICAgICBjb2xvcjogI2M2MjgyODsKICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZmY2RkMjsKICAgIH0KCiAgICAubG9hZGluZyB7CiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlM2YyZmQ7CiAgICAgIGNvbG9yOiAjMTU2NWMwOwogICAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJkZWZiOwogICAgfQoKICAgIC5zdWNjZXNzIHsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTsKICAgICAgY29sb3I6ICMyZTdkMzI7CiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjOGU2Yzk7CiAgICB9CiAg
var status_message_default;
var init_status_message = __esm({
  "angular:jit:style:inline:src/app/components/status-message/status-message.ts;CiAgICAuc3RhdHVzLW1lc3NhZ2UgewogICAgICBwYWRkaW5nOiAxcmVtOwogICAgICBib3JkZXItcmFkaXVzOiA0cHg7CiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIH0KCiAgICAuZXJyb3IgewogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmVlOwogICAgICBjb2xvcjogI2M2MjgyODsKICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZmY2RkMjsKICAgIH0KCiAgICAubG9hZGluZyB7CiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlM2YyZmQ7CiAgICAgIGNvbG9yOiAjMTU2NWMwOwogICAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJkZWZiOwogICAgfQoKICAgIC5zdWNjZXNzIHsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTsKICAgICAgY29sb3I6ICMyZTdkMzI7CiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjOGU2Yzk7CiAgICB9CiAg"() {
    status_message_default = "/* angular:styles/component:scss;5b3c3c731f3db54870b40a0eb97b756e977768acd1de30cec56cdc9c40b58bdd;/home/developer/TempProjects/pruebaAngular/mi-aplicacion/src/app/components/status-message/status-message.ts */\n.status-message {\n  padding: 1rem;\n  border-radius: 4px;\n  margin-bottom: 1rem;\n  text-align: center;\n}\n.error {\n  background-color: #ffebee;\n  color: #c62828;\n  border: 1px solid #ffcdd2;\n}\n.loading {\n  background-color: #e3f2fd;\n  color: #1565c0;\n  border: 1px solid #bbdefb;\n}\n.success {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n  border: 1px solid #c8e6c9;\n}\n/*# sourceMappingURL=status-message.css.map */\n";
  }
});

// src/app/components/status-message/status-message.ts
var StatusMessageComponent;
var init_status_message2 = __esm({
  "src/app/components/status-message/status-message.ts"() {
    "use strict";
    init_tslib_es6();
    init_status_message();
    init_core();
    init_common();
    StatusMessageComponent = class StatusMessageComponent2 {
      message = "";
      type = "error";
      static propDecorators = {
        message: [{ type: Input }],
        type: [{ type: Input }]
      };
    };
    StatusMessageComponent = __decorate([
      Component({
        selector: "app-status-message",
        standalone: true,
        imports: [CommonModule],
        template: `
    <div class="status-message" [class]="type" *ngIf="message">
      <span class="message">{{ message }}</span>
    </div>
  `,
        styles: [status_message_default]
      })
    ], StatusMessageComponent);
  }
});

export {
  StatusMessageComponent,
  init_status_message2 as init_status_message
};
//# sourceMappingURL=chunk-N6PZT6B4.js.map
