import { Component } from '@angular/core';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        .docs pre.doc-command {
            font-family: monospace;
            background-color: #333333;
            color: #efefef;
            padding: 1em;
            font-size: 14px;
            border-radius: 0;
            overflow: auto;
        }

        .docs p {
            line-height: 1.5;
        }`
    ]
})
export class DocumentationComponent {
}
