/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface JsmButton {
    }
}
declare global {
    interface HTMLJsmButtonElement extends Components.JsmButton, HTMLStencilElement {
    }
    var HTMLJsmButtonElement: {
        prototype: HTMLJsmButtonElement;
        new (): HTMLJsmButtonElement;
    };
    interface HTMLElementTagNameMap {
        "jsm-button": HTMLJsmButtonElement;
    }
}
declare namespace LocalJSX {
    interface JsmButton {
    }
    interface IntrinsicElements {
        "jsm-button": JsmButton;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "jsm-button": LocalJSX.JsmButton & JSXBase.HTMLAttributes<HTMLJsmButtonElement>;
        }
    }
}
