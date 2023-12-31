import express, { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

interface TK1Data {
  times: number[];
  values: number[];
  direct?: number;
  min?: number | null;
  max?: number | null;
}

interface TK1DataMap {
  [key: string]: TK1Data;
}

interface APIResponse {
  current: {
    data: {
      TK1: TK1DataMap;
    };
  }
}

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/api', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://reference.intellisense.io/thickenernn/v1/referencia');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseData: APIResponse = await response.json();
    const tk1 = responseData.current.data.TK1

    const tk1Objects: TK1DataMap = Object.keys(tk1)
      .filter(key => key.startsWith('TK1_'))
      .reduce((obj: TK1DataMap, key: string) => {
        obj[key] = tk1[key];
        return obj;
      }, {});

    const tk1Array = Object.entries(tk1Objects).map(([label, data]) => ({
      label,
      times: data.times,
      values: data.values
    }));
    console.error('Error fetching or parsing data:', tk1Array);
    res.status(200).json(tk1Array); // Sending the tk1 objects back in the response
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
