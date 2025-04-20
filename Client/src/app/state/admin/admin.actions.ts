import { Cource, Question } from "models";
import { Category } from "models/category";
import { Group } from "models/group";
import {IdentityUser } from "models/user";


export namespace Administrator {


    export class GetUsers {
        static readonly type = '[Admin] Get users';
    }

    export class SetUsers {
        static readonly type = '[Admin] Set users';
        constructor(public users:IdentityUser[]) { }
    }

    export class GetCategories {
        static readonly type = '[Admin] Get categories';
    }

    export class PatchCategory {
        static readonly type = "[Admin] Patch category"
        constructor(public category: Category) { }
    }

    export class AddCategory {
        static readonly type = "[Admin] Add category"
        constructor(public category: Category) { }
    }

    export class DeleteCategory {
        static readonly type = "[Admin] Delete category"
        constructor(public category: Category) { }
    }

    export class SetCategories {
        static readonly type = '[Admin] Set categories';
        constructor(public categories: Category[]) { }
    }

    export class GetUsersGroups {
        static readonly type = '[Admin] Get departments';
    }

    export class SetUserGroups {
        static readonly type = '[Admin] Set departments';
        constructor(public departments: Group[]) { }
    }

    export class SetQuestions {
        static readonly type = '[Admin] Set questions';
        constructor(public questions: Question[]) {}
    }

    export class GetQuestions {
        static readonly type = '[Admin] Get questions';
        constructor(public questions: Question[]) {}
    }

    export class AddQuestion {
        static readonly type = '[Admin] Add question';
        constructor(public question: Question) {}
    }
   
    export class PatchQuestion {
        static readonly type = '[Admin] Patch question';
        constructor(public question: Question) {}
    }

    export class DeleteQuestion {
        static readonly type = '[Admin] Delete question';
        constructor(public question: Question) {}
    }


export class SetCources {
    static readonly type = '[Admin] Set cources';
    constructor(public cources: Cource[]) {}
}

export class GetCources {
    static readonly type = '[Admin] Get cources';
    constructor(public cources: Cource[]) {}
}

export class AddCource {
    static readonly type = '[Admin] Add cource';
    constructor(public cource: Cource) {}
}

export class PatchCource {
    static readonly type = '[Admin] Patch cource';
    constructor(public cource: Cource) {}
}

export class DeleteCource {
    static readonly type = '[Admin] Delete cource';
    constructor(public cource: Cource) {}
}

    
    export class ResetStore {
        static readonly type = '[Admin] Reset';
    }

    


}