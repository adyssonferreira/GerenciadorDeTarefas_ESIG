import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

abstract class Service {
    protected readonly baseApiUrl = environment.apiUrl;

    protected readonly http = inject(HttpClient);
}

export default Service;