import { Injectable } from '@angular/core';
import { IConfig } from '../../shared/interfaces/config';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: IConfig = null;
  get config() {
    return { ...this._config };
  }
  constructor(private http: HttpClient) {}

  private _initialize(config: IConfig) {
    if (!this._config) {
      this._config = config;
    } else {
      console.warn('Config was already initialized earlier. Should be initialized just once');
    }
  }

  /**
   * @deprecated: Use loadConfig() method
   * @param config
   */
  public initialize(config: IConfig) {
    this._initialize(config);
  }

  public loadConfig(): Observable<IConfig> {
    return this.http.get('./assets/config/config.json').pipe(
      tap((response: IConfig) => {
        // throw new Error('Some error');
        this._initialize(response);
      }),
      catchError((err) => {
        console.warn(`Can't load config`);
        throw err;
      })
    );
  }
}
