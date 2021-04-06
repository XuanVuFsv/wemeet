import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

type Constructor<T> = new (...args: any[]) => T;

export function BaseMixin<T extends Constructor<{}>>(base: T = class {} as any): Constructor<any> {
  class BaseClass extends base {
    constructor(...args: any[]) {
      super(...args);
    }
  }
  return BaseClass;
}

export function DestroyMixin<T extends Constructor<{}>>(
  Base: T = class {} as any
): Constructor<any> {
  return class extends Base implements OnDestroy {
    protected readonly unsubscribe = new Subject<void>();
    ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
  };
}
