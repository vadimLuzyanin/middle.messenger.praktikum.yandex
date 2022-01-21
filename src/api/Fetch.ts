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

export default class HTTPTransport {
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
      const {
        method,
        headers = options.data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" },
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
        case METHODS.PUT:
        case METHODS.POST:
        case METHODS.DELETE: {
          if (data instanceof FormData) {
            xhr.send(data);
          }
          xhr.send(JSON.stringify(data));
          break;
        }
        default: {
          xhr.send();
          break;
        }
      }

      xhr.onload = () => {
        const { status, responseText } = xhr;
        let parsedResponse;
        try {
          parsedResponse = JSON.parse(responseText);
        } catch {
          parsedResponse = responseText;
        }
        if (status >= 200 && status < 300) {
          resolve(parsedResponse);
        } else {
          reject(parsedResponse);
        }
      };
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;
    });
  }
}
