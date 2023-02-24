import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input()rating: number = 4;
    cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = this.rating * 75/5;
    }

    onClick(): void {
        // component is clicked, it then calls the this.ratingClicked.emit which is a EventEmitter
        console.log(`The rating ${this.rating}`);
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}