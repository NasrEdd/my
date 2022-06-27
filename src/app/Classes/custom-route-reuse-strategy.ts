import { Injectable } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { LoaderService } from '../services/loader-service/loader-service.service';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    constructor( private loader: LoaderService) {
        
    }

    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRoutes.set( route.routeConfig!.path!, handle);
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path!);
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        this.loader.loaderDialogEmitter.emit({ isOpen: false})
        return this.storedRoutes.get(route.routeConfig!.path!)!;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}