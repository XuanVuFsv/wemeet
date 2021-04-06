import { ActivatedRoute, Route } from '@angular/router';

export function getCurrentRouteConfig(route: ActivatedRoute, i: number): Route | null {
  const child = route.firstChild as ActivatedRoute;
  if (child?.firstChild) {
    return getCurrentRouteConfig(child?.firstChild, ++i);
  } else {
    return route?.routeConfig;
  }
}
