import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as CoreActions from '@syb/store/core/core.actions';
import { AppState } from '@syb/store/app.state';

import { activeLanguageState, pipelineNumberState } from '@syb/store/core/core.selectors';

@Injectable({
  providedIn: 'root'
})
export class CoreFacade {
  constructor(public store: Store<AppState>) {}

  /* LANGUAGE */
  public setActiveLanguage(language: string): void {
    return this.store.dispatch(
      new CoreActions.SetActiveLanguage({ language: language })
    );
  }
  public getActiveLanguage$(): Observable<string> {
    return this.store.select(activeLanguageState);
  }

  /* PIPELINE */
  public setPipeline(pipelineNumber: string): void {
    return this.store.dispatch(
      new CoreActions.SetPipeline({ pipelineNumber: pipelineNumber })
    );
  }
  public getPipeline$(): Observable<string> {
    return this.store.select(pipelineNumberState);
  }
}
