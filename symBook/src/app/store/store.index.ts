import { StoreModule } from '@ngrx/store';

export const StoreRootModuleIndex = StoreModule.forRoot({}, {
  runtimeChecks: {
    strictStateImmutability: false,
    strictActionImmutability: false,
    strictStateSerializability: false,
    strictActionSerializability: false,
  },
});
