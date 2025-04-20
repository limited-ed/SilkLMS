import { Component } from "@angular/core";
import { ScormPartComponent } from "./components/scorm-part/scorm-part.component";
import { SimpleLecturePartComponent } from "./components/simple-lecture-part/part/simple-lecture-part.component";
import { TestPartComponent } from "./components/test-part/test-part.component";

export interface PartType {
    component: any;
}

export interface IPartTypes {
    [index: string]: string;
}

export const partTypes: {
    [key: string]: any
} = {
    SimpleLecturePart: { component: SimpleLecturePartComponent },
    ScormPart: { component: ScormPartComponent },
    TestPart: { component: TestPartComponent }
}
