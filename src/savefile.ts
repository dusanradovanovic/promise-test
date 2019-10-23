
interface FetchResult {
  status: number;
  json?: () => Promise<any>;
}

function fetch(url: string, options?: any): Promise<FetchResult> {
  switch (url) {
    case 'happy': return Promise.resolve({ status: 200 });
    case 'trigger-connection-error': return Promise.reject(new Error('browser-connection-error'));
    case 'trigger-json-error': return Promise
      .resolve({
        status: 500,
        json: () => Promise.reject(new Error('browser-json()-error'))
      });
    case 'trigger-server-error': return Promise
      .resolve({
        status: 500,
        json: () => Promise.resolve({
          messages: [
            { id: 1 },
            { id: 2 }
          ]
        })
      });
  }
}

export function saveFile1(url: string): Promise<void> {
  return fetch(url)
    .then(
      result => {
        if (result.status >= 200 && result.status < 300) {
          return;
        }

        return result.json()
          .catch(_ => Promise.reject(new Error('json-error')))
          .then(j => Promise.reject(new Error('server-error ' + j.messages.map(m => m.id).join(' '))));
      },
      _ => Promise.reject(new Error('connection-error'))
    );
}

export async function saveFile2(url: string): Promise<void> {
  let result;
  let j;

  try {
    result = await fetch(url);
  } catch (err) {
    throw new Error('connection-error');
  }

  if (!(result.status >= 200 && result.status < 300)) {
    try {
      j = await result.json();
    } catch (err) {
      throw new Error('json-error');
    }

    throw new Error('server-error ' + j.messages.map(m => m.id).join(' '));
  }
}

export async function saveFile3(url: string): Promise<void> {
  async function saveInternal(internalUrl): Promise<string | undefined> {
    try {
      const result = await fetch(internalUrl);

      if (!(result.status >= 200 && result.status < 300)) {
        try {
          const parsedJson = await result.json();
          return 'server-error ' + parsedJson.messages.map(m => m.id).join(' ');
        } catch (err) {
          return 'json-error';
        }
      }
    } catch (err) {
      return 'connection-error';
    }
  }

  const errorMsg = await saveInternal(url);
  if (errorMsg) {
    throw new Error(errorMsg);
  }
}

