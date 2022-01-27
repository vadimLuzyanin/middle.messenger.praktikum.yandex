enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const DOMAIN = "https://ya-praktikum.tech";

type Options = {
  timeout?: number;
  method: METHODS;
  headers?: any;
  data?: any;
};

type OptionsNoMethod = Omit<Options, "method">;

function queryStringify(data: any) {
  let result = "";
  Object.keys(data).forEach((key, idx) => {
    const val = data[key];
    result += `${idx === 0 ? "?" : "&"}${key}=${val}`;
  });
  return result;
}

export default class HTTP {
  baseUrl: string;

  constructor(base: string) {
    this.baseUrl = `${DOMAIN}/${base}`;
  }

  get<R>(url: string, options: OptionsNoMethod = {}) {
    return this.request<R>(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  put<R>(url: string, options: OptionsNoMethod = {}) {
    return this.request<R>(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  post<R>(url: string, options: OptionsNoMethod = {}) {
    return this.request<R>(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  delete<R>(url: string, options: OptionsNoMethod = {}) {
    return this.request<R>(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request<R>(url: string, options: Options, timeout = 5000): Promise<R> {
    const combinedUrl = `${this.baseUrl}${url}`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      const {
        method,
        headers = { "Content-Type": "application/json" },
        data = {},
      } = options;

      if (method === METHODS.GET) {
        xhr.open(method, `${combinedUrl}${queryStringify(data)}`, true);
      } else {
        xhr.open(method, combinedUrl, true);
      }

      Object.keys(headers).forEach((key) => {
        const value = headers[key];
        xhr.setRequestHeader(key, value);
      });
      xhr.withCredentials = true;

      xhr.timeout = timeout;

      switch (method) {
        case METHODS.GET: {
          xhr.send();
          break;
        }
        default: {
          if (data instanceof FormData) {
            xhr.send(data);
          } else {
            xhr.send(JSON.stringify(data));
          }
          break;
        }
      }

      xhr.onload = () => {
        const { status, response } = xhr;
        if (status >= 200 && status < 300) {
          resolve(response);
        } else {
          reject(response);
        }
      };
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;
    });
  }
}
