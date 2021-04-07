import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '@core/services/layout.service';
import { LayoutEnum } from '@core/enum/layout.enum';
import { Observable } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  ResolveEnd,
  Router
} from '@angular/router';
import { debounceTime, filter, map } from 'rxjs/operators';
import { getCurrentRouteConfig } from '@shared/utilities/routes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Title } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  layout$: Observable<LayoutEnum> = this.layoutService.layout$;
  loading$: Observable<boolean> = this.layoutService.loading$;
  LayoutEnum = LayoutEnum;
  accessToken = '';

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly title: Title
  ) {}

  ngOnInit(): void {
    this.setupTitleListener();
    this.layoutService.setLoading(true);
  }

  ngAfterViewInit(): void {
    this.layout$ = this.router.events.pipe(
      filter(
        evt =>
          evt instanceof NavigationEnd ||
          evt instanceof NavigationError ||
          evt instanceof NavigationCancel
      ),
      // Update layout. Default is main layout.
      map(_ => {
        const layout = getCurrentRouteConfig(this.route, 1)?.layout || LayoutEnum.MAIN;
        this.layoutService.setLayout(layout);
        return layout;
      })
    );

    this.layout$
      .pipe(
        filter(v => !!v),
        debounceTime(250),
        untilDestroyed(this)
      )
      .subscribe(data => {
        // End loading screen
        this.layoutService.setLoading(false);
        // this.stopLoadingBar();
        // this.searchBoxInit();
      });

    // this.authService.accessToken$.pipe(untilDestroyed(this)).subscribe(token => {
    //   if (token && this.accessToken !== token) {
    //     this.accessToken = token;
    //     this.authService.fetchAuthenticatedUser().pipe(take(1)).subscribe();
    //   }
    // });
  }

  private setupTitleListener(): void {
    this.router.events.pipe(filter(ev => ev instanceof ResolveEnd)).subscribe((ev: ResolveEnd) => {
      const { data } = getDeepestChildSnapshot(ev.state.root);
      if (data && data.title) {
        this.title.setTitle(data.title);
      }
    });
  }
}

function getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let deepestChild = snapshot.firstChild;
  while (deepestChild?.firstChild !== null) {
    deepestChild = deepestChild.firstChild;
  }
  return deepestChild || snapshot;
}
