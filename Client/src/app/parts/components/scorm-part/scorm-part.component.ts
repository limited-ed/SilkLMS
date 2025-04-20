import { Component, input } from '@angular/core';
import { ScormPart } from 'models';

@Component({
  selector: 'app-scorm-part',
  imports: [],
  templateUrl: './scorm-part.component.html',
  styleUrl: './scorm-part.component.css'
})
export class ScormPartComponent {
  part = input<ScormPart>();
}
