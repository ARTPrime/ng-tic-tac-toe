import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'art-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
    public turn: 'X' | 'O';
    private winners = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    public winner: boolean;
    public draw: boolean;
    @ViewChildren('button') private cells: QueryList<
        ElementRef<HTMLButtonElement>
    >;

    public ngOnInit(): void {
        this.turn = 'X';
    }

    public onCellClick(id: number) {
        this.placeMark(id);
        this.checkWinner()
            ? (this.winner = true)
            : this.checkDraw()
            ? (this.draw = true)
            : (this.turn = this.turn === 'X' ? 'O' : 'X');

        if (this.winner || this.draw) {
            this.disableCells(true);
        }
    }

    public placeMark(id: number) {
        const cell = this.cells
            .map((c) => c.nativeElement)
            .find((c) => Number(c.id) === id);
        cell.innerText = this.turn;
        cell.disabled = true;
    }

    public checkWinner(): boolean {
        return this.winners.some((w) =>
            w.every(
                (i) =>
                    this.cells.map((e) => e.nativeElement)[i - 1].innerText ===
                    this.turn
            )
        );
    }

    public checkDraw(): boolean {
        return this.cells
            .map((c) => c.nativeElement)
            .every((c) => c.innerText === 'X' || c.innerText === 'O');
    }

    public onReset() {
        this.cells.forEach((c) => {
            c.nativeElement.innerText = null;
        });
        this.winner = null;
        this.draw = null;
        this.turn = 'X';
        this.disableCells(false);
    }

    public disableCells(disable: boolean) {
        this.cells.forEach((c) => (c.nativeElement.disabled = disable));
    }
}
