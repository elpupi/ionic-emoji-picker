import { Injectable } from '@angular/core';

import { EmojiSheetConfig, EmojiType, Parameters, Sheet } from './emoji-sheet-config.service';
import { PlatformString } from '@model/platform';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ProxyObserver, ProxyTypeObserver } from '@proxy';


@Injectable()
export class EmojiSheet {
    // public url$: ReplaySubject<string> = new ReplaySubject(1);
    public parameters$ = new ReplaySubject<{ parameters: Parameters; changed: (keyof Parameters)[] }>(1);
    public sheet$ = new ReplaySubject<{ sheet: Sheet; changed: (keyof Sheet)[] }>(1);

    config: ProxyTypeObserver<EmojiSheetConfig>;

    constructor(config: EmojiSheetConfig) {
        this.config = ProxyObserver.create(config);
    }



    get url() {
        const type = this.config.parameters.sheet.type.$$;
        const urlFunctor = this.config[type].$$;
        return urlFunctor(this.config.parameters.$$);
    }




    // setters of parameters
    /*   private setParameters(parameters: Partial<Parameters>, ...changed: (keyof Parameters)[]) {
          assignRecursive(this.config.parameters, parameters);
          this.parameters$.next({ parameters: this.config.parameters, changed });
      }



      set parameters(parameters: Parameters) {
          this.setParameters(parameters, ...Object.keys(parameters) as (keyof Parameters)[]);
      }


      set platform(platform: PlatformString) {
          this.setParameters({ platform }, 'platform');
      }


      set resolution(resolution: number) {
          this.setParameters({ resolution }, 'resolution');
      }

      set sheet(sheet: Sheet) {
          this.setParameters({ sheet }, 'sheet');
    }
          */


    // setters of sheet

    /*   private setSheet(sheet: Partial<Sheet>, ...changed: (keyof Sheet)[]) {
          assignRecursive(this.config.parameters.sheet, sheet);
          this.sheet$.next({ sheet: this.config.parameters.sheet, changed });
          this.parameters$.next({ parameters: this.config.parameters, changed: ['sheet'] });
          // this.setParameters({ sheet } as Partial<Parameters>, 'sheet');
      } */


    // getters of parameters
    /*   get parameters() {
          return this.config.parameters;
      }

      get platform() {
          return this.parameters.platform;
      }

      get resolution() {
          return this.parameters.resolution;
      }

      get sheet() {
          return this.parameters.sheet;
      } */

}
