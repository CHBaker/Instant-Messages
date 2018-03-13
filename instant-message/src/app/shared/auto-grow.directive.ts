import {
    ElementRef,
    HostListener,
    Directive,
    AfterContentChecked,
    Input
} from '@angular/core';


@Directive({
    selector: '[appDynamicTextarea]'
})
export class DynamicTextareaDirective implements AfterContentChecked {
    // takes in min/max height in property bindings
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
            this.findNestedTextArea();
        } else {
            this.textAreaEl = this.element.nativeElement;
        }
    }

    // 3 tries to find nested text area
    findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.getElementsByTagName(
            'TEXTAREA'
        )[0];
        if (!this.textAreaEl) {
            if (this.retries >= 3) {
                console.warn('angular2-autosize: textarea not found');
            } else {
                this.retries++;
                setTimeout(() => {
                    this.findNestedTextArea();
                }, 1);
            }
        }
    }

    // change detection
    ngAfterContentChecked(): void {
        this.adjust();
    }

    adjust(): void {
        if (this.textAreaEl) {
            this.textAreaEl.style.overflow = 'hidden';

            // takes min/max inputs [OPTIONAL]
            if (this.minHeight) {
                this.textAreaEl.style.minHeight = this.minHeight + 'px';
            }
            if (this.maxHeight) {
                this.textAreaEl.style.maxHeight = this.maxHeight + 'px';
            }

            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    }
}
