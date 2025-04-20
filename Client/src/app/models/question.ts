import { Answer, Category } from "models";

export interface Question {
    id: number;
    categoryId: number;
    category: Category;
    text: string;
    answers: Answer[];
}