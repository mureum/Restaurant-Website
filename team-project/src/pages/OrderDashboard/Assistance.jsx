import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const Assistance = ({ nextStepText, isCancellable }) => {
    const[issue,setIssue] = useState([]);

    
    useEffect(() => {
        const fetchAlltems = async () => {
          try {
            const res = await axios.get("http://localhost:8800/issues");
            const transformedData = res.data.map((item) => ({
              tableNumber: item.tablenumber,
              details: item.problemdescription,

            }));
            setIssue(transformedData);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchAlltems();
      }, []);
    
      const data =
      issue.length > 0
        ? issue.sort((a, b) => a.tableNumber - b.tableNumber)
        : issue;

    const resolveIssue = async (issue) => {
        try{
            const issueDetails = issue.details;
            await axios.delete("http://localhost:8800/resolveIssue", {
                data: {issueDetails},
            })
            window.location.reload();           

        } catch (err) {
            window.alert("Error on deleting the orders");
            console.log(err);
        }

    }

        

    return (
        <div className="flex flex-col gap-4">
            <table className="table w-full">
              <thead>
                <tr>

                  <th></th>
                  <th>Table no.</th>
                  <th>Issue</th>

                </tr>
              </thead>
              <tbody>
                {data.map((issue, i) => (
                  <tr key={i}>
                    <td>
                        <div className="btn btn-primary">
                            <button onClick={() => resolveIssue(issue)}>Issue resolved.</button>
                        </div>
                    </td>
                    <td>
                      <div className="font-bold">#{issue.tableNumber}</div>
                    </td>
                    <td>{issue.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      );



}


export default Assistance;

