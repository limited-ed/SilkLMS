import { Provider } from "@angular/core";
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

interface IRouteData {
    reuse: boolean
}

export class AppRouteReuseStrategy implements RouteReuseStrategy {
    private storeCache = new Map<string, DetachedRouteHandle>()

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        let ret = (route.data as IRouteData).reuse
        return ret;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        let path = route.url.map(u => u.path).join('/');
        if (handle) this.storeCache.set(path, handle);
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        let path = route.url.map(u => u.path).join('/');
        return this.storeCache.has(path);
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        let path = route.url.map(u => u.path).join('/');
        let handle = this.storeCache.get(path);
        return handle?handle:null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (future.url.map(u=>u.path).filter(f => f==='cource'||f==='part').length!==2) {
            let path=curr.url.map(u => u.path).join('/');
            this.storeCache.delete(path);
        }
        return future.routeConfig === curr.routeConfig;
    }

}

export function provideReuseStrategy(): Provider {
    return {
        provide: RouteReuseStrategy,
        useClass: AppRouteReuseStrategy
    }
}