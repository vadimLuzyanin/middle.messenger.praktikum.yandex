enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

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
  get = (url: string, options: OptionsNoMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (url: string, options: OptionsNoMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (url: string, options: OptionsNoMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (url: string, options: OptionsNoMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: Options,
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        method,
        headers = { "Content-Type": "application/json" },
        data = {},
      } = options;

      if (method === METHODS.GET) {
        xhr.open(method, `${url}${queryStringify(data)}`, true);
      } else {
        xhr.open(method, url, true);
      }

      Object.keys(headers).forEach((key) => {
        const value = headers[key];
        xhr.setRequestHeader(key, value);
      });
      xhr.withCredentials = true;

      xhr.timeout = timeout;

      switch (method) {
        case METHODS.PUT:
        case METHODS.POST: {
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
        const parsedResponse = JSON.parse(responseText);
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
  };
}
