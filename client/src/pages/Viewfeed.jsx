import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";


export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [FeedId, setFeedId] = useState("");
  const currentuserId = currentUser ? currentUser._id : null;
  const [formId, setformId] = useState("");
  console.log("arra", form);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/auth/getfeed`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.conten);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, [currentuserId]);

  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Feedback Details:");
    yPos += 10;

    form.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${formm.name}`);
      doc.text(20, yPos + 5, `Rate: ${formm.Address}`);
      doc.text(20, yPos + 10, `comment: ${formm.Phone}`);
      doc.text(20, yPos + 15, `comment: ${formm.type}`);
      doc.text(20, yPos + 20, `comment: ${formm.petname}`);

      yPos += 35;
    });

    // Save the PDF
    doc.save("warehouse_employees.pdf");
  };



  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...form]);
    } else {
      // If there's a query, filter the data
      const filteredData = form.filter(
        (formm) =>
          formm.title && formm.title.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, form]);



  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/cont/deletecont/${formId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setform((prev) => prev.filter((formm) => formm._id !== formId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <div>
      <div className="flex justify-center items-center">
       
      </div>

      <div className="ml-8 mt-7 flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      

      <div>
       

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 3).map((formm) => (
                  <div
                    key={formm._id}
                    className="w-[400px] h-[300px]  mt-10 mb-10 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="flex justify-center items-center ">
                      <img className="w-[200px] h-[100px] mt-3 rounded-lg" src={formm.image} />
                      </div>
                      


                       
                      <div className="flex gap-4 ml-2">
                        <div className="font-extralight text-lg">Title:</div>

                        <div className="font-extralight text-xl mb-2 max-w-[100px] truncate">
                          {formm.title}
                        </div>
                        
                      

                     

                     
                      </div>
                     

                      <div className="flex gap-4 ml-2">
                        <div className="font-extralight text-lg">Feedaback:</div>

                        <div className="font-extralight text-sm mb-2 max-w-[200px] break-words ">
                          {formm.Fdesc}
                        </div>

                       
                        
                      

                     

                     
                      </div>

                   

                     


                    
                    </div>
                  </div>
                ))}

                {!showMore && form.length > 3 && (
                  <div className="mt-4 md:hidden  sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-blue-500 hover:bg-opacity-90 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
