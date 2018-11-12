import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipartService } from '../shared/clipart.service';

@Component({
  selector: 'app-display-clipart',
  templateUrl: './display-clipart.component.html',
  styleUrls: ['./display-clipart.component.css']
})
export class DisplayClipartComponent implements OnInit {

  @Input() imageStr: string;
  @Output() addImageStringEE: EventEmitter<any> = new EventEmitter();

  clipArtData: IOpenClipArt;

  constructor(private _clipArt: ClipartService) { 
  }

  ngOnInit() {
    this._clipArt.getImageList(this.imageStr).subscribe(data => {
      this.clipArtData = data
    });
  }

  selectImage(imageStr): boolean {
    this.addImageStringEE.emit(imageStr);
    return false;
  }

}
