import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectMenu } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-business-menu-select',
  template: `
    <select
      class="menu-select"
      (change)="state.refine($event.target.value)"
    >
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `
})
export class MenuSelect extends BaseWidget {
  state: {
    items: { label: string; value: string }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attribute: 'business_city' });
    super.ngOnInit();
  }
}