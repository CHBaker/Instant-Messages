import {
    ElementRef,
    HostListener,
    Directive,
    AfterContentChecked,
    Input
} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;
@Directive({
    selector: '[appAutoGrow]'
})
export class AutoGrowDirective implements AfterContentChecked {
    @Input() minHeight: string;
    @Input() maxHeight: string;

    private retries = 0;
    private textAreaEl: any;


    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(private element: ElementRef) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        } else {
            this.textAreaEl = this.element.nativeElement;
        }
    }
    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.getElementsByTagName(
            'TEXTAREA'
        )[0];
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('angular2-autosize: textarea not found');
            } else {
                this.retries++;
                setTimeout(() => {
                    this._findNestedTextArea();
                }, 100);
            }
        }
    }

    ngAfterContentChecked(): void {
        this.adjust();
    }

    adjust(): void {
        if (this.textAreaEl) {
            // this.textAreaEl.style.overflow = 'hidden';
            this.textAreaEl.style.minHeight = this.minHeight + 'px';
            this.textAreaEl.style.maxHeight = this.maxHeight + 'px';
            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    }
}
