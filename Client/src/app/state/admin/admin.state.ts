import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AdminStateModel } from 'state/models/adminStateModel';
import { Administrator } from './admin.actions';
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { Category } from "models";

@State<AdminStateModel>({
    name: 'AdministratorState',
    defaults: {
        categories: [],
        usersGroups: [],
        users: [],
        questions: [],
        cources: []
    }
})
@Injectable()
export class AdminState {

    @Action(Administrator.SetCategories)
    setCategories(ctx: StateContext<AdminStateModel>, action: Administrator.SetCategories) {
        ctx.patchState({
            categories: action.categories
        });
    }

    @Action(Administrator.PatchCategory)
    patchCategory(ctx: StateContext<AdminStateModel>, action: Administrator.PatchCategory) {
        ctx.setState(
            patch({
                categories: updateItem(i => i.id === action.category.id, action.category)
            }))
    }

    @Action(Administrator.AddCategory)
    addCategory(ctx: StateContext<AdminStateModel>, category: Administrator.AddCategory) {
        ctx.setState(
            patch({
                categories: append([category.category])
            })
        )
    }

    @Action(Administrator.DeleteCategory)
    deleteCategory(ctx: StateContext<AdminStateModel>, action: Administrator.DeleteCategory) {
        ctx.setState(patch({
            categories: removeItem(where => where.id === action.category.id)
        }))
    }

    @Action(Administrator.SetUserGroups)
    setDepartmens(ctx: StateContext<AdminStateModel>, action: Administrator.SetUserGroups) {
        ctx.patchState({
            usersGroups: action.departments
        });
    }

    @Action(Administrator.SetUsers)
    setUsers(ctx: StateContext<AdminStateModel>, action: Administrator.SetUsers) {
        ctx.patchState({
            users: action.users
        });
    }

    @Action(Administrator.SetQuestions)
    getQuestions(ctx: StateContext<AdminStateModel>, action: Administrator.SetQuestions) {
        ctx.patchState({
            questions: action.questions
        })
    }

    @Action(Administrator.PatchQuestion)
    patchQuestion(ctx: StateContext<AdminStateModel>, action: Administrator.PatchQuestion) {
        ctx.setState(
            patch({
                questions: updateItem(i => i.id == action.question.id, action.question)
            })
        )
    }

    @Action(Administrator.AddQuestion)
    addQuestion(ctx: StateContext<AdminStateModel>, action: Administrator.AddQuestion) {
        ctx.setState(
            patch({
                questions: append([action.question])
            })
        );
    }

    @Action(Administrator.DeleteQuestion)
    deleteQuestion(ctx: StateContext<AdminStateModel>, action: Administrator.DeleteQuestion) {
        ctx.setState(
            patch({
                questions: removeItem(i => i.id === action.question.id)
            })
        )
    }

    @Action(Administrator.SetCources)
    getCources(ctx: StateContext<AdminStateModel>, action: Administrator.SetCources) {
        ctx.patchState({
            cources: action.cources
        })
    }

    @Action(Administrator.PatchCource)
    patchCource(ctx: StateContext<AdminStateModel>, action: Administrator.PatchCource) {
        ctx.setState(
            patch({
                cources: updateItem(i => i.id == action.cource.id, action.cource)
            })
        )
    }

    @Action(Administrator.AddCource)
    addCource(ctx: StateContext<AdminStateModel>, action: Administrator.AddCource) {
        ctx.setState(
            patch({
                cources: append([action.cource])
            })
        );
    }

    @Action(Administrator.DeleteCource)
    deleteCource(ctx: StateContext<AdminStateModel>, action: Administrator.DeleteCource) {
        ctx.setState(
            patch({
                cources: removeItem(i => i.id === action.cource.id)
            })
        )
    }






    @Action(Administrator.ResetStore)
    resetStore(ctx: StateContext<AdminStateModel>, action: Administrator.ResetStore) {
        ctx.setState({
            categories: [],
            usersGroups: [],
            users: [],
            questions: [],
            cources: []
        })
    }

}