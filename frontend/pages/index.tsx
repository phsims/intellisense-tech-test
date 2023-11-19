


import { useState } from "react";
import Graph from "../components/graph/graph";
import { DataProps } from "../interface";

interface PageProps {
  data: Array<DataProps>;
  error: string;
}

export async function getServerSideProps() {
  return fetch(`http://localhost:3000/api`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      return { props: { data } };
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return {
        props: {
          error: 'Error fetching data'
        }
      };
    });
}



export function Index({ data, error }: PageProps) {
  const [selectedData, setSelectedData] = useState<Array<DataProps>>(data);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (rowData: DataProps, index: number) => {
    setSelectedData([rowData]);
    setSelectedRow(index === selectedRow ? null : index);
  };


  if (!data || error) return <p>{error}</p>

  return (
    <div className="  p-6">
      <div className="relative overflow-x-auto   m-6">
        <table className="w-full text-sm text-left border  border-lightgrey p-4">
          <thead className="text-lightgrey uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3 border  border-lightgrey">
                Metric
              </th>
              <th scope="col" className="px-6 py-3 border  border-lightgrey">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((rowData, index) => {
              const { values, label } = rowData
              return (
                <tr key={index} onClick={() => handleRowClick(rowData, index)} className={selectedRow === index ? 'bg-primarylight ' : 'hover:bg-primarylight'} >
                  <td className="border  border-lightgrey p-2" >{label}</td>
                  <td className="border  border-lightgrey p-2">{values.slice(-1)}</td>
                </tr >
              )
            })}

          </tbody>
        </table>
      </div>
      <Graph data={selectedData} />
    </div>
  );
}

export default Index;
